import joinMonster from 'join-monster';
import { knex } from '../../../../db/index'; // Import Knex instance for DB connection

export function mysqlConnector(obj, args, context, info) {
  return joinMonster(info, {}, sql => (
    knex.raw(sql)
  ).then((result) => {
    return result[0];
  }), { dialect: 'mysql' })
    .catch((err) => { return err; }
    );
}

export function deleteItem(obj, args, context, info, item) {
  return item.forge({ id: args.id })
    .destroy()
    .then(() => {
      return { id: args.id };
    })
    .catch((err) => { return err; },
    );
}
