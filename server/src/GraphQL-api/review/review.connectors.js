import bookshelf from '../../../db/index'; // Import Knex instance for DB connection
import { mysqlConnector } from '../_common/connectors/common.connectors';
import {
  reviewModel,
  reviewEvaluationModel,
  reviewRatingCriterionValueModel,
} from './review.model';

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
  const newReview = {
    user_id: args.userId,
    subject_id: args.subjectId,
    title: args.title,
    content: args.content,
    review_status: 1,
    created_at: new Date(),
    updated_at: new Date(),
  };
  // Perform multiple insert wrapped in a transaction,
  bookshelf.transaction((transaction) => {
    // First: insert review
    return reviewModel.forge(newReview, { transacting: transaction })
      .save()
      .then((result) => {
        // Second: Based on created review id insert rating criterions values
        const newReviewRatingCriterionValue = {
          review_id: result.id,
          rating_criterion_id: args.reviewRatingCriterionsValues[0].ratingCriterionId,
          value: args.reviewRatingCriterionsValues[0].value,
          created_at: new Date(),
          updated_at: new Date(),
        };
        return reviewRatingCriterionValueModel.forge(newReviewRatingCriterionValue)
          .save()
          .then(transaction.commit)
          .catch(transaction.rollback);
      });
  })
    .exec(() => {
      console.log('Transaction completed');
    });
}
