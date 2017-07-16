import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

import ReviewList from './ReviewList';
import SubjectPreview from './SubjectPreview';
import NotFound from './NotFound';

const SubjectDetails = ({ data: {loading, error, subject}, match }) => {
  if (loading) {
    return <SubjectPreview subjectId={match.params.subjectId}/>;
  }
  if (error) {
    return <p className="error">{ error.message }</p>;
  }
  if (subject === null) {
    return <NotFound />
  }
  
  return (
    <div>
      <div className="subjectGooglePlacesReference">
        Subject: {subject.googlePlacesReference}
      </div>
      <br></br>
      <ReviewList reviews={subject.reviews} />
    </div>
  );
};

export const subjectDetailsQuery = gql`
    query SubjectDetailsQuery($subjectId: Int) {
      subject(id: $subjectId) {
        id
        googlePlacesReference
        reviews {
          id
          title
          content
          reviewRatingCriterionsValues {
            id
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
    }
`;


export default (graphql(subjectDetailsQuery, {
  options: (props) => ({
    variables: { subjectId: props.match.params.subjectId },
  }),
})(SubjectDetails));