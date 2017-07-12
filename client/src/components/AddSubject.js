import React from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';

import { subjectsListQuery } from './SubjecListWithData';

const AddSubject = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      console.log(evt.target.value);
      mutate({
        // Even if there is a subjectCategoryId in the form the value sended to server is always 1 because I don't know how to pass multiple fields values :)
        variables: { subjectCategoryId:1, googlePlacesReference: evt.target.value },
        refetchQueries: [{ query: subjectsListQuery }],
      })
      .then( res => {
        evt.target.value = '';
      });
    }
  }

  return (
    <div>
      <form>
        <input
          key="subjectCategoryId"
          type="number"
          placeholder="Category ID"
        />
        <input
          key="googlePlacesReference"
          type="text"
          placeholder="New subject"
          onKeyUp={handleKeyUp}
        />
      </form>
    </div>
  )
}

const addSubjectMutation = gql`
  mutation addSubject (
    $subjectCategoryId: Int
    $googlePlacesReference: String
    )
    {
      addSubject(
        subjectCategoryId: $subjectCategoryId
        googlePlacesReference: $googlePlacesReference
      ) {
        subjectCategoryId
        googlePlacesReference
      }
    }
`;

const AddSubjectWithMutation = graphql(
  addSubjectMutation
)(AddSubject);

export default AddSubjectWithMutation;