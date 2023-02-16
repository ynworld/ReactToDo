import { PropTypes } from 'prop-types'
import './CheckboxField.css'

const CheckboxField = ({ label, id, isChecked, onChange }) => {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        className="absolute invisible"
        defaultChecked={isChecked}
        onChange={onChange}
      />
      <div className="checkbox-custom" />
      <div className="text-sm text-gray-800">{label}</div>
    </label>
  )
}

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CheckboxField
