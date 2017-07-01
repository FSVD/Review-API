import { mysqlConnector } from '../_common/connectors/common.connectors';

export function getSubjectData(obj, args, context, info) {
  return mysqlConnector(obj, args, context, info);
}
