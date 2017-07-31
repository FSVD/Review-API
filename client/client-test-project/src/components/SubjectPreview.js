import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';


const SubjectPreview = ({ data: {loading, error, subject } }) => {
  if (loading) {
    return <p className="loading">Loading...</p>;
  }
  if (error) {
    return <p className="error">{ error.message }</p>;
  }

  return (
    <div>
      <div className="subjectGooglePlacesReference">
        {subject.googlePlacesReference}
      </div>
      <p className="loading">Loading Reviews</p>
    </div>);
};

export const subjectQuery = gql`
  query SubjectQuery($subjectId : Int) {
    subject(id: $subjectId) {
      id
      googlePlacesReference
    }
  }
`;

export default (graphql(subjectQuery, {
  options: (props) => ({
    variables: { subjectId: props.subjectId },
  }),
})(SubjectPreview));