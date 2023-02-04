import { observer } from 'mobx-react'

import { TodoItem } from '../TodoItem'
import './TodoList.css'

import { TrashIcon, EditIcon, CloseIcon, CheckCircleIcon } from '../icons'

const TodoList = ({ todoList }) => {
  let inputValue = ''
  const passInputValue = (text) => {
    inputValue = text
  }

  const submitEditHandler = (todo) => {
    let text = ''
    if (inputValue === '') text = todo.text
    else text = inputValue
    if (text.trim().length !== 0) todo.editItem(text)
    else todo.editItem('New To Do')
  }

  const cancelEditHandler = (todo) => {
    if (todo.isNew) todoList.deleteItem(todo.id)
    else todo.setIsEditing(false)
  }

  const { items: todos, deleteItem } = todoList
  return (
    <ul className="todo__list">
      {todos.map((todo) => (
        <li key={todo.id} className="list-item">
          <TodoItem todo={todo} deleteItem={deleteItem} passInputValue={passInputValue} />
          <div className="edit__icons">
            {todo.isEditing ? (
              <>
                <span onClick={cancelEditHandler.bind(null, todo)}>
                  <CloseIcon className="edit__icons-icon" />
                </span>
                <span onClick={submitEditHandler.bind(null, todo)}>
                  <CheckCircleIcon className="edit__icons-icon" />
                </span>
              </>
            ) : (
              <>
                <span onClick={todo.setIsEditing.bind(null, true)}>
                  <EditIcon className="edit__icons-icon" />
                </span>
                <span onClick={deleteItem.bind(null, todo.id)}>
                  <TrashIcon className="edit__icons-icon" />
                </span>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default observer(TodoList)
