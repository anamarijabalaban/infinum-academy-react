import React from 'react';

import ReactDOM from 'react-dom';
import {Route} from 'react-router'
import {BrowserRouter, Redirect} from 'react-router-dom'
import {ShowContainer} from './containers/ShowContainer';
import {ShowDetailsContainer} from './containers/ShowDetailsContainer';
import {LoginContainer} from './containers/LoginContainer';
import {RegisterContainer} from './containers/RegisterContainer';
import {EpisodeDetailsContainer} from './containers/EpisodeDetailsContainer';
import { configure } from 'mobx';
import {NewEpisodeModal} from './containers/NewEpisodeModal';

configure({ enforceActions: true });
ReactDOM.render((
  <BrowserRouter>
  <div>
    <Route exact path="/" render={() => (
      localStorage.getItem('remember')==='true' ? (
        <Redirect to="/shows"/>
      ) : (
        <Redirect to="/login"/>
      )
    )}/>
    <Route exact path="/shows" component={ShowContainer}/>
    <Route path="/shows/:showId" component={ShowDetailsContainer} />
    <Route path="/shows/:showId/episode/new" component={NewEpisodeModal} />
    <Route path="/episodes/:episodeId" component={EpisodeDetailsContainer} />
    <Route exact path="/login" component={LoginContainer} />
    <Route exact path="/register" component={RegisterContainer} />
    </div>
  </BrowserRouter>
), document.querySelector('.js-app'));
