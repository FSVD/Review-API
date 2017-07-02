// In this file we'll create models based on our ORM (in this cade Bookshelf models)
// After we'll import this model into connector

import Bookshelf from '../../../db';
import { UserModel } from '../user/user.model';
import {
  SubjectModel,
  SubjectCategoryModel,
  RatingCriterionModel,
  SubjectCategoryRatingCriterionModel,
} from '../subject/subject.model';

// Review model
const reviewModel = Bookshelf.Model.extend({
  tableName: 'review',

  reviewEvaluations() {
    return this.hasMany('reviewEvaluationModel');
  },

  user() {
    return this.belongsTo('UserModel');
  },

  subject() {
    return this.belongsTo('SubjectModel');
  },

}, {
  dependents: ['reviewEvaluationModel', 'UserModel', 'SubjectModel'],
});

// Review' evaluation model
const reviewEvaluationModel = Bookshelf.Model.extend({
  tableName: 'review_evaluation',
}, {
  dependents: ['reviewModel'],
});

const ReviewModel = Bookshelf.model('reviewModel', reviewModel); // To avoid circular dependency we have to export using this bookshelf sintax
const ReviewEvaluationModel = Bookshelf.model('reviewEvaluationModel', reviewEvaluationModel);

export {
  ReviewModel,
  ReviewEvaluationModel,
};
