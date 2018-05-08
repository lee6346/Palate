import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './containers/layouts/Header';
import Home from './containers/pages/Home';
import Public from './containers/pages/Public';
import Authentication from './containers/pages/Authentication';
import RequireAuth from './containers/wrappers/RequireAuth';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/authentication" component={Authentication} />
            <Route exact path="/home" component={RequireAuth(Home)} />
            <Route exact path="/" component={Public} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
