import React, { Component} from 'react';
import {Link}  from 'react-router-dom';
import { css } from 'emotion';
import getImage from '../imagesImports';

const showLi = css`
  font-size: 20px;
  padding: 10px;
  display: inline-block;
`;

const showLink = css`
  text-decoration: none;
  display: grid;
`;

const showImg = css`
  width: 200px;
  height: 300px;
`;

export class ShowComponent extends Component {
  render(){
    const {show} = this.props;
    const image =`https://api.infinum.academy${show.imageUrl}`;
    console.log('LOG: ',image, show);
    return (
      <li className = {showLi}>
        <Link className={showLink} to={`/shows/${show._id}`}>
          {
            show.imageUrl === ''
            ? <img className={showImg} alt='Show' src={getImage(`noImage`)} />
            : <img className={showImg}  alt={`${show.title}`} src={image} />
          }

          <p>{show.title}</p>
        </Link>
      </li>
    );
  }
}
