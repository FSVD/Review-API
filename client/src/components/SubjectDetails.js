import React from 'react';
import NotFound from './NotFound';

import {
    gql,
    graphql,
} from 'react-apollo';

const SubjectDetails = () => {
  let id = 1;
  let googlePlacesReference = 'gpl-ref-000';
  let subject = {id, googlePlacesReference};
  
  return (
    <div>
      <br></br>
      <div className="blockTitle">Subject {subject.googlePlacesReference} reviews </div>
      <br></br>
    </div>);
}

export default (SubjectDetails);