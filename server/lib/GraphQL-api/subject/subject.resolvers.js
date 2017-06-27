// import * as MocksModule from '../review/review.mocks';
// import * as Connectors from './subject.connectors';

import { subjectConnector } from './subject.connectors';

export const resolvers = {
  Subject: {
    category: (obj, args, context, info) => subjectConnector(obj, args, context, info),
    reviews: (obj, args, context, info) => subjectConnector(obj, args, context, info),
  },
  SubjectCategory: {
    rating_criterions: (obj, args, context, info) => subjectConnector(obj, args, context, info),
    subjects: (obj, args, context, info) => subjectConnector(obj, args, context, info),
  },
  RatingCriterion: {
    subject_categories: (obj, args, context, info) => subjectConnector(obj, args, context, info),
  },
};
