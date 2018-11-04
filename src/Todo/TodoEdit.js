import React from 'react';

const TodoEdit = (props) => {
  return (
    <div>
      <h3> Edit Todo </h3>
        <form onSubmit={props.editTodo}>       
          <input type="text" name="text" defaultValue={props.todoToBeEdited.text} onChange={props.handleChange} />
          <input type="text" name="completed" defaultValue={String(props.todoToBeEdited.completed)} onChange={props.handleChange} />
          <input type="submit"/>
        </form>
    </div>
  )
}

export default TodoEdit;
