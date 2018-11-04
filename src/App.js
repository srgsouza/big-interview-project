import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Navbar, NavbarBrand, Nav } from 'reactstrap';
import Todo from './Todo/Todo'

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      // using mock authentication throughout program - for demo purposes only
      username: '',
    };
    this.child = React.createRef(); 
  }
  // resing child reference to call getTodo function.
  callChildGetTodos = (e) => {
    this.child.current.getTodos();
  }

  // ensure setState is complete prior to calling child function
  componentDidUpdate() {
    this.callChildGetTodos();
  }

  render() {
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" image-src="/public/images" ></NavbarBrand>
            <Nav className="ml-auto" navbar>      
              { /* onClick: setState of user, then call getTodos function. allows for 1-click switching of users (mock login) */ }
              <Button color="secondary" onClick={(e) => {this.setState({username:"mario"}); this.callChildGetTodos()}}> Mario </Button>
              <Button color="secondary" onClick={(e) => {this.setState({username:"maria"}); this.callChildGetTodos()}}> Maria </Button>
            </Nav>
        </Navbar>
        <Todo ref={this.child} username={this.state.username}/>
      </div>
    );
  }
}

export default App;
