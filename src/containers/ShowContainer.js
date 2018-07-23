import React, { Component} from 'react';
import {ShowComponent} from '../components/ShowComponent'
import { observer } from 'mobx-react';
import { css } from 'emotion';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import state from '../state';
import { getAll as getAllShows,getAllFavorites } from '../services/show';
import { observable } from 'mobx';

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

@observer
export class ShowContainer extends Component {
  @observable
  componentState = {
    favorites: []
  }
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    getAllShows(state);
    if (localStorage.getItem('favorites')){
      getAllFavorites(this.componentState,localStorage.getItem('favorites').trim().split(' ') );
    }

  }

  render(){
    const favoritesStr=localStorage.getItem('favorites');
    const list = favoritesStr ? favoritesStr.trim().split(' '): [];
    return (
      <div className={container2}>
        <Header/>
        <div className={contentBox}>
        {
          favoritesStr ?
            <h3 className={titleBox}>My favorites</h3>
          :''  

        }

          <ul>
          {
              this.componentState.favorites.map((show) => <ShowComponent show={show}/>)
          }
          </ul>
          <h3 className={titleBox}>All shows</h3>
          <ul>
          {
            state.shows.map((show) => <ShowComponent show={show}/>)
          }
          </ul>
        </div>
        <Footer/>
      </div>
    );
  }
}
