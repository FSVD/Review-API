const db = require('../../../db');

const userModel = db.Model.extend({
  tableName: 'user',

  review() {
    return this.hasMany('reviewModel');
  },
}, {
  dependents: ['reviewModel'],
});

const reviewModel = db.Model.extend({
  tableName: 'review',

  user() {
    return this.belongsTo('userModel');
  },
});

module.exports = db.model('userModel', userModel);
module.exports = db.model('reviewModel', reviewModel);
