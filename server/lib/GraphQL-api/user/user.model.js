import Bookshelf from '../../../db';
import {
  ReviewModel,
  ReviewEvaluationModel,
} from '../review/review.model';

// User model
class userModel extends Bookshelf.Model {

  get tableName () {
    return 'user';
  }

  review() {
    return this.hasMany('ReviewModel');
  }

  reviewEvaluations() {
    return this.hasMany('ReviewEvaluationModel');
  }

  // static dependents = ['ReviewModel', 'ReviewEvaluationModel'];
}

const UserModel = Bookshelf.model('userModel', userModel); // To avoid circular dependency we have to export using this bookshelf sintax

export { UserModel };
