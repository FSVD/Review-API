import React from 'react';
import { withRouter } from 'react-router';
import {
  gql,
  graphql,
} from 'react-apollo';

import { subjectDetailsQuery } from './SubjectDetails';

const AddReview = ({ mutate, match }) => {
  const handleSubmit = (evt) => {
    evt.persist();
    mutate({
      variables: {
        userId: 1,
        subjectId: match.params.subjectId,
        title: this.title.value,
        content: this.content.value,
        reviewStatus: 1,
        reviewRatingCriterionsValues: [
          {
            ratingCriterionId: 1,
            value: 2,
          },
          {
            ratingCriterionId: 2,
            value: 2,
          }
        ]
      },
      refetchQueries: [{
        query: subjectDetailsQuery,
        variables: { subjectId: match.params.subjectId }
      }], 
      optimisticResponse: {
        addReview: {
          id: Math.round(Math.random() * -1000000),
          userId: 1,
          subjectId: match.params.subjectId,
          title: this.title.value,
          content: this.content.value,
          reviewStatus: 1,
          reviewRatingCriterionsValues: [
            {
              id: Math.round(Math.random() * -1000000),
              ratingCriterionId: 1,
              value: 2,
              ratingCriterion: {
                name: 'Nombre',
                __typename: 'RatingCriterion',
              },
              __typename: 'ReviewRatingCriterionValue',
            },
            {
              id: Math.round(Math.random() * -1000000),
              ratingCriterionId: 2,
              value: 2,
              ratingCriterion: {
                name: 'Nombre',
                __typename: 'RatingCriterion',
              },
              __typename: 'ReviewRatingCriterionValue',
            },
          ],
          author: {
            fullName: 'Fabios Schettino',
            __typename: 'User',
          },
          __typename: 'Review',
        }
      },
      /* update: (cache, { data: { addReview }}) => {
        //console.log('Cache:');
        //console.log(cache);
        console.log('New review:');
        console.log(addReview);
        const data = cache.readQuery({ query: subjectDetailsQuery, variables: { subjectId: match.params.subjectId } });
        console.log('Query cached:');
        console.log(data);
        data.subject.reviews.push(addReview);
        //console.log(data.subject.reviews);
        cache.writeQuery({ query: subjectDetailsQuery, variables: { subjectId: match.params.subjectId },data });
      }, */   
    })
    .then(res => {
      this.title.value = '';
      this.content.value = '';
    });
  };

  const handleTitleChange = (evt) => {
    //this.setState({ subjectCategoryId: evt.target.value });
    //console.log(evt.target.value);
  };

  const handleContentChange = (evt) => {
    //this.setState({ googlePlacesReference: evt.target.value });
    //console.log(evt.target.value);
  };

  return (
    <div>
      <form>
        <input ref={input => this.title = input} type="text" name="title" placeholder="Review title" onChange={handleTitleChange} />
        <input ref={input => this.content = input} type="text" name="content" placeholder="Review content" onChange={handleContentChange} />
        <button type="button" value="Add review" onClick={handleSubmit}>Add review</button>
      </form>
    </div>
  );
};

const addReviewMutation = gql`
  mutation addReview (
    $userId: Int
    $subjectId: Int
    $title: String
    $content: String
    $reviewStatus: Int
    $reviewRatingCriterionsValues: [ReviewRatingCriterionValueInput]
    )
    {
      addReview(
        userId: $userId
        subjectId: $subjectId
        title: $title
        content: $content
        reviewStatus: $reviewStatus
        reviewRatingCriterionsValues: $reviewRatingCriterionsValues
      ) {
        id
        userId
        subjectId
        title
        content
        reviewStatus
        reviewRatingCriterionsValues {
          id
          ratingCriterionId
          value
          ratingCriterion {
            name
          }
        }
        author {
          fullName
        }
      }
    }
`;

const AddReviewWithMutation = graphql(
  addReviewMutation
)(withRouter(AddReview));

export default AddReviewWithMutation;