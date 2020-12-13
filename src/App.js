import React, { Component } from 'react';
import Navbar from '../src/components/layout/Navbar';
import UserItem from '../src/components/users/UserItem'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav class="navbar bg-primary">
          <Navbar />
        </nav>
        <UserItem />
      </div> 
    );
  } 
}

export default App;
