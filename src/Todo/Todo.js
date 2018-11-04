import React, { Component } from 'react';
import { Button } from 'reactstrap';
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
      }
    };
  }

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
    console.log('Got to getTodos. this.props.username is: ', this.props.username);
    
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
  
  // identify todo to be edited and set state accordingly, signal to show edit form
  prepForEditTodo = (e) => {
    const editTodo = this.state.todos.find((todo) => todo._id === e.todoId);
    this.setState({
      showEditForm: true,
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
      this.setState({
        showEditForm: false
      })
      this.getTodos(e);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    // build a list of todos
    const todoList = this.state.todos.map((todo, index) => {      
      return (
        <li key={todo._id}>
          <span>Task: {todo.text}</span> {'  '}
          <span>Completed: { String(todo.completed)}</span> {'  '}
          <Button onClick={e => this.prepForEditTodo({todoId: todo._id})}>Edit</Button>
          <Button onClick={e => this.deleteTodo({todoId: todo._id})}>Delete</Button>
        </li>
      )
    })
    return (
      <div>  
        { /* form to add new todos */ }
        <form onSubmit={this.addTodo}>       
          <input type="text" name="todoText" value={this.state.todoText} onChange={this.handleChange} />
          <Button type="Submit" color="primary">Add Todo</Button>
        </form>  
        { /* list of todos */ }
        <ul>
          {todoList}
        </ul>
        { /* display form to edit todo when edit button is clicked  */ }
        {this.state.showEditForm ? <TodoEdit editTodo={this.editTodo} handleChange={this.handleChange} todoToBeEdited={this.state.todoToBeEdited} /> : null}
      </div>
    );
  }
}
