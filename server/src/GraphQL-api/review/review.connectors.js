import { mysqlConnector } from '../_common/connectors/common.connectors';
import { reviewEvaluationModel } from './review.model';

export function getReviewData(obj, args, context, info) {
  return mysqlConnector(obj, args, context, info);
}

export function stringifyType(obj, args, context, info) {
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
  console.log(args);
}
