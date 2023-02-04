import { observer } from 'mobx-react'

import { useState } from 'react'

import './CheckboxField.css'
import { Button } from '../../components'
import { CheckCircleIcon } from '../icons'

const CheckboxField = ({ todo, deleteItem }) => {
  const { text, id, isChecked, isEditing, editItem, toggle } = todo

  const [inputValue, setInputValue] = useState(text || '')

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value)
  }

  const submitEditHandler = (event) => {
    event.preventDefault()
    const text = event.target[0].value.trim()
    if (text.length !== 0) editItem(text)
    else deleteItem(id)
  }

  return (
    <label htmlFor={id} className="label">
      <input type="checkbox" id={id} className="checkbox" checked={isChecked} onChange={toggle} />
      <span className="checkbox-custom" />
      {isEditing ? (
        <form onSubmit={submitEditHandler} className="input__form">
          <input
            id="input"
            type="text"
            value={inputValue}
            placeholder="New To Do"
            className="input"
            onChange={inputChangeHandler}
          />
          <Button type="submit" shape="small-rectangle">
            <CheckCircleIcon className="icon" />
          </Button>
        </form>
      ) : (
        <span className="checkbox__text">{text}</span>
      )}
    </label>
  )
}

export default observer(CheckboxField)
