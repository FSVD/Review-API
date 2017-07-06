import Bookshelf from '../../../db';
import { reviewModel } from '../review/review.model';

// Subject model
class SubjectModel extends Bookshelf.Model {

  get tableName() {
    return 'subject';
  }

  subjectCategory() {
    return this.belongsTo('SubjectCategoryModel');
  }

  reviews() {
    return this.hasMany('ReviewModel');
  }

  static dependents = ['reviews'];
}

// Subject' category model
class SubjectCategoryModel extends Bookshelf.Model {

  get tableName() {
    return 'subject_category';
  }

  ratingCriterions() {
    return this.hasMany('RatingCriterionModel');
  }

  subjects() {
    return this.hasMany('SubjectModel');
  }

  subjectCategoryRatingCriterions() {
    return this.hasMany('SubjectCategoryRatingCriterionModel');
  }

  static dependents = ['subjectCategoryRatingCriterions'];
}

// Rating criterion model
class RatingCriterionModel extends Bookshelf.Model{

  get tableName() {
    return 'rating_criterion';
  }

  subjectCategories() {
    return this.belongsToMany('SubjectCategoryModel');
  }

  subjectCategoryRatingCriterions() {
    return this.hasMany('SubjectCategoryRatingCriterionModel');
  }

  static dependents = ['subjectCategoryRatingCriterions'];
}

// Subject Category Rating criterion model
class SubjectCategoryRatingCriterionModel extends Bookshelf.Model {

  get tableName() {
    return 'subject_category_rating_criterion';
  }

  subjectCategories() {
    return this.hasMany('SubjectCategoryModel');
  }

  ratingCriterions() {
    return this.hasMany('RatingCriterionModel');
  }
}

const subjectModel = Bookshelf.model('SubjectModel', SubjectModel);
const subjectCategoryModel = Bookshelf.model('SubjectCategoryModel', SubjectCategoryModel);
const ratingCriterionModel = Bookshelf.model('RatingCriterionModel', RatingCriterionModel);
const subjectCategoryRatingCriterionModel = Bookshelf.model('SubjectCategoryRatingCriterionModel', SubjectCategoryRatingCriterionModel);

export {
  subjectModel,
  subjectCategoryModel,
  ratingCriterionModel,
  subjectCategoryRatingCriterionModel,
};
