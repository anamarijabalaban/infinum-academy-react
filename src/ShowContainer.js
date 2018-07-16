import React, { Component ,Link} from 'react';
import {ShowComponent} from './ShowComponent'
import styles from './app.css';

export class ShowContainer extends Component {
  constructor (args){
    super(args);

    this.state ={
      shows: []
    }
  }


  componentDidMount(){
    fetch('https://api.infinum.academy/api/shows')
      .then((data) => data.json())
      .then((response) => this.setState({shows: response.data}));
  }

  render(){
    const {show} = this.props
    return (
      <div className='shows-div'>
        <h2 className='align-center'>TV shows</h2>
        <ul className='show-list'>
        {
          this.state.shows.map((show) => <ShowComponent show={show}/>)
        }
        </ul>
      </div>
    );
  }
}
