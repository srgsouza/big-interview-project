import React, { Component } from 'react';
import { Button, Form, FormGroup, Modal, ModalHeader, ModalFooter, ModalBody, NavItem, Label, Input } from 'reactstrap';

export default class TodoEdit extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        { /* modal to render the form for editing the todos */ }
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
          <ModalBody>
            <Form inline>       
              <Input type="text" name="text" value={this.props.todoToBeEdited.text} onChange={this.props.handleChange} />
              <Input type="text" name="completed" defaultValue={String(this.props.todoToBeEdited.completed)} onChange={this.props.handleChange} />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={(e) => {this.props.editTodo(e) ; this.toggle()}}>Submit</Button>{' '}
            <Button color="secondary" type="submit" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Button outline color="success" size="sm" onClick={(e) => {this.props.prepForEditTodo({todoId: this.props.todo_id}); this.toggle()}}> Edit </Button>
      </div>
    )
  }
}
