import Bookshelf from '../../../db';
import { UserModel } from '../user/user.model';
import {
  ReviewModel,
  ReviewEvaluationModel,
} from '../review/review.model';

// Subject model
const subjectModel = Bookshelf.Model.extend({
  tableName: 'subject',

  category() {
    return this.belongsTo('subjectCategoryModel');
  },

  reviews() {
    return this.hasMany('ReviewModel');
  },

}, {
  dependents: ['subjectCategoryModel', 'ReviewModel'],
});

// Subject' category model
const subjectCategoryModel = Bookshelf.Model.extend({
  tableName: 'subject_category',

  ratingCriterions() {
    return this.hasMany('ratingCriterionModel');
  },

  subjects() {
    return this.hasMany('subjectModel');
  },

}, {
  dependents: ['ratingCriterionModel', 'subjectModel'],
});

// Rating criterion model
const ratingCriterionModel = Bookshelf.Model.extend({
  tableName: 'rating_criterion',

  subjectCategories() {
    return this.belongsToMany('subjectCategoryModel');
  },

}, {
  dependents: ['reviewModel'],
});

// Subject Category Rating criterion model
const subjectCategoryRatingCriterionModel = Bookshelf.Model.extend({
  tableName: 'subject_category_rating_criterion',
}, {
  dependents: ['reviewModel'],
});

const SubjectModel = Bookshelf.model('subjectModel', subjectModel); // To avoid circular dependency we have to export using this bookshelf sintax
const SubjectCategoryModel = Bookshelf.model('subjectCategoryModel', subjectCategoryModel);
const RatingCriterionModel = Bookshelf.model('ratingCriterionModel', ratingCriterionModel);
const SubjectCategoryRatingCriterionModel = Bookshelf.model('subjectCategoryRatingCriterionModel', subjectCategoryRatingCriterionModel);

export {
  SubjectModel,
  SubjectCategoryModel,
  RatingCriterionModel,
  SubjectCategoryRatingCriterionModel
};
