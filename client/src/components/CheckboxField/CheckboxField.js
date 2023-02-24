import { PropTypes } from 'prop-types'
import './CheckboxField.css'

import { Truncate } from '..'

const CheckboxField = ({ label, id, isChecked, onChange }) => {
  return (
    <label
      className="flex cursor-pointer items-center gap-3 overflow-hidden text-sm text-gray-800"
      htmlFor={id}
    >
      <input
        className="invisible absolute"
        defaultChecked={isChecked}
        id={id}
        onChange={onChange}
        type="checkbox"
      />
      <div className="checkbox-custom" />
      <Truncate>{label}</Truncate>
    </label>
  )
}

CheckboxField.propTypes = {
  id: PropTypes.number,
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CheckboxField
