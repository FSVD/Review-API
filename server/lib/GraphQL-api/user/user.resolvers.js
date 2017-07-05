import {
  getUserData,
  addUser,
  updateUser,
  deleteUser,
  firstNameToUpperCase,
  generateFullName,
} from './user.connectors';

export const resolvers = {
  Query: {
    userById: (obj, args, context, info) => getUserData(obj, args, context, info),
    users: (obj, args, context, info) => getUserData(obj, args, context, info),
    usersByFirstname: (obj, args, context, info) => getUserData(obj, args, context, info),
    usersByNewsletterAgree: (obj, args, context, info) => getUserData(obj, args, context, info),
  },

  Mutation: {
    addUser: (obj, args, context, info) => addUser(obj, args, context, info),
    updateUser: (obj, args, context, info) => updateUser(obj, args, context, info),
    deleteUser: (obj, args, context, info) => deleteUser(obj, args, context, info),
  },

  User: {
    firstName: (obj, args, context, info) => firstNameToUpperCase(obj, args, context, info),
    fullName: (obj, args, context, info) => generateFullName(obj, args, context, info),
  },
};
