import { mysqlConnector } from '../_common/connectors/common.connectors';

export function getReviewData(obj, args, context, info) {
  return mysqlConnector(obj, args, context, info);
}

export function typeToString(obj, args, context, info) {
  console.log(obj.type);
  let typeString = '';
  if (obj.type === 1) { typeString = 'Like'; }
  if (obj.type === 2) { typeString = 'Dislike'; }
  return typeString;
}
