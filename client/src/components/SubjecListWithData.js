import React from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import AddSubject from './AddSubject';

const SubjectsList = ({ data: {loading, error, subjects}}) => {
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{ error.message }</p>
  }
  
  return (
    <div className="subjectsList">
    <AddSubject />
      <br></br>
      <div className="blockTitle">Subjects List (Google Places Reference)</div>
      <br></br>
      { subjects.map( sbj => 
        (<div key={sbj.id} className="subject">{sbj.googlePlacesReference}</div>)
      )}
    </div>
  );
};

export const subjectsListQuery = gql`
    query SubjectsListQuery {
      subjects {
        id
        googlePlacesReference
      }
    }
`;

export default graphql(subjectsListQuery, { options: { pollInterval: 5000 }, })(SubjectsList);