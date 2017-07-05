import Bookshelf from '../../../db';
//require('../review/review.model');

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
    return this.hasMany('reviewModel');
  }

  reviewEvaluations() {
    return this.hasMany('reviewEvaluationModel');
  }

  static dependents = ['review'];
}

const UserModel = Bookshelf.model('userModel', userModel); // To avoid circular dependency we have to export using this bookshelf sintax

export { UserModel };
