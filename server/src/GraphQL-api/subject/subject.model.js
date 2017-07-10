import bookshelf from '../../../db';
import { reviewModel } from '../review/review.model';

// Subject model
class SubjectModel extends bookshelf.Model {

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
class SubjectCategoryModel extends bookshelf.Model {

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
class RatingCriterionModel extends bookshelf.Model{

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
class SubjectCategoryRatingCriterionModel extends bookshelf.Model {

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

const subjectModel = bookshelf.model('SubjectModel', SubjectModel);
const subjectCategoryModel = bookshelf.model('SubjectCategoryModel', SubjectCategoryModel);
const ratingCriterionModel = bookshelf.model('RatingCriterionModel', RatingCriterionModel);
const subjectCategoryRatingCriterionModel = bookshelf.model('SubjectCategoryRatingCriterionModel', SubjectCategoryRatingCriterionModel);

export {
  subjectModel,
  subjectCategoryModel,
  ratingCriterionModel,
  subjectCategoryRatingCriterionModel,
};
