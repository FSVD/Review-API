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
  generateFullName,
} from '../user/user.connectors';
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
    // Rename arguments' property names, complete the object with others properties and delete extra properties to perform review insert
    const deserializedReviewArgs = rename(args, deserializeObject);
    deserializedReviewArgs.created_at = new Date();
    deserializedReviewArgs.updated_at = new Date();
    delete deserializedReviewArgs.review_rating_criterions_values; // Delete review rating criterions values array
    // Insert new review
    return reviewModel.forge()
      .save(deserializedReviewArgs, { transacting: addNewReview })
      .then((reviewResult) => {
        // Serialize review result to send to GraphQL
        const parsedReviewResult = JSON.parse(JSON.stringify(reviewResult));
        const serializedReviewResult = rename(parsedReviewResult, serializeObject);
        // Rename arguments properties names, add more properties for each review rating criterions values array item
        const deserializedReviewArgReviewRatingCriterionsValues = [];
        args.reviewRatingCriterionsValues.map((currentReviewRatingCriterionDataSet) => {
          const deserializedCurrentReviewRatingCriterionDataSet = rename(currentReviewRatingCriterionDataSet, deserializeObject);
          deserializedCurrentReviewRatingCriterionDataSet.review_id = reviewResult.id;
          deserializedCurrentReviewRatingCriterionDataSet.created_at = new Date();
          deserializedCurrentReviewRatingCriterionDataSet.updated_at = new Date();
          deserializedReviewArgReviewRatingCriterionsValues.push(deserializedCurrentReviewRatingCriterionDataSet);
        });
        // Insert new review rating criterions values array
        return reviewRatingCriterionValueCollection.forge(deserializedReviewArgReviewRatingCriterionsValues)
          .invokeThen('save', null, { transacting: addNewReview })
          .then((reviewRatingCriterionValueResultCollection) => {
            // Serialize result collection, add it to serialized review result and send the final response to GraphQL
            const parsedReviewRatingCriterionsValuesResultCollection = JSON.parse(JSON.stringify(reviewRatingCriterionValueResultCollection));
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
        const serializedReview = resp;
        // Get rating criterion name for each rating criterion value
        serializedReview.reviewRatingCriterionsValues.map((currentReviewRatingCriterionDataSet) => {
          const serializedReviewRatingCriterion = currentReviewRatingCriterionDataSet;
          serializedReviewRatingCriterion.ratingCriterion = ratingCriterionModel.where({ id: currentReviewRatingCriterionDataSet.ratingCriterionId })
            .fetch({ columns: ['name'] })
            .then((ratingCriterionNameResult) => {
              const parsedRatingCriterionName = JSON.parse(JSON.stringify(ratingCriterionNameResult));
              console.log(parsedRatingCriterionName);
              return parsedRatingCriterionName;
            })
            .catch((error) => { return error; },
            );
        });
        // Get review author full name
        serializedReview.author = userModel.where({ id: serializedReview.userId })
          // .fetch({ columns: ['first_name', 'last_name'] })
          .fetch()
          .then((authorNameResult) => {
            const parsedAuthorName = JSON.parse(JSON.stringify(authorNameResult));
            console.log(parsedAuthorName);
            console.log(serializedReview);
            return parsedAuthorName;
          })
          .catch((error) => { return error; },
          ); 
        /* const argmts = { id: serializedReview.userId };
        serializedReview.author = {};
        serializedReview.author = generateFullName(argmts);
        console.log(serializedReview); */
        // Send subscription to all subscripted clients
        pubsub.publish(REVIEW_ADDED_KEY, serializedReview);
      }
    });
}

export function deleteReview(obj, args, context, info) {
  const item = reviewModel;
  return deleteItem(obj, args, context, info, item);
}
