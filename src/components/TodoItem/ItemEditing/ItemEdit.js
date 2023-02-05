import { useState } from 'react'
import { observer } from 'mobx-react'

import EditIcons from './EditIcons'
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
        autoFocus
      />
      <EditIcons handleEditCancel={handleEditCancel} handleSubmit={handleSubmit} />
    </article>
  )
}

export default observer(ItemEdit)
