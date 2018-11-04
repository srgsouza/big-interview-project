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

  // using child reference to call getTodo function.
  callChildGetTodos = () => {
    this.child.current.getTodos();
  }

  render() {
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" image-src="/public/images" ></NavbarBrand>
          Todo CRUD Demo - Click on a mock user to login
            <Nav className="ml-auto" navbar>      
              { /* onClick: set username state, then call getTodos function. allows for 1-click switching of users (mock login) */ }
              <Button color="secondary" onClick={(e) => this.setState({username:"mario"}, this.callChildGetTodos)}> Mario </Button>
              <Button color="secondary" onClick={(e) => this.setState({username:"maria"}, this.callChildGetTodos)}> Maria </Button>
            </Nav>
        </Navbar>
        { /* display Todo component only if username is set (mock user is logged in) */}
        {this.state.username !== '' ? <Todo ref={this.child} username={this.state.username}/> : null}
        
      </div>
    );
  }
}

export default App;
