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
    //console.log(this.subjectCategoryId.value);
    //console.log(this.googlePlacesReference.value);
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
            value: 4
          },
          {
            ratingCriterionId: 2,
            value: 4
          }
        ],
        author: {
          fullName: 'Fabio Schettino',
        }
      },
      optimisticResponse: {
        addReview: {
          userId: 1,
          subjectId: match.params.subjectId,
          title: this.title.value,
          content: this.content.value,
          reviewStatus: 1,
          reviewRatingCriterionsValues: [
            {
              id: Math.round(Math.random() * -1000000),
              ratingCriterionId: 1,
              value: 4,
              __typename: 'ReviewRatingCriterionValue',
              ratingCriterion: {
                name: 'Nombre',
                __typename: 'RatingCriterion',
              }
            },
            {
              id: Math.round(Math.random() * -1000000),
              ratingCriterionId: 2,
              value: 4,
              __typename: 'ReviewRatingCriterionValue',
              ratingCriterion: {
                name: 'Nombre',
                __typename: 'RatingCriterion',
              }
            },
          ],
          author: {
            fullName: 'Fabio Schettino',
            __typename: 'User',
          },
          id: Math.round(Math.random() * -1000000),
          __typename: 'Review',
        }
      },
       update: (cache, { data: { addReview }}) => {
        console.log(addReview);
        const data = cache.readQuery({ query: subjectDetailsQuery, variables: { subjectId: match.params.subjectId } });
        console.log(data.subject.reviews);
        data.subject.reviews.push(addReview);
        console.log(data.subject.reviews);
        cache.writeQuery({ query: subjectDetailsQuery, variables: { subjectId: match.params.subjectId },data });
      }, 
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