import { knex } from '../../../db/index'; // Import Knex instance for DB connection
import {
  mysqlConnector,
  deleteItem,
} from '../_common/connectors/common.connectors';
import {
  subjectCategoryModel,
  ratingCriterionModel,
} from './subject.model';

export function getSubjectData(obj, args, context, info) {
  return mysqlConnector(obj, args, context, info);
}

export function deleteSubjectCategory(obj, args, context, info) {
  const item = subjectCategoryModel;
  return deleteItem(obj, args, context, info, item);
}

export function deleteRatingCriterion(obj, args, context, info) {
  const item = ratingCriterionModel;
  return deleteItem(obj, args, context, info, item);
}

// Get rating Criterions Values Average passing a raw query to Knex
export function getRatingCriterionsValuesAverageRawQuery(obj, args, context, info) {
  const sql = `
    SELECT
      ratingCriterion.id AS "ratingCriterionId",
      ratingCriterion.name AS "ratingCriterionName",
      SUM(reviewRatingCriterionValue.value) AS "totalValuesSum",
      COUNT(reviewRatingCriterionValue.value) AS "totalValuesCount",
      ROUND(SUM(reviewRatingCriterionValue.value)/COUNT(reviewRatingCriterionValue.value), 1) AS "valuesAverage"
    FROM subject sbj
      JOIN review rvw ON rvw.subject_id = sbj.id
      JOIN review_rating_criterion_value reviewRatingCriterionValue ON reviewRatingCriterionValue.review_id = rvw.id
      JOIN rating_criterion ratingCriterion ON ratingCriterion.id = reviewRatingCriterionValue.rating_criterion_id
    WHERE subject_id = ${obj.id}
    GROUP BY reviewRatingCriterionValue.rating_criterion_id;`;
  return knex.raw(sql)
    .then((result) => {
      return result[0];
    })
    .catch((err) => { return err; },
    );
}

// Get rating Criterions Values Average building a query with Knex
export function getRatingCriterionsValuesAverage(obj, args, context, info) {
  return knex.select(
    'ratingCriterion.id AS ratingCriterionId',
    'ratingCriterion.name AS ratingCriterionName')
    .count('reviewRatingCriterionValue.value AS totalValuesCount')
    .avg('reviewRatingCriterionValue.value AS valuesAverage')
    .from('subject AS sbj')
    .join('review AS rvw', 'rvw.subject_id', 'sbj.id')
    .join('review_rating_criterion_value AS reviewRatingCriterionValue', 'reviewRatingCriterionValue.review_id', 'rvw.id')
    .join('rating_criterion AS ratingCriterion', 'ratingCriterion.id', 'reviewRatingCriterionValue.rating_criterion_id')
    .where('subject_id', '=', `${obj.id}`)
    .groupBy('reviewRatingCriterionValue.rating_criterion_id')
    .then((result) => {
      result.map((ratingCriterionInfo) => {
        ratingCriterionInfo.valuesAverage = Math.round(ratingCriterionInfo.valuesAverage * 10) / 10;
      });
      return result;
    })
    .catch((err) => { return err; },
    );
}
