import Bookshelf from '../../../db';
import { userModel } from '../user/user.model';
import {
  subjectModel,
  subjectCategoryModel,
  ratingCriterionModel,
  subjectCategoryRatingCriterionModel,
} from '../subject/subject.model';

// Review model
class ReviewModel extends Bookshelf.Model {

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
class ReviewEvaluationModel extends Bookshelf.Model {

  get tableName() {
    return 'review_evaluation';
  }
}

// Review' rating criterion values model
class ReviewRatingCriterionValueModel extends Bookshelf.Model {

  get tableName() {
    return 'review_rating_criterion_value';
  }
}

const reviewModel = Bookshelf.model('ReviewModel', ReviewModel);
const reviewEvaluationModel = Bookshelf.model('ReviewEvaluationModel', ReviewEvaluationModel);
const reviewRatingCriterionValueModel = Bookshelf.model('ReviewRatingCriterionValueModel', ReviewRatingCriterionValueModel);

export {
  reviewModel,
  reviewEvaluationModel,
  reviewRatingCriterionValueModel,
};
