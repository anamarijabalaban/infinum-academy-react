import React, { Component } from 'react';
import styles from './app.css';

export default class App extends Component {
  constructor(args) {
    super(args);

    this.state = {
      shows: []
    }
  }

  render() {

    fetch('https://api.infinum.academy/api/shows')
      .then((data) => data.json())
      .then((response) => this.setState({shows: response.data}));
    const showNames = this.state.shows.map((show) => show.title);

    return (
      <div id='showsDiv'>
        <h2 class='alignCenter'>TV shows</h2>
        <ul id='showList'>
        {
          this.state.shows.map((show) => <li class='showTitle'>{show.title}</li>)
        }
        </ul>
      </div>
    );
  }
}
