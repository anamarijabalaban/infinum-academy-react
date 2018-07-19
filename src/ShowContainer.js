import React, { Component} from 'react';
import {ShowComponent} from './components/ShowComponent'
import { css } from 'emotion';
import {Footer} from './components/Footer'
import {Header} from './components/Header'


const container2 = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 50px;
  grid-gap: 10px 5px;
  grid-template-rows: 50px auto 50px;
`;

const contentBox = css`
  grid-row: 2 / 12;
  grid-column: 1 / 5;
  padding: 0 150px;
  background-color: #F8F8F8;
`;

const titleBox = css`
  padding: 0 20px;
`;

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
    return (
      <div className={container2}>
        <Header/>
        <div className={contentBox}>
          <h3 className={titleBox}>All shows</h3>
          <ul>
          {
            this.state.shows.map((show) => <ShowComponent show={show}/>)
          }
          </ul>
        </div>
        <Footer/>
      </div>
    );
  }
}
