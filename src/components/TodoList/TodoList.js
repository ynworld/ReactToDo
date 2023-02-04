import { observer } from 'mobx-react'

import { TodoItem } from '../TodoItem'
import './TodoList.css'

import { TrashIcon, EditIcon, CloseIcon, CheckCircleIcon } from '../icons'

const TodoList = ({ todoList }) => {
  let inputValue = ''
  const passInputValue = (text) => {
    inputValue = text
  }

  const { hasItemInEditingMode, items: todos, deleteItem } = todoList

  const canEdit = !hasItemInEditingMode

  const submitEditHandler = (todo) => {
    let text = ''
    if (inputValue === '') text = todo.text
    else text = inputValue
    if (text.trim().length !== 0) todo.editItem(text)
    else todo.editItem('New To Do')
  }

  const cancelEditHandler = (todo) => {
    if (!todo.id) {
      deleteItem(todo)

      return
    }

    todo.setIsEditing(false)
  }

  return (
    <ul className="todo__list">
      {todos.map((todo) => (
        <li key={todo.key} className="list-item">
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
                <span onClick={canEdit ? todo.setIsEditing.bind(null, true) : undefined}>
                  <EditIcon className="edit__icons-icon" />
                </span>
                <span onClick={deleteItem.bind(null, todo)}>
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
