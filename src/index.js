import React from 'react';

import ReactDOM from 'react-dom';
import {Route} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import {ShowContainer} from './ShowContainer';
import {ShowDetailsContainer} from './ShowDetailsContainer';

ReactDOM.render((
  <BrowserRouter>
  <div>
    <Route exact path="/shows" component={ShowContainer}/>
    <Route path="/shows/:showId" component={ShowDetailsContainer} />
    </div>
  </BrowserRouter>
), document.querySelector('.js-app'));
