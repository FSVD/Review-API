import React, { Component } from 'react';
// import Item from '../item/item.js';

export default class ItemList extends Component {
  render() {
    const items = this.props.result.employees;
    console.log(items);
    return (
      <div>

      "Ole!"
      </div>
    )
  }
}
