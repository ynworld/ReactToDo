import { observer } from 'mobx-react'
import { useState } from 'react'

import { CheckboxField } from '../CheckboxField'
import { CheckCircleIcon, CloseIcon, EditIcon, TrashIcon } from '../icons'

import './TodoItem.css'

const TodoItem = ({ todo, canEdit, deleteItem }) => {
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
      setTodoText(todo.text)
      todo.finishEdit()
    } else {
      deleteItem(todo)
    }
  }

  const handleEditStart = () => {
    if (!canEdit) return

    todo.startEdit()
  }

  const handleItemDelete = () => {
    deleteItem(todo)
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
