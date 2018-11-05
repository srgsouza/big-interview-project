import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Container, Navbar, NavbarBrand, Nav } from 'reactstrap';
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
      <Container className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" image-src="/public/images" ></NavbarBrand>
          Todo CRUD Demo - Click on a user button to simulate a login (Program will fetch user's todo items from a database)
            <Nav className="ml-auto" navbar>      
              { /* onClick: set username state, then call getTodos function. allows for 1-click switching of users (mock login) */ }
              <Button color="info" onClick={(e) => this.setState({username:"mario"}, this.callChildGetTodos)}> Mario </Button>
              <Button color="info" onClick={(e) => this.setState({username:"maria"}, this.callChildGetTodos)}> Maria </Button>
            </Nav>
        </Navbar>
        { /* display Todo component only if username is set (mock user is logged in) */}
        {this.state.username !== '' ? <Todo ref={this.child} username={this.state.username}/> : null}
        
      </Container>
    );
  }
}

export default App;
