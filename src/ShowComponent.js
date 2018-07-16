import React, { Component} from 'react';
import {Link}  from 'react-router-dom'

export class ShowComponent extends Component {
  render(){
    const {show} = this.props;
    return (
      <li className = 'show-title'>
        <Link className='show-link' to={`/shows/${show._id}`}>{show.title} </Link>
      </li>
    );
  }
}