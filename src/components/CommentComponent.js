import React, { Component} from 'react';
import { css } from 'emotion';
import { action } from 'mobx';
import {deleteComment} from '../services/comment';
import getImage from '../imagesImports';

const showLi = css`
  font-size: 20px;
  display: inline-block;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 0;
  width 100%;
`;

const comInfoDiv = css`
  display: inline-block;
  padding-left: 10px;
`;

const usernameBox = css`
  margin: 0;
  color: #FF7590;
  font-size: 15px;
`;

const textBox = css`
  margin-top: 5px;
  margin-bottom: 0;
`;

export class CommentComponent extends Component {

  @action.bound
  _delete(id){
    deleteComment(this.componentState,id);
  }

  render(){
    const {comment} = this.props;
    console.log('com',comment.text, comment._id, comment);
    return (
      <div className = {showLi}>

        <img alt='User icon' src={getImage('user')}/>
        <div className ={comInfoDiv}>
          <p className ={usernameBox}> {comment.userEmail.split('@')[0]}</p>
          <p className ={textBox}>{comment.text}</p>
        </div>
      </div>
    );
  }
}
