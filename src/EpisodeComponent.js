import React, { Component } from 'react';

export class EpisodeComponent extends Component {
  render(){
    const {episode} = this.props
    return (
      <li className='episode-title'> {episode.title} </li>
    );
  }
}
