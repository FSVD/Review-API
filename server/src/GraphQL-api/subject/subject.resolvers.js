import {
  getSubjectData,
  deleteSubjectCategory,
  deleteRatingCriterion,
  getRatingCriterionsValuesAverage,
  getRatingCriterionsValuesAverageKnex,
} from './subject.connectors';

export const resolvers = {
  Query: {
    subjectById: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjects: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjectCategoryById: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjectCategories: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    ratingCriterionById: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    ratingCriterions: (obj, args, context, info) => getSubjectData(obj, args, context, info),
  },

  Mutation: {
    deleteSubjectCategory: (obj, args, context, info) => deleteSubjectCategory(obj, args, context, info),
    deleteRatingCriterion: (obj, args, context, info) => deleteRatingCriterion(obj, args, context, info),
  },

  Subject: {
    ratingCriterionsValuesAverage: (obj, args, context, info) => getRatingCriterionsValuesAverage(obj, args, context, info),
  },

  SubjectCategory: {},

  RatingCriterion: {},

  SubjectCategoryRatingCriterion: {},
};
