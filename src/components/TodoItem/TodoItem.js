import { observer } from 'mobx-react'
import { useState } from 'react'

import { CheckboxField } from '../CheckboxField'
import { CheckCircleIcon, CloseIcon, EditIcon, TrashIcon } from '../icons'

import './TodoItem.css'

const TodoItem = ({ todo }) => {
  const [todoText, setTodoText] = useState(todo.text || '')

  const handleTodoTextChange = ({ target: { value } }) => {
    setTodoText(value)
  }

  const handleSubmit = () => {
    const isTodoTextEmpty = todoText.trim().length === 0

    if (todo.id) {
      todo.setText(isTodoTextEmpty ? todo.text : todoText)
    } else {
      todo.setText(isTodoTextEmpty ? 'New Todo' : todoText)
      todo.setId(Math.random())
    }

    todo.finishEdit()
  }

  const handleEditCancel = () => {
    if (todo.id) {
      setTodoText(todo.text) // Is it necessary?
      todo.finishEdit()
    } else {
      todo.delete()
    }
  }

  const handleEditStart = () => {
    if (!todo.canEdit) return

    todo.startEdit()
  }

  const handleItemDelete = () => {
    todo.delete()
  }

  return (
    <article className="todo__list-item">
      {todo.isEditing ? (
        <input
          id="input"
          type="text"
          value={todoText}
          placeholder="I have to..."
          className="input"
          onChange={handleTodoTextChange}
        />
      ) : (
        <CheckboxField
          id={todo.id}
          label={todo.text}
          onChange={todo.toggle}
          isChecked={todo.isChecked}
        />
      )}
      <div className="edit__icons">
        {todo.isEditing ? (
          <>
            <span onClick={handleEditCancel}>
              <CloseIcon className="edit__icons-icon" />
            </span>
            <span onClick={handleSubmit}>
              <CheckCircleIcon className="edit__icons-icon" />
            </span>
          </>
        ) : (
          <>
            <span onClick={handleEditStart}>
              <EditIcon className="edit__icons-icon" />
            </span>
            <span onClick={handleItemDelete}>
              <TrashIcon className="edit__icons-icon" />
            </span>
          </>
        )}
      </div>
    </article>
  )
}

export default observer(TodoItem)
