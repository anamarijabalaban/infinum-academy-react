import React, { Component} from 'react';
import {Link}  from 'react-router-dom';
import { css } from 'emotion';
import getImage from '../imagesImports';
import {like, dislike} from '../services/show';
import { observable, action} from 'mobx';
import { observer } from 'mobx-react';
import state from '../state';

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
@observer
export class VoteComponent extends Component {
  @observable
  componentState = {
    likesCount: 0,
  };

  @action.bound
  _like(show){
    this.componentState.likesCount++;
    console.log(this.componentState);
    like(this.componentState, show._id);
  }

  @action.bound
  _dislike(show){
    this.componentState.likesCount--;
    dislike(this.componentState, show._id);
  }

  @action
  render(){
    console.log('render');
    const {show} = this.props;
    return (
      <div className={votesBox}>
        <button className={likeShowBox} onClick={()=> this._like(show)}>
          <img className={inlineBox} alt='Like' src={getImage(`thumbUp${this.props.black}`)} />
        </button>
        <button className={likeShowBox} onClick={()=> this._dislike(show)}>
          <img className={inlineBox} alt='DisLike' src={getImage(`thumbDown${this.props.black}`)} />
        </button>
        <p className={inlineBox}>{this.componentState.likesCount}</p>
      </div>
    );
  }
}
