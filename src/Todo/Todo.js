import React, { Component } from 'react';
import { Button, CardHeader, CardTitle, Container, Col, Form, Input, ListGroup, ListGroupItem, Row} from 'reactstrap';

import TodoEdit from './TodoEdit';

export default class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todoId: '',
      todoText: '',
      todoCompleted: false,
      showEditForm: false, 
      todoToBeEdited: {
        id: '',
        text: '',
        completed: '',
      },
      isOpen: false
    };
    // this.toggle = this.toggle.bind(this);
  }

  // toggle = () => {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   })
  // }

  // handle input changes and set state accordingly
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
      todoToBeEdited: {
        ...this.state.todoToBeEdited,
         [e.currentTarget.name]: e.currentTarget.value,
      } 
    });
  }

  // call the server api to add a todo item
  addTodo = async (e) => {
    e.preventDefault();
    try {
      const newTodo = await fetch('https://big-todo-server.herokuapp.com/api/todos', {
        method: 'POST',
        body: JSON.stringify({
          "text": this.state.todoText
        }),
        headers: {
          'Content-Type': 'application/json',
          // using 'x-auth' mock authentication across this program - for demo purposes only!
          'x-auth': this.props.username
        }
      })
      this.getTodos(e); 
    } catch (error) {
      console.log(error);
    }
  }

  // call the server api to get all todo items (of the logged in user)
  getTodos = async (e) => {
    try {
      const todos = await fetch('https://big-todo-server.herokuapp.com/api/todos', {
        headers: {
          'Content-Type': 'application/json', 
          'x-auth': this.props.username
        }
      });
      const parsedTodos = await todos.json();
      this.setState({
        todos: parsedTodos.data,
        username: this.props.username
      })
    } catch (error) {
      console.log(error);
    }
  }

  // call the server api to delete a todo item (of the logged in user)
  deleteTodo = async (e) => {  
    try {
      const deleteTodo = await fetch('https://big-todo-server.herokuapp.com/api/todos/' + e.todoId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': this.props.username
        }
      })
      this.getTodos(e);
    } catch (error) {
      console.log(error);
    }
  }
  
  // identify todo to be edited and set state accordingly
  prepForEditTodo = (e) => {
    const editTodo = this.state.todos.find((todo) => todo._id === e.todoId);
    this.setState({
      todoToBeEdited: editTodo
    })
  }

  // call the server api to edit a todo item
  editTodo = async (e) => {
    e.preventDefault();
    try {
      const editTodo = await fetch('https://big-todo-server.herokuapp.com/api/todos/' + this.state.todoToBeEdited._id, {
        method: 'PUT',
        body: JSON.stringify(this.state.todoToBeEdited),
        headers: {
          'Content-Type': 'application/json',
          'x-auth': this.props.username
        }
      })
      this.getTodos(e);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    // build a list of todos (not completed)
    const notCompletedTodoList = this.state.todos.map((todo, index) => {      
      return ( todo.completed === false ?
        <ListGroupItem key={todo._id}>
          <CardTitle>{todo.text}</CardTitle>   
          { /* render TodoEdit component - pass functions and variables for the edit operation */}       
          <TodoEdit prepForEditTodo={this.prepForEditTodo} editTodo={this.editTodo} handleChange={this.handleChange} todoToBeEdited={this.state.todoToBeEdited} todo_id={todo._id}/>
          <Button outline color="danger" size="sm" onClick={e => this.deleteTodo({todoId: todo._id})}>Delete</Button>
        </ListGroupItem>
        : null
      )
    })
    // build a list of todos (completed)
    const completedTodoList = this.state.todos.map((todo, index) => {      
      return ( todo.completed === true ?
        <ListGroupItem key={todo._id}>
          <CardTitle>{todo.text}</CardTitle>
          { /* render TodoEdit component - pass functions and variables for the edit operation */ }
          <TodoEdit prepForEditTodo={this.prepForEditTodo} editTodo={this.editTodo} handleChange={this.handleChange} todoToBeEdited={this.state.todoToBeEdited} todo_id={todo._id}/>
          <Button outline color="danger" size="sm" onClick={e => this.deleteTodo({todoId: todo._id})}>Delete</Button>
        </ListGroupItem>
        : null
      )
    })

    return (
      <Container>  
        { /* form to add new todos */ }
        <Row>
          <Col>
            <h3> {this.props.username}'s todo list</h3>
            { /* form for adding todos */ }
            <Form onSubmit={this.addTodo}>       
              <Input type="text" name="todoText" value={this.state.todoText} onChange={this.handleChange} placeholder="Enter a new todo item" />
              <Button type="Submit" color="primary">Add Todo</Button>
            </Form> 
          </Col>
        </Row>
        <br /> 
        <Row>
          <Col> 
            { /* render list of todo items - pending todos */ }
            <ListGroup>
            <CardHeader tag="h4"> Pending Items </CardHeader>
              {notCompletedTodoList}
            </ListGroup>

          </Col>
          <Col>
            { /* render list of todo items - completed todos */ }
            <ListGroup>
            <CardHeader tag="h4"> Completed Items </CardHeader>
              {completedTodoList}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
