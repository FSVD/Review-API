import Bookshelf from '../../../db';
import { UserModel } from '../user/user.model';
import {
  ReviewModel,
  ReviewEvaluationModel,
} from '../review/review.model';

// Subject model
class subjectModel extends Bookshelf.Model {

  get tableName() {
    return 'subject';
  }

  subjectCategory() {
    return this.belongsTo('subjectCategoryModel');
  }

  reviews() {
    return this.hasMany('ReviewModel');
  }
}

// Subject' category model
class subjectCategoryModel extends Bookshelf.Model {

  get tableName() {
    return 'subject_category';
  }

  ratingCriterions() {
    return this.hasMany('ratingCriterionModel');
  }

  subjects() {
    return this.hasMany('subjectModel');
  }
}

// Rating criterion model
class ratingCriterionModel extends Bookshelf.Model{

  get tableName() {
    return 'rating_criterion';
  }

  subjectCategories() {
    return this.belongsToMany('subjectCategoryModel');
  }
}

// Subject Category Rating criterion model
class subjectCategoryRatingCriterionModel extends Bookshelf.Model {

  get tableName() {
    return 'subject_category_rating_criterion';
  }
}

const SubjectModel = Bookshelf.model('subjectModel', subjectModel); // To avoid circular dependency we have to export using this bookshelf sintax
const SubjectCategoryModel = Bookshelf.model('subjectCategoryModel', subjectCategoryModel);
const RatingCriterionModel = Bookshelf.model('ratingCriterionModel', ratingCriterionModel);
const SubjectCategoryRatingCriterionModel = Bookshelf.model('subjectCategoryRatingCriterionModel', subjectCategoryRatingCriterionModel);

export {
  SubjectModel,
  SubjectCategoryModel,
  RatingCriterionModel,
  SubjectCategoryRatingCriterionModel,
};
