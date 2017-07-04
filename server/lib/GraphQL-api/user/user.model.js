import Bookshelf from '../../../db';
import {
  ReviewModel,
  ReviewEvaluationModel,
} from '../review/review.model';

// User model
const userModel = Bookshelf.Model.extend({
  tableName: 'user',

  reviewEvaluations() {
    return this.hasMany('ReviewModel');
  },

}/*, {
  dependents: ['ReviewModel'],
}*/);

const UserModel = Bookshelf.model('userModel', userModel); // To avoid circular dependency we have to export using this bookshelf sintax

export { UserModel };
