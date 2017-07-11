import { PubSub } from 'graphql-subscriptions';
import { REVIEW_ADDED_KEY } from './review.subscriptionkeys';
import bookshelf from '../../../db/index'; // Import Knex instance for DB connection
import {
  mysqlConnector,
  deleteItem,
} from '../_common/connectors/common.connectors';
import {
  reviewModel,
  reviewEvaluationModel,
  reviewRatingCriterionValueCollection,
} from './review.model';

export const pubsub = new PubSub();

export function getReviewData(obj, args, context, info) {
  return mysqlConnector(obj, args, context, info);
}

export function stringifyReviewEvaluationType(obj, args, context, info) {
  try {
    let stringifiedType = '';
    if (obj.type === 1) {
      stringifiedType = 'Like';
    } else if (obj.type === 2) {
      stringifiedType = 'Dislike';
    } else {
      return reviewEvaluationModel.where('id', obj.id)
        .fetch({ columns: ['review_id'] })
        .then((result) => {
          const parsedResult = JSON.parse(JSON.stringify(result));
          throw new Error(`No recognized type for review evaluation ${obj.id} on review ${parsedResult.review_id}`);
        })
        .catch((err) => { return err; },
        );
    }
    return stringifiedType;
  }
  catch (err) {
    return err;
  }
}

export function addReview(obj, args, context, info) {
  // Perform multiple insert wrapped in a transaction,
  return bookshelf.transaction((addNewReview) => {
    // Create a new review object from mutation arguments
    const newReview = {
      user_id: args.userId,
      subject_id: args.subjectId,
      title: args.title,
      content: args.content,
      review_status: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    // Insert new review object
    return reviewModel.forge()
      .save(newReview, { transacting: addNewReview })
      .then((result) => {
        const parsedResult = JSON.parse(JSON.stringify(result));
        // Build an object from inserted review to return to GrapQL
        const insertedReview = {
          id: result.id,
          userId: parsedResult.user_id,
          subjectId: parsedResult.subject_id,
          title: parsedResult.title,
          content: parsedResult.content,
          reviewStatus: parsedResult.review_status,
        };
        // Create a new review rating criterions values array from mutation argument and add the inserted review id to each array item
        const newReviewRatingCriterionsValues = [];
        args.reviewRatingCriterionsValues.map((currentReviewRatingCriterionDataSet) => {
          const currentReviewRatingCriterionArrayItem = {};
          currentReviewRatingCriterionArrayItem.review_id = result.id;
          currentReviewRatingCriterionArrayItem.rating_criterion_id = currentReviewRatingCriterionDataSet.ratingCriterionId;
          currentReviewRatingCriterionArrayItem.value = currentReviewRatingCriterionDataSet.value;
          currentReviewRatingCriterionArrayItem.created_at = new Date();
          currentReviewRatingCriterionArrayItem.updated_at = new Date();
          newReviewRatingCriterionsValues.push(currentReviewRatingCriterionArrayItem);
        });
        // Insert new review rating criterions values array
        return reviewRatingCriterionValueCollection.forge(newReviewRatingCriterionsValues)
          .invokeThen('save', null, { transacting: addNewReview })
          .then((resultCollection) => {
            const parsedResultCollection = JSON.parse(JSON.stringify(resultCollection));
            // Build an array from inserted review rating criterions values array
            const insertedReviewRatingCriterionsValues = [];
            parsedResultCollection.map((currentInsertedReviewRatingCriterionDataSet) => {
              const currentInsertedReviewRatingCriterionValueArrayItem = {};
              currentInsertedReviewRatingCriterionValueArrayItem.ratingCriterionId = currentInsertedReviewRatingCriterionDataSet.rating_criterion_id;
              currentInsertedReviewRatingCriterionValueArrayItem.value = currentInsertedReviewRatingCriterionDataSet.value;
              insertedReviewRatingCriterionsValues.push(currentInsertedReviewRatingCriterionValueArrayItem);
            });
            // Add the array as property of inserted review object and return the inserted review object to GrapQL
            insertedReview.reviewRatingCriterionsValues = insertedReviewRatingCriterionsValues;
            return insertedReview;
          });
      })
      .then(addNewReview.commit)
      .catch(addNewReview.rollback);
  })
    .asCallback((err, resp) => {
      if (err) {
        console.log('Somethign goes wrong!');
        // console.log(err);
      } else {
        console.log('Transaction completed!');
        // console.log(resp);
        pubsub.publish(REVIEW_ADDED_KEY, resp);
        /* pubsub.publish(REVIEW_ADDED_KEY, {
          id: 123,
          userId: 123,
          subjectId: 123,
          title: 'title',
          content: 'content',
          reviewStatus: 1,
          reviewEvaluations: [],
          author: {},
          subject: {},
          reviewRatingCriterionsValues: [],
        });*/
      }
    });
}

export function deleteReview(obj, args, context, info) {
  const item = reviewModel;
  return deleteItem(obj, args, context, info, item);
}
