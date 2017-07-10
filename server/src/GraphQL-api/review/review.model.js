import bookshelf from '../../../db';
import { userModel } from '../user/user.model';
import {
  subjectModel,
  subjectCategoryModel,
  ratingCriterionModel,
  subjectCategoryRatingCriterionModel,
} from '../subject/subject.model';

// Review model
class ReviewModel extends bookshelf.Model {

  get tableName() {
    return 'review';
  }

  user() {
    return this.belongsTo('UserModel');
  }

  subject() {
    return this.belongsTo('SubjectModel');
  }

  reviewEvaluations() {
    return this.hasMany('ReviewEvaluationModel');
  }

  reviewRatingCriterionValues() {
    return this.hasMany('ReviewRatingCriterionValueModel');
  }

  static dependents = ['reviewEvaluations', 'reviewRatingCriterionValues'];
}

// Review' evaluation model
class ReviewEvaluationModel extends bookshelf.Model {

  get tableName() {
    return 'review_evaluation';
  }
}

// Review' rating criterion values model
class ReviewRatingCriterionValueModel extends bookshelf.Model {

  get tableName() {
    return 'review_rating_criterion_value';
  }
}

// Review' rating criterion values collection
class ReviewRatingCriterionValueCollection extends bookshelf.Collection{

  get model() {
    return ReviewRatingCriterionValueModel;
  }
}

const reviewModel = bookshelf.model('ReviewModel', ReviewModel);
const reviewEvaluationModel = bookshelf.model('ReviewEvaluationModel', ReviewEvaluationModel);
const reviewRatingCriterionValueModel = bookshelf.model('ReviewRatingCriterionValueModel', ReviewRatingCriterionValueModel);
const reviewRatingCriterionValueCollection = ReviewRatingCriterionValueCollection;

export {
  reviewModel,
  reviewEvaluationModel,
  reviewRatingCriterionValueModel,
  reviewRatingCriterionValueCollection,
};
