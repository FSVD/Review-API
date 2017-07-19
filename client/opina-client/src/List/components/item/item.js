import React, { Component } from 'react';

export default class Item extends Component {
  render() {
    const name = this.props.name;
    console.log(name);
    return (
      <p> { name } </p>
    )
  }
}
