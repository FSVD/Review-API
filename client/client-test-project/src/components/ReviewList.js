import React from 'react';

import AddReview from './AddReview';

const ReviewList = ({ reviews }) => {
  return (
    <div className="reviewList">
      <AddReview />
      <br></br>
      { reviews.map( review =>
        (<div key={review.id} className={'review ' + (review.id < 0 ? 'optimistic' : '')}>
            <strong>{review.title}</strong>
            <br></br>
            {review.content}
            <br></br>
            <br></br>
            {review.reviewRatingCriterionsValues.map( reviewRatingCriterionValue => (
              <div key={reviewRatingCriterionValue.id}>{ reviewRatingCriterionValue.ratingCriterion.name}: {reviewRatingCriterionValue.value} </div>
            ))}
            <br></br>
            <i>{review.author.fullName}</i>
            <br></br>
            <br></br>
        </div>)
      )}
    </div>
  );
};
export default (ReviewList);