import { firstNameToUpperCase, generateFullName } from './user.connectors';

export const resolvers = {
  User: {
    firstName: (obj, args, context, info) => firstNameToUpperCase(obj, args, context, info),
    fullName: (obj, args, context, info) => generateFullName(obj, args, context, info),
  },
};
