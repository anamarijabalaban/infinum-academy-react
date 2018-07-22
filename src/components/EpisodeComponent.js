import React, { Component } from 'react';
import { css } from 'emotion';
import getImage from '../imagesImports';
import {VoteComponent} from './VoteComponent';
import {like, dislike} from '../services/show';
import state from '../state';

const img = css`
  width: 80%;
  height: inherit;
`;

const leftBox = css`
  grid-row: 1/2;
  grid-column: 1/2;
  height: 130px;
`;

const rightBox = css`
  grid-row: 1/2;
  grid-column: 2/4;
  display: grid;
  font-size: 15px;
`;

const container = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 10px;
`;

const likeEpisodeBox=css`
  text-decoration: none;
  color: black;
  border: none;
  background-color:#F8F8F8;
`;

const inlineBox=css`
  display: inline-block;
  margin: 0;
  padding:0;
  width: 15px;
`;

const votesBox=css`
  align-items: center;
`;

const pinkText=css`
  color: #FF7590;
  font-size: 17px;
`;
export class EpisodeComponent extends Component {
  render(){

    const {episode} = this.props
    console.log(episode);
    const props = {
      show: this.props,
      black: 'B'
    }
    return (
      <div className={container}>
        <div className={leftBox} >
          <img className={img} alt='Episode' src={getImage(`episode`)} />
        </div>
        <div className={rightBox} >
          <div className={pinkText}> {episode.title} </div>
          <div> {episode.description.substring(0,160)}... </div>
          <div className={votesBox}>
            <button className={likeEpisodeBox} onClick={()=> like(state, episode._id)}>
              <img className={inlineBox} alt='Like' src={getImage(`thumbUpB`)} />
              <p className={inlineBox}>1</p>
            </button>

            <button className={likeEpisodeBox} onClick={()=> dislike(state, episode._id)}>
              <img className={inlineBox} alt='DisLike' src={getImage(`thumbDownB`)} />
              <p className={inlineBox}>2</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
