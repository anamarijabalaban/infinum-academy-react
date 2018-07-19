import React, { Component} from 'react';
import {Link}  from 'react-router-dom';
import { css } from 'emotion';

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
    const imgName = show.title.replace(/ /g,'_');
    return (
      <li className = {showLi}>
        <Link className={showLink} to={`/shows/${show._id}`}>
          <img alt={`${show.title}`} src={require(`../../src/images/${imgName}.jpg`)} />
          {show.title}
        </Link>
      </li>
    );
  }
}
