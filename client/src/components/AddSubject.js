import React from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';

import { subjectsListQuery } from './SubjecListWithData';

const AddSubject = ({ mutate }) => {
  const handleSubmit = (evt) => {
    evt.persist();
    //console.log(this.subjectCategoryId.value);
    //console.log(this.googlePlacesReference.value);
    mutate({
      variables: { subjectCategoryId: this.subjectCategoryId.value, googlePlacesReference: this.googlePlacesReference.value },
      // refetchQueries: [{ query: subjectsListQuery }], // Instead of refeching data, which means make a second roundtrip from client to server, we'll use update property exposed in mutate by Apollo CLient
      optimisticResponse: {
        addSubject: {
          subjectCategoryId: this.subjectCategoryId.value,
          googlePlacesReference: this.googlePlacesReference.value,
          id: Math.round(Math.random() * -1000000),
          __typename: 'Subject',
        }
      },
      update: (cache, { data: { addSubject }}) => {
        // console.log(addSubject);
        const data = cache.readQuery({ query: subjectsListQuery });
        // console.log(data);
        data.subjects.push(addSubject);
        // console.log(data);
        cache.writeQuery({ query: subjectsListQuery, data });
      },
    })
    .then(res => {
      this.subjectCategoryId.value = '';
      this.googlePlacesReference.value = '';
    });
  };

  const handleSubjectCategoryIdChange = (evt) => {
    //this.setState({ subjectCategoryId: evt.target.value });
    //console.log(evt.target.value);
  };

  const handleGooglePlacesReferenceChange = (evt) => {
    //this.setState({ googlePlacesReference: evt.target.value });
    //console.log(evt.target.value);
  };

  return (
    <div>
      <form>
        <input ref={input => this.subjectCategoryId = input} type="number" name="subjectCategoryId" placeholder="Category ID" onChange={handleSubjectCategoryIdChange} />
        <input ref={input => this.googlePlacesReference = input} type="text" name="googlePlacesReference" placeholder="Google Places Reference" onChange={handleGooglePlacesReferenceChange} />
        <button type="button" value="Add subject" onClick={handleSubmit}>Add subject</button>
      </form>
    </div>
  );
};

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
        id
        subjectCategoryId
        googlePlacesReference
      }
    }
`;

const AddSubjectWithMutation = graphql(
  addSubjectMutation
)(AddSubject);

export default AddSubjectWithMutation;