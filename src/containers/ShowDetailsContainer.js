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
import { observable } from 'mobx';


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
  grid-column-gap: 30px;
  grid-row-gap: 10px;

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
  margin: 5px;
`;

const titleRowBox=css`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
`;

const topImageBox=css`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;

`;

const plusBox=css`
  grid-column: 1/2;
  display: flex;
  align-items: center;
  font-size: 13px;
  border: 1px solid #A0A0A0;
  border-radius: 20px;
  padding: 3px;
  text-decoration: none;
`;

const heartBox=css`
  grid-column: 2/2;
  display: flex;
  align-items: center;
  font-size: 13px;
  border: 1px solid #A0A0A0;
  border-radius: 20px;
  padding: 3px;
  text-decoration: none;
`;

const plusImg=css`
  width: 25px;
  padding-right: 2px;
`;

const heartImg=css`
  width: 25px;
  padding-right: 2px;
`;

const goBackImg=css`

`;

const showLink=css`
`;

const imgShowDiv=css`
  padding-top: 1em;
`;

const showImg=css`
  width: 100%;
  padding-bottom: 10px;
border-bottom: 1px solid #A0A0A0;
`;

const transparentHeartBox=css`
  grid-column: 2/2;
  display: flex;
  align-items: center;
  font-size: 13px;
  border: 1px solid #A0A0A0;
  border-radius: 20px;
  padding: 3px;
  text-decoration: none;
  background-color: #d0a9a9;
`;

@observer
export class ShowDetailsContainer extends Component {
  @observable
  componentState = {
    favorite: false
  }
  constructor(props) {
    super(props);
    this._setFavorite = this._setFavorite.bind(this);
  }

  _setFavorite(event){
    let favorites = localStorage.getItem('favorites');
    if (!favorites){
      localStorage.setItem('favorites', `${state.show._id} `);
    }else{
      console.log('list1:',favorites);
      if (favorites.includes(`${state.show._id}`)){
        favorites=favorites.replace(new RegExp(`${state.show._id}`, 'g'), '');
        localStorage.setItem('favorites', `${favorites.trim()}`);
      }else{
        localStorage.setItem('favorites', `${favorites.trim()} ${state.show._id}`);
      }
    }
    this.componentState.favorite = !this.componentState.favorite;

  }

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
          <div className={backBox}>
            <Link className={showLink} to={`/shows`}>
              <img calssName={goBackImg} alt='Go back' src={getImage('goBack')} />
            </Link>
          </div>
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
          </div>
          <div className={imgBox}>
            <div className={topImageBox}>
              <Link className = {plusBox} to=''>
                <img className={plusImg} alt='New episode' src={getImage('plus')} />
                <div>New episode</div>
              </Link>
              <button className = {this.componentState.favorite ? transparentHeartBox: heartBox} onClick={this._setFavorite} disable='true' >

                  <img className={heartImg} alt='Favorite' src={getImage('heart')} />
                  <div>Favorite</div>

              </button>
            </div>
            <div className={imgShowDiv}>
              <img className={showImg} alt={`${state.show.title}`} src={image} />
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
