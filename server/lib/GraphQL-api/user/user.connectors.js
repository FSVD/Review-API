import { mysqlConnector } from '../_common/connectors/common.connectors';
import { UserModel } from './user.model';

export function getUserData(obj, args, context, info) {
  return mysqlConnector(obj, args, context, info);
}

export function generateFullName(obj, args, context, info) {
  return `${obj.first_name} ${obj.last_name}`;
}

export function firstNameToUpperCase(obj, args, context, info) {
  return obj.firstName.toUpperCase();
}

export function addUser(obj, args, context, info) {
  return UserModel.forge({
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
  })
    .save()
    .then((result) => {
      const parsedResult = JSON.parse(JSON.stringify(result));
      const newUserId = { id: parsedResult.id };
      return getUserData(obj, newUserId, context, info);
    })
    .catch((err) => {
      return Promise.reject({ error: err, message: err.message, propagatedBy: { module: 'user connector', function: 'addUser' } });
    });
}
