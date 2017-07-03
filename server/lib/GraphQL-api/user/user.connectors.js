import { mysqlConnector } from '../_common/connectors/common.connectors';
import { UserModel } from './user.model';

export function getUserData(obj, args, context, info) {
  return mysqlConnector(obj, args, context, info);
}

export function generateFullName(obj, args, context, info) {
  return UserModel.where('id', obj.id)
    .fetch({ columns: ['first_name', 'last_name'] })
    .then((result) => {
      const parsedResult = JSON.parse(JSON.stringify(result));
      const fullName = `${parsedResult.first_name} ${parsedResult.last_name}`;
      return fullName;
    });
}

export function firstNameToUpperCase(obj, args, context, info) {
  return UserModel.where('id', obj.id)
    .fetch({ columns: ['first_name'] })
    .then((result) => {
      const parsedResult = JSON.parse(JSON.stringify(result));
      const firstNameUpperCased = `${parsedResult.first_name}`.toUpperCase();
      return firstNameUpperCased;
    });
}

export function addUser(obj, args, context, info) {
  const newUser = {
    username: args.username || 'placeholderUsername',
    first_name: args.firstName,
    last_name: args.lastName,
    password: args.password || 'placeholderPassword',
    email: args.email || 'placeholder@icloud.com',
    city: args.city,
    newsletter_agree: args.newsletterAgree || true,
    user_account_status: args.userAccountStatus || 1,
    created_at: new Date(),
    updated_at: new Date(),
  };
  return UserModel.forge(newUser)
    .save()
    .then((result) => {
      const parsedResult = JSON.parse(JSON.stringify(result));
      const newInsertedUser = {
        id: parsedResult.id,
        username: parsedResult.username,
        firstName: parsedResult.first_name,
        lastName: parsedResult.last_name,
        password: parsedResult.password,
        email: parsedResult.email,
        city: parsedResult.city,
        newsletterAgree: parsedResult.newsletter_agree,
        userAccountStatus: parsedResult.user_account_status,
        reviews: [],
      };
      return newInsertedUser;
    })
    .catch((err) => {
      return Promise.reject({ error: err, message: err.message, propagatedBy: { module: 'user connector', function: 'addUser' } });
    });
}
