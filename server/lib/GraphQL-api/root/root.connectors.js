import joinMonster from 'join-monster';
import { UserModel } from '../user/user.model';

// Require knex db configuration
import knex from '../../../db/knex.index';

export function getUsers() {
  return UserModel.fetchAll()
    .then((result) => {
      if (!result) {
        throw new Error('No users in our database');
      } else {
        const parsedResult = JSON.parse(JSON.stringify(result));
        console.log(parsedResult);
        return parsedResult;
      }
    })
    .catch(err =>
      Promise.reject({ error: err, message: err.message }),
    );
}

export function getUsersJM(obj, args, context, info) {
  console.log(`Fetching data with Joint Monster package for user: ${args.id}`);
  return joinMonster(info, {}, (sql) => knex.raw(sql)
    .then((result) => {
      const parsedResult = JSON.parse(JSON.stringify(result[0]));
      console.log(parsedResult);
      return result[0];
    }), { dialect: 'mysql' });
}

