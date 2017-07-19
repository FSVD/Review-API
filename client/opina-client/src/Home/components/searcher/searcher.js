import React, { Component } from 'react';

export class BasicSearcher extends Component {
  render() {
    return (
      <div className="App-searcher">
        <h4> Find a subject </h4>
        <input type="text" className="App-searcher-input" />
        <button>Search</button>
      </div>
    )
  }
}

export class AdvancedSearcher extends Component {
  render() {
    return (
      <div className="App-searcher">
        <div className="topAdvancedSearcher">
          <div>What?</div>
          <div>
            <h5>Category</h5>
            <select>
              <option>Bar</option>
              <option>Talleres mecánicos</option>
              <option>Dentistas</option>
            </select>
            <p>Can not find your category? Add one then!</p>
          </div>
          <div>
            <h5> Subject </h5>
            <input type="text" />
          </div>
        </div>
        <hr/>
        <div className="bottomAdvancedSearcher">
          <div>Where?</div>
          <div>
            <h5>City</h5>
            <input type="text" />
          </div>
          <div>
            <h5> Post code </h5>
            <input type="text" />
          </div>
        </div>
        <hr />
        <button>Search</button>
      </div>
    )
  }
}
