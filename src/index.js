import React from 'react';

import ReactDOM from 'react-dom';
import {Route} from 'react-router'
import {BrowserRouter, Redirect} from 'react-router-dom'
import {ShowContainer} from './ShowContainer';
import {ShowDetailsContainer} from './ShowDetailsContainer';
import {LoginContainer} from './LoginContainer';
import {RegisterContainer} from './RegisterContainer';

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
    <Route exact path="/login" component={LoginContainer} />
    <Route exact path="/register" component={RegisterContainer} />
    </div>
  </BrowserRouter>
), document.querySelector('.js-app'));
