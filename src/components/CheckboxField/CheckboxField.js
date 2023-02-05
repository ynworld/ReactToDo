import { observer } from 'mobx-react'

import './CheckboxField.css'

const CheckboxField = ({ id, label, onChange, isChecked }) => {
  return (
    <label htmlFor={id} className="label">
      <input type="checkbox" id={id} className="checkbox" checked={isChecked} onChange={onChange} />
      <span className="checkbox-custom" />
      <span className="checkbox__text">{label}</span>
    </label>
  )
}

export default observer(CheckboxField)
