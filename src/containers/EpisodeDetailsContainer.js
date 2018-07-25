import React, { Component } from 'react';
import {EpisodeComponent} from '../components/EpisodeComponent'
import { css } from 'emotion';
import { observer } from 'mobx-react';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import state from '../state';
import {getById, getAllCommentsByEpisodeId} from '../services/episode';
import getImage from '../imagesImports';
import {VoteComponent} from '../components/VoteComponent';
import {Link}  from 'react-router-dom';
import { observable, action } from 'mobx';

const container2 = css`
  display: grid;
  grid-template-columns: 10% 10% 40% 1fr 10%;
  grid-auto-rows: 50px;
  grid-gap: 10px 5px;
  font-family: Arial, Helvetica, sans-serif;
`;

const descBox = css`
  grid-row: 4 / 5;
  grid-column: 3/4;
  background-color: pink;
`;

const commentsBox = css`
  grid-row: 7/10;
  grid-column: 3/4;
  background-color: blue;
`;

const imgBox = css`
  grid-row: 1 / 4;
  grid-column-start: 1;
  grid-column: 2/5;
  background-color: red;
`;

const showTitle = css`
  font-weight: bold;
  font-size: 20px;
  display:inline-block;
  margin: 5px;
`;

const textAreaBox = css`
  border-radius: 10px;
  border: 2px solid #eaeaea;
  background-color: #f8f8f8;
`;

const commentBtn = css`
  background-color: #f7ced5;
  color: white;
`;


const commentsList=css`
  width: 100%;
  padding-bottom: 10px;
border-bottom: 1px solid #A0A0A0;
`;

const writeCommentBox=css`
`;

@observer
export class EpisodeDetailsContainer extends Component {
  @observable
  componentState = {
    comments: [],
    episode: {},
    commentText: ''
  }

  @action.bound
  _comment(event){
    let favorites = localStorage.getItem('favorites');
    if (!favorites){
      localStorage.setItem('favorites', `${state.show._id} `);
    }else{
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
    const { episodeId } = this.props.match.params;
    getById(this.componentState, episodeId)
    getAllCommentsByEpisodeId(this.componentState, episodeId)
  }

  render(){
    return (
      <div>
        <Header/>
        <div className={container2}>
          <div className={imgBox}>
          </div>
          <div className={descBox}>
            <p className={showTitle}>{this.componentState.episode.title}</p>
            <p>{this.componentState.episode.description}</p>
          </div>
          <div className={commentsBox}>
            <div className={writeCommentBox}>
              <textarea className={textAreaBox} rows="4" cols="50" placeholder="Post a comment...">
              </textarea>
              <button className={commentBtn}>COMMENT</button>
            </div>
            <div className={commentsList}>

            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
