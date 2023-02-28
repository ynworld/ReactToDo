import { PropTypes } from 'prop-types'
import './CheckboxField.css'

const CheckboxField = ({ children, id, isChecked, onChange }) => {
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
      {children}
    </label>
  )
}

CheckboxField.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.number,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CheckboxField
