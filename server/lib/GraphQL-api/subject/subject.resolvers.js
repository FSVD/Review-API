import * as MocksModule from '../review/review.mocks';
import * as Connectors from './subject.connectors';

// console.log(MocksModule.users);

export const resolvers = {
  Subject: {
    reviews: () => MocksModule.reviews,
  },
};
