import React, { Component } from 'react';
import {EpisodeComponent} from './components/EpisodeComponent'
import { css } from 'emotion';

const showsDiv = css`
  margin: 0 400px;
`;

const alignCenter = css`
  text-align: center;
`;

export class ShowDetailsContainer extends Component {
  constructor (args){
    super(args);

    this.state ={
      show: [],
      episodes: []
    }
  }

  componentDidMount(){
    const { showId } = this.props.match.params;
    fetch(`https://api.infinum.academy/api/shows/${showId}`)
      .then((data) => data.json())
      .then((response) => this.setState({show: response.data}));
    fetch(`https://api.infinum.academy/api/shows/${showId}/episodes`)
      .then((data) => data.json())
      .then((response) => this.setState({episodes: response.data}));
  }

  render(){
    return (
      <div className={showsDiv}>
        <ul>
        <h3 className={alignCenter}>{this.state.show.title}</h3>
        {
          this.state.episodes.length
            ? this.state.episodes.map((episode) => <EpisodeComponent episode={episode}/>)
            : 'No episodes'
        }
        </ul>
      </div>
    );
  }
}
