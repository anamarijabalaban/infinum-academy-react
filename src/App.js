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
      <div className='showsDiv'>
        <h2 className='alignCenter'>TV shows</h2>
        <ul className='showList'>
        {
          this.state.shows.map((show) => <li className='showTitle'>{show.title}</li>)
        }
        </ul>
      </div>
    );
  }
}
