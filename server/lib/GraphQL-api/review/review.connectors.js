import { mysqlConnector } from '../_common/connectors/common.connectors';

export function getReviewData(obj, args, context, info) {
  return mysqlConnector(obj, args, context, info);
}

export function stringifyType(obj, args, context, info) {
  let stringifiedType = '';
  if (obj.type === 1) { stringifiedType = 'Like'; }
  if (obj.type === 2) { stringifiedType = 'Dislike'; }
  return stringifiedType;
}
