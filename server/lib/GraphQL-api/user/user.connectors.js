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
    })
    .catch((err) => { return err; },
    );
}

export function firstNameToUpperCase(obj, args, context, info) {
  return UserModel.where('id', obj.id)
    .fetch({ columns: ['first_name'] })
    .then((result) => {
      const parsedResult = JSON.parse(JSON.stringify(result));
      const firstNameUpperCased = `${parsedResult.first_name}`.toUpperCase();
      return firstNameUpperCased;
    })
    .catch((err) => { return err; },
    );
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
      const insertedUser = {
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
      return insertedUser;
    })
    .catch((err) => { return err; },
    );
}

export function updateUser(obj, args, context, info) {
  return UserModel.where('id', args.id)
    .save({
      username: args.username,
      first_name: args.firstName,
      last_name: args.lastName,
      password: args.password,
      email: args.email,
      city: args.city,
      newsletter_agree: args.newsletterAgree,
      user_account_status: args.userAccountStatus,
      updated_at: new Date(),
    },
    {
      method: 'update',
      patch: true,
    })
    .then((result) => {
      const parsedResult = JSON.parse(JSON.stringify(result));
      const updateddUser = {
        id: args.id,
        username: parsedResult.username,
        firstName: parsedResult.first_name,
        lastName: parsedResult.last_name,
        password: parsedResult.password,
        email: parsedResult.email,
        city: parsedResult.city,
        newsletterAgree: parsedResult.newsletter_agree,
        userAccountStatus: parsedResult.user_account_status,
      };
      return updateddUser;
    })
    .catch((err) => { return err; },
    );
}

export function deleteUser(obj, args, context, info) {
  return UserModel.forge({ id: args.id })
    .destroy()
    .then(() => {
      return { id: args.id };
    })
    .catch((err) => { return err; },
    );
}
