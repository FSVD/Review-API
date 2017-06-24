import * as MocksModule from '../review/review.mocks';
import * as Connectors from './user.connectors';

// console.log(MocksModule.users);

export const resolvers = {
  User: {
    reviews: () => MocksModule.reviews,
  },
};
