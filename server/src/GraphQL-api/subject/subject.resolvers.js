import {
  getSubjectData,
  deleteSubjectCategory,
  deleteRatingCriterion,
} from './subject.connectors';

export const resolvers = {
  Query: {
    subjectById: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjects: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjectCategories: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjectCategoryRatingCriterions: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    ratingCriterions: (obj, args, context, info) => getSubjectData(obj, args, context, info),
  },

  Mutation: {
    deleteSubjectCategory: (obj, args, context, info) => deleteSubjectCategory(obj, args, context, info),
    deleteRatingCriterion: (obj, args, context, info) => deleteRatingCriterion(obj, args, context, info),
  },

  Subject: {},

  SubjectCategory: {},

  RatingCriterion: {},

  SubjectCategoryRatingCriterion: {},
};
