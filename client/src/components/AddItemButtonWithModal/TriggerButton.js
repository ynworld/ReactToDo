import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import { Icon } from '../Icon'
import { iconNames } from '../../constants'

const TriggerButton = ({ disabled, onClick }) => (
  <button
    className={classnames(
      'rounded-full bg-primary p-2 shadow-lg shadow-gray-400',
      'hover:bg-primary-dark active:bg-primary-dark active:shadow-md',
      'disabled:bg-gray-400 disabled:shadow-lg disabled:shadow-gray-400',
      'transition-all duration-300',
    )}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    <Icon className="h-10 w-10 text-white" name={iconNames.plusCircle} />
  </button>
)

TriggerButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default TriggerButton
