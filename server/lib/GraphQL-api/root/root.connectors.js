import { UserModel } from '../user/user.model';

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
