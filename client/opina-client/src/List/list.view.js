import React, { Component } from 'react';
import ItemList from './components/itemList/itemList';
import './list.css';

export default class ListView extends Component {
  render() {
    const result = "{'employees':[{'firstName':'John', 'lastName':'Doe'},{'firstName':'Anna', 'lastName':'Smith'},{'firstName':'Peter', 'lastName':'Jones'}]}";
    return (
      <div className="App">
        <div className="App-intro">
        <h1> Search List </h1>
          <ItemList result={ result } />
        </div>
      </div>
    );
  }
}
