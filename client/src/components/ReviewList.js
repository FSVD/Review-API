import React from 'react';

//import AddReview from './AddReview';

const ReviewList = ({ reviews }) => {
  return (
    <div className="reviewList">
      { reviews.map( review =>
        (<div key={review.id} className={'review ' + (review.id < 0 ? 'optimistic' : '')}>
            {review.title}
            <br></br>
            {review.content}
            <br></br>
            <br></br>
            {review.reviewRatingCriterionsValues.map( reviewRatingCriterionValue => (
              <div key={reviewRatingCriterionValue.id}>{ reviewRatingCriterionValue.ratingCriterion.name}: {reviewRatingCriterionValue.value} </div>
            ))}
            <br></br>
            {review.author.fullName}
            <br></br>
            <br></br>
        </div>)
      )}
      {/* <AddReview /> */}
    </div>
  );
};
export default (ReviewList);