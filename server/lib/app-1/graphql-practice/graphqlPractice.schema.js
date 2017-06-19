const graphQL = require('graphql');
const model = require('./graphqlPractice.model');

const User = new graphQL.GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => ({
    id: {
      type: graphQL.GraphQLInt,
      resolve(userModel) {
        return userModel.id;
      },
    },
    userName: {
      type: graphQL.GraphQLString,
      resolve(userModel) {
        return userModel.username;
      },
    },
    firstName: {
      type: graphQL.GraphQLString,
      resolve(userModel) {
        return userModel.first_name;
      },
    },
    lastName: {
      type: graphQL.GraphQLString,
      resolve(userModel) {
        return userModel.last_name;
      },
    },
    email: {
      type: graphQL.GraphQLString,
      resolve(userModel) {
        return userModel.email;
      },
    },
    city: {
      type: graphQL.GraphQLString,
      resolve(userModel) {
        return userModel.city;
      },
    },
    newsletterAgree: {
      type: graphQL.GraphQLBoolean,
      resolve(userModel) {
        return userModel.newsletter_agree;
      },
    },
    reviewStatus: {
      type: graphQL.GraphQLBoolean,
      resolve(userModel) {
        return userModel.user_status;
      },
    },
    reviews: {
      type: new graphQL.GraphQLList(Review),
      resolve(userModel) {
        return userModel.getReviews();
      },
    },
  }),
});

const Review = new graphQL.GraphQLObjectType({
  name: 'Review',
  description: 'This represents a Review',
  fields: () => ({
    id: {
      type: graphQL.GraphQLInt,
      resolve(review) {
        return review.id;
      },
    },
    reviewTitle: {
      type: graphQL.GraphQLString,
      resolve(review) {
        return review.title;
      },
    },
    reviewContent: {
      type: graphQL.GraphQLString,
      resolve(review) {
        return review.content;
      },
    },
  }),
});

const Query = new graphQL.GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      users: {
        type: new graphQL.GraphQLList(User),
        args: {
          id: {
            type: graphQL.GraphQLInt
          },
          email: {
            type: graphQL.GraphQLString
          }
        },
        resolve(root, args) {
          return model.models.userModel.findAll({ where: args });
        }
      },
      reviews: {
        type: new graphQL.GraphQLList(Review),
        resolve(root, args) {
          return model.models.reviewModel.findAll({ where: args });
        }
      }
    };
  }
});

const Schema = new graphQL.GraphQLSchema({
  query: Query
});

module.exports = Schema;

