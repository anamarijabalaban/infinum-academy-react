import React, { Component } from 'react';
import {EpisodeComponent} from '../components/EpisodeComponent'
import { css } from 'emotion';
import { observer } from 'mobx-react';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import state from '../state';
import {getById, getAllEpisodesByShowId} from '../services/show';
import getImage from '../imagesImports';
import {Link, Redirect}  from 'react-router-dom';
import { observable, action } from 'mobx';
import {like, dislike} from '../services/show';

const container2 = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 50px;
  grid-gap: 10px 5px;
  grid-template-rows: 50px auto 50px;
  font-family: Arial, Helvetica, sans-serif;
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
  position: relative;
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
  width: 110px;
  &:visited{
    color: black;
  }
`;

const plusImg=css`
  width: 25px;
  padding-right: 2px;
`;

const heartImg=css`
  width: 25px;
  padding-right: 2px;
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
  width: 110px;
  &:visited{
    color: black;
  }
`;

const likeShowBox=css`
  border: 1px solid #A0A0A0;
  border-radius: 15px;
  align-items: center;
  display: inline-flex;
  justify-content: space-around;
  width: 45%;
  text-decoration: none;
  color: black;
`;

const inlineBox=css`
  display: inline-block;
  margin: 0;
  padding:0;
  width: 25px;
`;

const votesBox=css`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
`;

const episodeLink = css`{
  text-decoration: none;
}`;

@observer
export class ShowDetailsContainer extends Component {
  @observable
  componentState = {
    favorite: false,
    show: {}
  }

  @action.bound
  _setFavorite(){
    this.componentState.favorite = !this.componentState.favorite;
    let favorites = localStorage.getItem('favorites');
    if (!favorites){
      localStorage.setItem('favorites', `${this.componentState.show._id} `);
    }else{
      if (favorites.includes(`${this.componentState.show._id}`)){
        favorites=favorites.replace(new RegExp(`${this.componentState.show._id}`, 'g'), '');
        localStorage.setItem('favorites', `${favorites.trim()}`);
      }else{
        localStorage.setItem('favorites', `${favorites.trim()} ${this.componentState.show._id}`);
      }
    }
  }

  @action.bound
  _like(){
    like(this.componentState);
  }
  @action.bound
  _dislike(){
    dislike(this.componentState);
  }

  @action
  componentDidMount(){
    const { showId } = this.props.match.params;
    getById(this.componentState, showId)
    getAllEpisodesByShowId(state, showId)
  }

  render(){
    if (!localStorage.getItem('name')) {
      return <Redirect to='/login'/>;
    }
    if (localStorage.getItem('remember')==='false') {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('remember');
      return <Redirect to='/login'/>;
    }
    const image = `https://api.infinum.academy${this.componentState.show.imageUrl}`;
    return (
      <div className={container2}>
        <Header/>
        <div className={contentBox}>
          <div className={backBox}>
            <Link to={`/shows`}>
              <img alt='Go back' src={getImage('goBack')} />
            </Link>
          </div>
          <div className={descBox}>
            <div className={titleRowBox}>
              <p className={showTitle}>{this.componentState.show.title}</p>
              <div className={votesBox}>
                <button className={likeShowBox} onClick={this._like}>
                  <img className={inlineBox} alt='Like' src={getImage(`thumbUp`)} />
                </button>
                <button className={likeShowBox} onClick={this._dislike}>
                  <img className={inlineBox} alt='DisLike' src={getImage(`thumbDown`)} />
                </button>
                <p className={inlineBox}>{this.componentState.show.likesCount}</p>

              </div>
            </div>
            <p>{this.componentState.show.description}</p>
          </div>
          <div className={episodesBox}>
            <p className={episodeBoxTitle}>SEASONS AND EPISODES </p>
            {
              state.episodes.length
                ? state.episodes.map((episode) => <Link to={`/episodes/${episode._id}`} className={episodeLink}><EpisodeComponent episode={episode}/></Link>)
                : 'No episodes'
            }
          </div>
          <div className={imgBox}>
            <div className={topImageBox}>
              <Link className = {plusBox} to={`/shows/${this.componentState.show._id}/episode/new`}>
                <img className={plusImg} alt='New episode' src={getImage('plus')} />
                <div>New episode</div>
              </Link>
              <button className = { localStorage.getItem('favorites') && localStorage.getItem('favorites').search(this.componentState.show._id)!==-1
                                    ? transparentHeartBox
                                    : heartBox
                                  } onClick={this._setFavorite}>
                  <img className={heartImg} alt='Favorite' src={getImage('heart')} />
                  <div>Favorite</div>
              </button>
            </div>
            <div className={imgShowDiv}>
              <img className={showImg} alt={`${this.componentState.show.title}`} src={image} />
              <div>
                <Link to=''>Official Website</Link>
              </div>
              <div>
                <Link to=''>Wikipedia</Link>
              </div>
              <div>
                <Link to=''>IMDB</Link>
                <p>{this.componentState.favorite}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
