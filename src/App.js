import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavbarComponent from './Navbar/navbar.js';
import {Button} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      user_id: null,
      todo: '',
      todo_id: '',
      completed: ''
    };
  }
  
  setUser = (e) => {  
    this.setState({
      username: e.username,
      user_id: e.user_id
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  handleSubmit = (e) => {    
    e.preventDefault();
     console.log('handleSubmit is called');
  }

  render() {
    return (
      <div className="App">
        <NavbarComponent username={this.state.username} setUser={this.setUser} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          {this.state.username}
          {' '}
          {this.state.user_id}      
      </div>
    );
  }
}

export default App;
