import { getSubjectData } from './subject.connectors';

export const resolvers = {
  Query: {
    subjectById: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjects: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjectCategories: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjectCategoryRatingCriterions: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    ratingCriterions: (obj, args, context, info) => getSubjectData(obj, args, context, info),
  },

  Subject: {},

  SubjectCategory: {},

  RatingCriterion: {},

  SubjectCategoryRatingCriterion: {},
};
