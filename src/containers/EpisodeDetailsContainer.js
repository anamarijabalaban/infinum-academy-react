import React, { Component } from 'react';
import { css } from 'emotion';
import { observer } from 'mobx-react';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import state from '../state';
import {getById, getAllCommentsByEpisodeId, comment} from '../services/episode';
import getImage from '../imagesImports';
import {CommentComponent} from '../components/CommentComponent';
import {Link}  from 'react-router-dom';
import {deleteComment} from '../services/comment';
import { observable, action } from 'mobx';

const container2 = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px 5px;
  grid-auto-rows: 50px;
  grid-template-rows: 50px auto 50px;
  font-family: Arial, Helvetica, sans-serif;
`;

const contentBox = css`
  grid-column: 1/5;
  grid-row: 2/12;
  display: grid;
  grid-template-columns: 10% 10% 40% 1fr 10%;
  grid-gap: 10px 5px;
  grid-template-rows: auto;
  font-family: Arial, Helvetica, sans-serif;
`;

const descBox = css`
  grid-row: 10 /12;
  grid-column: 3/4;
`;

const commentsBox = css`
  grid-row: 12/20;
  grid-column: 3/4;
`;

const imgBox = css`
  grid-row: 1 / 10;
  grid-column: 2/5;
  position: relative;
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
  width: 99%;
`;

const commentBtn = css`
  background-color: #f7ced5;
  color: white;
  float: right;
  font-size: 20px;
  border-radius: 5px;

`;


const commentsList=css`
  width: 100%;
  padding-top: 40px;

`;

const goBackLink=css`
  position: absolute;
  top: 0;
  left: 0;
`;


const imgEpisode = css`
  width: 100%;
  height: 550px;
`;

const commentsBoxTitle=css`
  color: #FF7590;
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
    const { episodeId } = this.props.match.params;
    comment(this.componentState,
      JSON.stringify({
        text: this.componentState.commentText,
        episodeId: episodeId
      })
    );
    this.componentState.commentText='';
  }


  @action.bound
  _onCommentChange(event){
    this.componentState.commentText = event.target.value;
  }

  componentDidMount(){
    const { episodeId } = this.props.match.params;
    getById(this.componentState, episodeId)
    getAllCommentsByEpisodeId(this.componentState, episodeId)

  }

  @action.bound
  _delete(id){
    deleteComment(this.componentState,id);
  }

  render(){
    console.log(this.componentState.comments,this.componentState.comments.length, state);
    return (
      <div className={container2}>
        <Header/>
        <div className={contentBox}>
          <div className={imgBox}>
            <img alt='Episode' className={imgEpisode} src={`https://api.infinum.academy${this.componentState.episode.imageUrl}`}/>
            <Link to={`/shows`} className={goBackLink}>
              <img  alt='Go back' src={getImage('goBack')} />
            </Link>
          </div>


          <div className={descBox}>
            <p className={showTitle}>{this.componentState.episode.title}</p>
            <p>{this.componentState.episode.description}</p>
          </div>
          <div className={commentsBox}>
            <p className={commentsBoxTitle}> COMMENTS ({this.componentState.comments.length}) </p>
            <div>
              <textarea className={textAreaBox} rows="8" cols="50" placeholder="Post a comment..." value={this.componentState.commentText} onChange={this._onCommentChange}>
              </textarea>
              <button className={commentBtn} onClick={this._comment}>COMMENT</button>
            </div>
            <div className={commentsList}>
            {
              this.componentState.comments.map((comment) => <div><CommentComponent comment={comment}/><button onClick={()=> this._delete(comment._id)}> DELETE </button></div>)
            }
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
