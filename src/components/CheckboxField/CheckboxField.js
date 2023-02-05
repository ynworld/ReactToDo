import { observer } from 'mobx-react'

import { useState } from 'react'

import './CheckboxField.css'
import { Button } from '../../components'
import { CheckCircleIcon } from '../icons'

const CheckboxField = ({ todo: { id, text, isChecked, toggle } }) => {
  return (
    <label htmlFor={id} className="label">
      <input type="checkbox" id={id} className="checkbox" checked={isChecked} onChange={toggle} />
      <span className="checkbox-custom" />
      <span className="checkbox__text">{text}</span>
    </label>
  )
}

export default observer(CheckboxField)
