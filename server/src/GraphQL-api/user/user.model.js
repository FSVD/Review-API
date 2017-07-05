// In this file we'll create models based on our ORM (in this cade Bookshelf models)
// After we'll import this model into connector

import Bookshelf from '../../../db'; // Import Bookshelf instance for DB connection
import {
  ReviewModel,
  ReviewEvaluationModel,
} from '../review/review.model'; // Import registered models

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

  static dependents = ['review', 'reviewEvaluations']; // Set dependencies based on model's relations to anable cascade delete
}

const UserModel = Bookshelf.model('userModel', userModel); // Register model to Bookshelf registry plugin to avoid circular dependency

export { UserModel }; // Export registered model
