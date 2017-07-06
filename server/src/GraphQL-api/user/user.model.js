// In this file we'll create models based on our ORM (in this cade Bookshelf models)
// After we'll import this model into connector

import Bookshelf from '../../../db'; // Import Bookshelf instance for DB connection
import {
  reviewModel,
  reviewEvaluationModel,
} from '../review/review.model'; // Import registered models

// User model
class UserModel extends Bookshelf.Model {

  get tableName () {
    return 'user';
  }

  review() {
    return this.hasMany('ReviewModel');
  }

  reviewEvaluations() {
    return this.hasMany('ReviewEvaluationModel');
  }

  static dependents = ['review', 'reviewEvaluations']; // Set dependencies based on model's relations to anable cascade delete
}

const userModel = Bookshelf.model('UserModel', UserModel); // Register model to Bookshelf registry plugin to avoid circular dependency

export { userModel }; // Export registered model
