import Bookshelf from '../../../db';
import { ReviewModel } from '../review/review.model';

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

  static dependents = ['reviews'];
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

  subjectCategoryRatingCriterions() {
    return this.belongsToMany('subjectCategoryRatingCriterionModel');
  }

  static dependents = ['subjectCategoryRatingCriterions'];
}

// Rating criterion model
class ratingCriterionModel extends Bookshelf.Model{

  get tableName() {
    return 'rating_criterion';
  }

  subjectCategories() {
    return this.belongsToMany('subjectCategoryModel');
  }

  subjectCategoryRatingCriterions() {
    return this.belongsToMany('subjectCategoryRatingCriterionModel');
  }

  static dependents = ['subjectCategoryRatingCriterions'];
}

// Subject Category Rating criterion model
class subjectCategoryRatingCriterionModel extends Bookshelf.Model {

  get tableName() {
    return 'subject_category_rating_criterion';
  }

  subjectCategories() {
    return this.hasMany('subjectCategoryModel');
  }

  ratingCriterions() {
    return this.hasMany('ratingCriterionModel');
  }
}

const SubjectModel = Bookshelf.model('subjectModel', subjectModel);
const SubjectCategoryModel = Bookshelf.model('subjectCategoryModel', subjectCategoryModel);
const RatingCriterionModel = Bookshelf.model('ratingCriterionModel', ratingCriterionModel);
const SubjectCategoryRatingCriterionModel = Bookshelf.model('subjectCategoryRatingCriterionModel', subjectCategoryRatingCriterionModel);

export {
  SubjectModel,
  SubjectCategoryModel,
  RatingCriterionModel,
  SubjectCategoryRatingCriterionModel,
};
