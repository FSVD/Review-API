const reviews = [{
  id: 1,
  user_id: 1,
  subject_id: 1,
  title: 'Title review 1',
  content: 'Content review 1',
  review_status: 1, // Approved || Rejected || Pending
}, {
  id: 2,
  user_id: 2,
  subject_id: 2,
  title: 'Title review 2',
  content: 'Content review 2',
  review_status: 0,
}, {
  id: 3,
  user_id: 3,
  subject_id: 3,
  title: 'Title review 3',
  content: 'Content review 3',
  review_status: 1,
}];

const reviewEvaluation = [{
  id: 1,
  type: 1, // Like || Dislike
  user_id: 1,
  review_id: 1,
}, {
  id: 2,
  type: 2,
  user_id: 2,
  review_id: 2,
}, {
  id: 3,
  type: 1,
  user_id: 3,
  review_id: 3,
}];

export {
  reviews,
  reviewEvaluation,
};
