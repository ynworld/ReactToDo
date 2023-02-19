import { PropTypes } from 'prop-types'
import './CheckboxField.css'

const CheckboxField = ({ label, id, isChecked, onChange }) => (
  <label className="flex cursor-pointer items-center gap-3" htmlFor={id}>
    <input
      className="invisible absolute"
      defaultChecked={isChecked}
      id={id}
      onChange={onChange}
      type="checkbox"
    />
    <div className="checkbox-custom" />
    <div className="text-sm text-gray-800">{label}</div>
  </label>
)

CheckboxField.propTypes = {
  id: PropTypes.number,
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CheckboxField
