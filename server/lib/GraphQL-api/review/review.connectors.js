import { commonConnector } from '../_common/connectors/common.connectors';

export function rootConnector(obj, args, context, info) {
  return commonConnector(obj, args, context, info);
}
