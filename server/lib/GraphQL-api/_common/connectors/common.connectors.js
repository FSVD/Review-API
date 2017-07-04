import joinMonster from 'join-monster';

// Require knex db configuration
import { knex } from '../../../../db/index';

export function mysqlConnector(obj, args, context, info) {
  return joinMonster(info, {}, sql => (
    knex.raw(sql)
  ).then((result) => {
    return result[0];
  }), { dialect: 'mysql' })
    .catch((err) => { return err; }
    );
}
