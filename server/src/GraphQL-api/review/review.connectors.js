import rename from 'rename-keys';
import { PubSub } from 'graphql-subscriptions';
import { REVIEW_ADDED_KEY } from './review.subscriptionkeys';
import bookshelf from '../../../db/index'; // Import Knex instance for DB connection
import {
  deserializeObject,
  serializeObject,
  mysqlConnector,
  deleteItem,
} from '../_common/connectors/common.connectors';
import {
  reviewModel,
  reviewEvaluationModel,
  reviewRatingCriterionValueCollection,
} from './review.model';
import {
  ratingCriterionModel,
} from '../subject/subject.model';
import {
  userModel,
} from '../user/user.model';

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
    // Rename arguments' property names, add more properties and delete extra properties to perform review insert
    const deserializedReviewArgs = rename(args, deserializeObject);
    deserializedReviewArgs.created_at = new Date();
    deserializedReviewArgs.updated_at = new Date();
    delete deserializedReviewArgs.review_rating_criterions_values; // Delete review rating criterions values array
    // Insert new review
    return reviewModel.forge()
      .save(deserializedReviewArgs, { transacting: addNewReview })
      .then((result) => {
        // Serialize review result to send to GraphQL
        const parsedReviewResult = JSON.parse(JSON.stringify(result));
        const serializedReviewResult = rename(parsedReviewResult, serializeObject);
        // Rename arguments properties names, add more properties for each review rating criterions values array item
        const deserializedReviewArgReviewRatingCriterionsValues = [];
        args.reviewRatingCriterionsValues.map((currentReviewRatingCriterionDataSet) => {
          const deserializedCurrentReviewRatingCriterionDataSet = rename(currentReviewRatingCriterionDataSet, deserializeObject);
          deserializedCurrentReviewRatingCriterionDataSet.review_id = result.id;
          deserializedCurrentReviewRatingCriterionDataSet.created_at = new Date();
          deserializedCurrentReviewRatingCriterionDataSet.updated_at = new Date();
          deserializedReviewArgReviewRatingCriterionsValues.push(deserializedCurrentReviewRatingCriterionDataSet);
        });
        // Insert new review rating criterions values array
        return reviewRatingCriterionValueCollection.forge(deserializedReviewArgReviewRatingCriterionsValues)
          .invokeThen('save', null, { transacting: addNewReview })
          .then((resultCollection) => {
            // Serialize result collection, add it to serialized review result and send the final response to GraphQL
            const parsedReviewRatingCriterionsValuesResultCollection = JSON.parse(JSON.stringify(resultCollection));
            const serializedReviewArgReviewRatingCriterionsValues = [];
            parsedReviewRatingCriterionsValuesResultCollection.map((currentReviewRatingCriterionDataSet) => {
              const serializedCurrentReviewRatingCriterionDataSet = rename(currentReviewRatingCriterionDataSet, serializeObject);
              serializedReviewArgReviewRatingCriterionsValues.push(serializedCurrentReviewRatingCriterionDataSet);
            });
            serializedReviewResult.reviewRatingCriterionsValues = serializedReviewArgReviewRatingCriterionsValues;
            return serializedReviewResult;
          })
          .catch((err) => { return err; },
          );
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
        const insertedReview = resp;
        insertedReview.reviewRatingCriterionsValues.map((currentReviewRatingCriterionDataSet) => {
          const insertedReviewRatingCriterion = currentReviewRatingCriterionDataSet;
          insertedReviewRatingCriterion.ratingCriterion = ratingCriterionModel.where({ id: currentReviewRatingCriterionDataSet.ratingCriterionId })
            .fetch({ columns: ['name'] })
            .then((resultRatingCriterionName) => {
              const parsedRatingCriterionName = JSON.parse(JSON.stringify(resultRatingCriterionName));
              return parsedRatingCriterionName;
            })
            .catch((error) => { return error; },
            );
        });
        pubsub.publish(REVIEW_ADDED_KEY, insertedReview);
      }
    });
}


export function deleteReview(obj, args, context, info) {
  const item = reviewModel;
  return deleteItem(obj, args, context, info, item);
}
