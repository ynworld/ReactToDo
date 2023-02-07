import { useState } from 'react'

import { iconNames } from '../../../constants'
import { Button, Icon } from '../../../components'

import './ItemEdit.css'

const ItemEdit = ({ todo }) => {
  const [inputText, setInputText] = useState(todo.text)

  const handleTextInput = (event) => {
    setInputText(event.target.value)
  }

  const handleEditSubmit = () => {
    if (inputText.trim().length !== 0) {
      todo.setText(inputText)
    } else {
      todo.setText('New To Do')
    }
    
    todo.setIsEditing(false)
  }

  const handleEditCancel = () => {
    todo.setIsEditing(false)
  }

  return (
    <>
      <input
        type="text"
        className="todo__list-input"
        placeholder="I need to..."
        id="input"
        autoFocus
        value={inputText}
        onChange={handleTextInput}
      />
      <div className="todo__list-icons">
        <Button className="todo__list-button" onClick={handleEditSubmit}>
          <Icon name={iconNames.check} className="todo__list-icon" />
        </Button>
        <Button className="todo__list-button" onClick={handleEditCancel}>
          <Icon name={iconNames.xmark} className="todo__list-icon todo__list-icon--red" />
        </Button>
      </div>
    </>
  )
}

export default ItemEdit
