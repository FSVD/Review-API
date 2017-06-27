// import * as MocksModule from '../review/review.mocks';
// import * as Connectors from './user.connectors';

import { userConnector } from './user.connectors';

// console.log(MocksModule.users);

export const resolvers = {
  User: {
    reviews: (obj, args, context, info) => userConnector(obj, args, context, info),
  },
};
