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
class reviewModel extends Bookshelf.Model {

  get tableName() {
    return 'review';
  }

  user() {
    return this.belongsTo('userModel');
  }

  subject() {
    return this.belongsTo('subjectModel');
  }

  reviewEvaluations() {
    return this.hasMany('reviewEvaluationModel');
  }

  reviewRatingCriterionValues() {
    return this.hasMany('reviewRatingCriterionValueModel');
  }
}

// Review' evaluation model
class reviewEvaluationModel extends Bookshelf.Model {

  get tableName() {
    return 'review_evaluation';
  }
}

// Review' rating criterion values model
class reviewRatingCriterionValueModel extends Bookshelf.Model {

  get tableName() {
    return 'review_rating_criterion_value';
  }
}

const ReviewModel = Bookshelf.model('reviewModel', reviewModel); // To avoid circular dependency we have to export using this bookshelf sintax
const ReviewEvaluationModel = Bookshelf.model('reviewEvaluationModel', reviewEvaluationModel);
const ReviewRatingCriterionValueModel = Bookshelf.model('reviewRatingCriterionValueModel', reviewRatingCriterionValueModel);

export {
  ReviewModel,
  ReviewEvaluationModel,
  ReviewRatingCriterionValueModel,
};
