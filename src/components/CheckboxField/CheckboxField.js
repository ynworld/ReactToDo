import { observer } from 'mobx-react'

import { useState } from 'react'

import './CheckboxField.css'
import { Button } from '../../components'
import { CheckCircleIcon } from '../icons'

const CheckboxField = ({ id, label, isChecked, onChange }) => {
  return (
    <label htmlFor={id} className="label">
      <input type="checkbox" id={id} className="checkbox" checked={isChecked} onChange={onChange} />
      <span className="checkbox-custom" />
      <span className="checkbox__text">{label}</span>
    </label>
  )
}

export default observer(CheckboxField)
