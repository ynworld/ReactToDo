import { observer } from 'mobx-react'

import { useState } from 'react'

import './CheckboxField.css'
import { Button } from '../../components'
import { CheckCircleIcon } from '../icons'

const CheckboxField = ({ todo, deleteItem, passInputValue }) => {
  const { text, id, isChecked, isEditing, editItem, toggle } = todo

  const [inputValue, setInputValue] = useState(text || '')

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value)
    passInputValue(event.target.value)
  }

  return (
    <label htmlFor={id} className="label">
      <input type="checkbox" id={id} className="checkbox" checked={isChecked} onChange={toggle} />
      <span className="checkbox-custom" />
      {isEditing ? (
        <input
          id="input"
          type="text"
          value={inputValue}
          placeholder="New To Do"
          className="input"
          onChange={inputChangeHandler}
        />
      ) : (
        <span className="checkbox__text">{text}</span>
      )}
    </label>
  )
}

export default observer(CheckboxField)
