const subjects = [{
  id: 1,
  category_id: '1',
  google_places_reference: 'fsdfsafasdf-sfasrwerfasd-sdf',
}, {
  id: 2,
  category_id: '2',
  google_places_reference: 'fsdfsafasdf-sfasrwerfasd-sdf',
}, {
  id: 3,
  category_id: '3',
  google_places_reference: 'fsdfsafasdf-sfasrwerfasd-sdf',
}];

const categories = [{
  id: 1,
  name: 'category 1',
}, {
  id: 2,
  name: 'category 2',
}, {
  id: 3,
  name: 'category 3',
}];

const retingCriterions = [{
  id: 1,
  name: 'Cleaning',
}, {
  id: 2,
  name: 'Price',
}, {
  id: 3,
  name: 'Quality',
}];

const subjectCategoryRatingCriterion = [{
  id: 1,
  subject_category_id: 1,
  rating_criterion_id: 1,
}, {
  id: 2,
  subject_category_id: 2,
  rating_criterion_id: 2,
}, {
  id: 3,
  subject_category_id: 3,
  rating_criterion_id: 3,
}];

export {
  subjects,
  categories,
  retingCriterions,
  subjectCategoryRatingCriterion,
};
