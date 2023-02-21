import { PropTypes } from 'prop-types'
import './CheckboxField.css'
import { Tooltip, TooltipContent, TooltipTrigger } from '../index'

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
    <Tooltip placement="top-start">
      <TooltipTrigger>
        <div className="text-sm text-gray-800">{label}</div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="max-w-[18rem] rounded-sm bg-gray-100 text-sm text-gray-700 shadow-sm">
          {label}
        </div>
      </TooltipContent>
    </Tooltip>
  </label>
)

CheckboxField.propTypes = {
  id: PropTypes.number,
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CheckboxField
