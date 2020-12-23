import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from '../src/components/layout/Navbar';
import Users from '../src/components/users/Users';
import Search from '../src/components/users/Search';
import Alert from '../src/components/layout/Alert';
import About from '../src/components/pages/about';
import User from '../src/components/users/User';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   this.setState({ loading: true })

  //   const res = await axios
  //     .get(`https://api.github.com/users?
  //       client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  //       client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
  //     this.setState({ users: res.data, loading: false })
  // }

  searchUsers = async text => {
    this.setState({ loading: true })

    const res = await axios
      .get(`https://api.github.com/search/users?q=${text}&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({ users: res.data.items, loading: false })
  }

  getUser = async (username) => {
    this.setState({ loading: true })

    const res = await axios
      .get(`https://api.github.com/users/${username}?
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
      this.setState({ user: res.data, loading: false })
  }

  getUserRepos = async (username) => {
    this.setState({ loading: true })

    const res = await axios
      .get(`https://api.github.com/users/${username}/repos?per_page5&sort=created:asc&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
      this.setState({ repos: res.data, loading: false })
  }

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type}});

    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  render() {
    const { users, user, loading, repos } = this.state;

    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route 
                exact 
                path='/' 
                render={props => (
                <Fragment> 
                  <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
                )}
              /> 
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User { ... props } getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading} />
              )} />
           </Switch> 
          </div>  
        </div> 
      </Router>
    );
  } 
}

export default App;
