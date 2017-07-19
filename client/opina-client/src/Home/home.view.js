import React, { Component } from 'react';
import { BasicSearcher , AdvancedSearcher } from './components/searcher/searcher';
import Header from '../_commons/header/header';
import Footer from '../_commons/footer/footer';
import './home.css';

export class HomeView extends Component {
  renderHome() {
    return (
      <div>
        <h1> Opina </h1>
        <BasicSearcher />
        <a href="/extended"> Advanced search </a>
      </div>
    );
  }

  renderExtendedHome() {
    return (
      <div>
        <h1> Opina </h1>
        <a href='/'> Free search </a>
        <AdvancedSearcher />
      </div>
    );
  }

  render() {
    const searcher = 0 === this.props.searcher
      ? this.renderHome()
      : this.renderExtendedHome();

    return (
      <div className="App">
        <div className="App-intro">
          <Header />
          { searcher }
          <Footer />
        </div>
      </div>
    );
  }
}
