import Bookshelf from '../../../db';
import {
  SubjectCategoryModel,
  RatingCriterionModel,
} from '../subject/subject.model';

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

const SubjectCategoryRatingCriterionModel = Bookshelf.model('subjectCategoryRatingCriterionModel', subjectCategoryRatingCriterionModel);

export { SubjectCategoryRatingCriterionModel };
