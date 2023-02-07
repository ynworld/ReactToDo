import { useState } from 'react'

import { iconNames } from '../../../constants'
import { Button, Icon, Input, Form } from '../../../components'

import './ItemEdit.css'

const ItemEdit = ({ todo }) => {
  const [inputText, setInputText] = useState(todo.text)

  const handleTextInput = (event) => {
    setInputText(event.target.value)
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()

    const text = inputText.trim()

    if (text.length === 0) return

    todo.setText(text)
    todo.finishEdit()
  }

  const handleEditCancel = () => {
    todo.finishEdit()
  }

  return (
    <Form onSubmit={handleEditSubmit}>
      <Input value={inputText} onChange={handleTextInput} />
      <div className="todo__list-icons">
        <Button type="submit" className="todo__list-button" onClick={handleEditSubmit}>
          <Icon name={iconNames.check} className="todo__list-icon" />
        </Button>
        <Button className="todo__list-button" onClick={handleEditCancel}>
          <Icon name={iconNames.xmark} className="todo__list-icon todo__list-icon--red" />
        </Button>
      </div>
    </Form>
  )
}

export default ItemEdit
