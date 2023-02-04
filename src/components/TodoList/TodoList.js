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
    const text = inputValue.trim()
    if (text.length !== 0) todo.editItem(text)
    else todoList.deleteItem(todo.id)
  }

  const cancelEditHandler = (todo) => {
    todoList.deleteItem(todo.id)
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
