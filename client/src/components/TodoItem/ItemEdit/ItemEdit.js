import { useState } from 'react'

import { iconNames } from '../../../constants'
import { Button, Icon } from '../../../components'

import './ItemEdit.css'

const ItemEdit = ({ todo }) => {
  const [inputText, setInputText] = useState(todo.text)

  const handleTextInput = (event) => {
    setInputText(event.target.value)
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()
    if (inputText.trim().length !== 0) {
      todo.setText(inputText)
    } else {
      todo.setText('New To Do')
    }

    todo.update()
    todo.setIsEditing(false)
  }

  const handleEditCancel = () => {
    todo.setIsEditing(false)
  }

  return (
    <form className="todo__list-edit-form" onSubmit={handleEditSubmit}>
      <input
        type="text"
        className="todo__list-input"
        placeholder="I need to..."
        autoFocus
        value={inputText}
        onChange={handleTextInput}
      />
      <div className="todo__list-icons">
        <Button type="submit" className="todo__list-button" onClick={handleEditSubmit}>
          <Icon name={iconNames.check} className="todo__list-icon" />
        </Button>
        <Button className="todo__list-button" onClick={handleEditCancel}>
          <Icon name={iconNames.xmark} className="todo__list-icon todo__list-icon--red" />
        </Button>
      </div>
    </form>
  )
}

export default ItemEdit
