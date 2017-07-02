import { mysqlConnector } from '../_common/connectors/common.connectors';

export function getUserData(obj, args, context, info) {
  return mysqlConnector(obj, args, context, info);
}

export function generateFullName(obj, args, context, info) {
  return `${obj.first_name} ${obj.last_name}`;
}

export function firstNameToUpperCase(obj, args, context, info) {
  return obj.firstName.toUpperCase();
}
