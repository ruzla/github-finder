import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from '../src/components/layout/Navbar';
import Alert from '../src/components/layout/Alert';
import About from '../src/components/pages/about';
import User from '../src/components/users/User';
import Home from '../src/components/pages/home';
import NotFound from '../src/components/pages/NotFound';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div>
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} /> 
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User} />
                <Route component={NotFound} />
              </Switch> 
            </div>  
          </div> 
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
