import { useState } from 'react'
import { observer } from 'mobx-react'

import { Button } from '../../'
import { CloseIcon, CheckCircleIcon } from '../../icons'

import './ItemEdit.css'

const ItemEdit = ({ todo }) => {
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

  return (
    <article className="edit__container">
      <input
        id="input"
        type="text"
        value={todoText}
        placeholder="I have to..."
        className="edit__input"
        onChange={handleTodoTextChange}
      />
      <div className="edit__icons">
        <Button shape="round" className="edit__icon-button" onClick={handleEditCancel}>
          <CloseIcon className="edit__icon" />
        </Button>
        <Button shape="round" className="edit__icon-button" onClick={handleSubmit}>
          <CheckCircleIcon className="edit__icon" />
        </Button>
      </div>
    </article>
  )
}

export default observer(ItemEdit)
