import React, { Component } from 'react';
import {EpisodeComponent} from '../components/EpisodeComponent'
import { css } from 'emotion';
import { observer } from 'mobx-react';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import state from '../state';
import {getById, getAllEpisodesByShowId} from '../services/show';
import getImage from '../imagesImports';
import {VoteComponent} from '../components/VoteComponent';
import {Link}  from 'react-router-dom';


const showsDiv = css`
  margin: 0 400px;
`;

const container2 = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 50px;
  grid-gap: 10px 5px;
  grid-template-rows: 50px auto 50px;
  font-family: Arial, Helvetica, sans-serif;;
`;

const contentBox = css`
  grid-row: 2 / 12;
  grid-column: 1 / 5;
  padding: 0 18%;
  background-color: #F8F8F8;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;

`;

const backBox = css`
  grid-row: 1 / 2;
  grid-column: 1 / 3;
`;

const descBox = css`
  grid-row: 2 / 3;
  grid-column: 1 / 3;
`;

const episodesBox = css`
  grid-row: 3/5;
  grid-column: 1/3;
`;

const imgBox = css`
  grid-row: 2 / 4;
  grid-column: 3 / 4;
`;

const linksBox = css`
  grid-row: 4 / 5;
  grid-column: 3 / 4;
`;

const episodeBoxTitle = css`
  border-bottom: 1px solid #A0A0A0;
  color: #FF7590;
`;

const showTitle = css`
  font-weight: bold;
  font-size: 20px;
  display:inline-block;
`;

const titleRowBox=css`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
`;

const votesBox=css`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;

`;

@observer
export class ShowDetailsContainer extends Component {

  componentDidMount(){
    const { showId } = this.props.match.params;
    getById(state, showId)
    getAllEpisodesByShowId(state, showId)
  }

  render(){
    const image = getImage(state.show.title);
    const props = {
      show: state.show,
      black: ''
    }
    return (
      <div className={container2}>
        <Header/>
        <div className={contentBox}>
          <div className={backBox}>lala</div>
          <div className={descBox}>
            <div className={titleRowBox}>
              <p className={showTitle}>{state.show.title}</p>
              <VoteComponent {...props}/>
            </div>
            <p>{state.show.description}</p>
          </div>
          <div className={episodesBox}>
          <p className={episodeBoxTitle}>SEASONS AND EPISODES</p>
          {
            state.episodes.length
              ? state.episodes.map((episode) => <EpisodeComponent episode={episode}/>)
              : 'No episodes'
          }
          {
            state.episodes.length
              ? state.episodes.map((episode) => <EpisodeComponent episode={episode}/>)
              : 'No episodes'
          }
          </div>
          <div className={imgBox}>
            <span> Add episode </span>
            <span> Favorite </span>
            <div>
            <img alt={`${state.show.title}`} src={image} />
            <div>
            <Link to=''>Official Website</Link>
            </div>
            <div>
            <Link to=''>Wikipedia</Link>
            </div>
            <div>
            <Link to=''>IMDB</Link>
            </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
