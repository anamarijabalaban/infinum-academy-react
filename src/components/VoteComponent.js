import React, { Component} from 'react';
import {Link}  from 'react-router-dom';
import { css } from 'emotion';
import getImage from '../imagesImports';
import {like, dislike} from '../services/show';
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

export class VoteComponent extends Component {

  render(){
    console.log(this.props);
    const {show} = this.props;
    return (
      <div className={votesBox}>
        <button className={likeShowBox} onClick={()=> like(state, show._id)}>
          <img className={inlineBox} alt='Like' src={getImage(`thumbUp${this.props.black}`)} />
          <p className={inlineBox}>{show.likesCount}</p>
        </button>

        <button className={likeShowBox} onClick={()=> dislike(state, show._id)}>
          <img className={inlineBox} alt='DisLike' src={getImage(`thumbDown${this.props.black}`)} />
          <p className={inlineBox}>{show.likesCount}</p>
        </button>
      </div>
    );
  }
}
