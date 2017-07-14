import rename from 'rename-keys';
import {
  deserializeObject,
  serializeObject,
  mysqlConnector,
  deleteItem,
} from '../_common/connectors/common.connectors';
import { userModel } from './user.model';

export function getUserData(obj, args, context, info) {
  return mysqlConnector(obj, args, context, info);
}

export function generateFullName(obj, args, context, info) {
  return userModel.where('id', obj.id)
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
  return userModel.where('id', obj.id)
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
  const deserializedArgs = rename(args, deserializeObject);
  deserializedArgs.created_at = new Date();
  deserializedArgs.updated_at = new Date();
  console.log(deserializedArgs);
  return userModel.forge(deserializedArgs)
    .save()
    .then((result) => {
      const parsedResult = JSON.parse(JSON.stringify(result));
      const serializedResult = rename(parsedResult, serializeObject);
      console.log(serializedResult);
      return serializedResult;
    })
    .catch((err) => { return err; },
    );
}

export function updateUser(obj, args, context, info) {
  const deserializedArgs = rename(args, deserializeObject);
  deserializedArgs.updated_at = new Date();
  return userModel.where('id', args.id)
    .save(deserializedArgs,
      {
        method: 'update',
        patch: true,
      })
    .then((result) => {
      const parsedResult = JSON.parse(JSON.stringify(result));
      const serializedResult = rename(parsedResult, serializeObject);
      console.log(serializedResult);
      return serializedResult;
    })
    .catch((err) => { return err; },
    );
}

export function deleteUser(obj, args, context, info) {
  const item = userModel;
  return deleteItem(obj, args, context, info, item);
}
