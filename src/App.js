import React, { Component } from 'react';
import Navbar from '../src/components/layout/Navbar';
import Users from '../src/components/users/Users'
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    user: [],
    loading: false
  }

  async componentDidMount() {
    this.setState({ loading: true })

    const res = await axios
      .get('https://api.github.com/users');

      this.setState({ users: res.data, loading: false })
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>  
      </div> 
    );
  } 
}

export default App;
