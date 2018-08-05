import React, { Component } from 'react';
import { css } from 'emotion';
import getImage from '../imagesImports';

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
  width: 100%;
`;

const container = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px 0;
  color: black;
  &:hover{
    background-color: #8080800d;
  }
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

const episodeTitle= css`{
  color: black;
  padding-left: 5px;
}`;

const pinkText=css`
  color: #FF7590;
  font-size: 17px;
  display: inline-block;
  margin: 0;
`;

const episodeDis =css`{
  word-wrap: break-word;
}`;
export class EpisodeComponent extends Component {
  render(){

    const {episode} = this.props
    console.log('Episode: ',episode);
    return (
      <div className={container}>
        <div className={leftBox} >
        {
          episode.imageUrl===''
          ? <img className={img} alt='Episode' src={getImage(`noImage`)} />
          : <img className={img} alt='Episode' src={`https://api.infinum.academy${episode.imageUrl}`} />
        }
        </div>
        <div className={rightBox} >
          <div className={pinkText}> S{episode.season} Ep{episode.episodeNumber}
            <span className={episodeTitle}>{episode.title}</span>
          </div>

          <p className={episodeDis}> {episode.description.substring(0,160)}... </p>
          <div className={votesBox}>
              <img className={inlineBox} alt='Like' src={getImage(`thumbUpB`)} />
              <p className={inlineBox}>1</p>

              <img className={inlineBox} alt='DisLike' src={getImage(`thumbDownB`)} />
              <p className={inlineBox}>2</p>
          </div>
        </div>
      </div>
    );
  }
}
