import { observer } from 'mobx-react'

import { CheckboxField } from '../CheckboxField'
import { CheckCircleIcon, CloseIcon, EditIcon, TrashIcon } from '../icons'

import './TodoItem.css'

const TodoItem = ({ todo, canEdit, deleteItem }) => {
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
    if (!todo.id) {
      deleteItem(todo)

      return
    }

    todo.setIsEditing(false)
  }

  return (
    <article className="todo__list-item">
      <CheckboxField todo={todo} deleteItem={deleteItem} passInputValue={passInputValue} />
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
    </article>
  )
}

export default observer(TodoItem)
