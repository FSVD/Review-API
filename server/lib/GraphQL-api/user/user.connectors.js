import { mysqlConnector } from '../_common/connectors/common.connectors';

export function getUserData(obj, args, context, info) {
  return mysqlConnector(obj, args, context, info);
}

export function generateFullName(obj, args, context, info) {
  return obj.firstName + ' ' + obj.lastName;
}

export function firstNameToUpperCase(obj, args, context, info) {
  return obj.firstName.toUpperCase();
}
