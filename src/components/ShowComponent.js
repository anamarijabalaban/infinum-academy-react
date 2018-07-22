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

export class ShowComponent extends Component {
  render(){
    const {show} = this.props;
    const image = getImage(show.title);
    return (
      <li className = {showLi}>
        <Link className={showLink} to={`/shows/${show._id}`}>
          <img alt={`${show.title}`} src={image} />
          <p>{show.title}</p>
        </Link>
      </li>
    );
  }
}
