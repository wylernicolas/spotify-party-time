import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NoMatch from './components/NoMatch/NoMatch';

const App = props => {
  return (
    <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
  ) 
}

export default App;
