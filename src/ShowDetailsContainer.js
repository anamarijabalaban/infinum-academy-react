import React, { Component } from 'react';
import {ShowComponent} from './ShowComponent'
import {EpisodeComponent} from './EpisodeComponent'
import styles from './app.css';

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
    const { showId } = this.props.match.params;
    return (
      <div className='shows-div'>

        <ul className='episode-list'>
        <h3 className='align-center'>{this.state.show.title}</h3>
        {
          this.state.episodes.length === 0
            ? 'No episodes'
            : this.state.episodes.map((episode) => <EpisodeComponent episode={episode}/>)

        }
        </ul>
      </div>
    );
  }
}
