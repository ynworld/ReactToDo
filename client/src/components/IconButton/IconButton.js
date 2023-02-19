import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { Icon } from '../Icon'
import { iconNames } from '../../constants'

const classesByTheme = {
  alert: 'hover:text-alert focus:text-alert',
  success: 'hover:text-primary-dark focus:text-primary-dark',
}

const IconButton = ({ type, iconName, onClick, disabled, theme }) => {
  const name = iconNames[iconName]

  if (!name) return null

  return (
    <button
      className={classnames(
        classesByTheme[theme],
        'inline-flex w-8 h-8 text-sm text-gray-800 rounded-md items-center justify-center',
        'hover:bg-black/[0.03] disabled:pointer-events-none transition-all duration-300',
        'disabled:text-gray-400',
      )}
      disabled={disabled}
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      <div className="h-6 w-6 flex-none">
        <Icon name={name} />
      </div>
    </button>
  )
}

IconButton.propTypes = {
  disabled: PropTypes.bool,
  iconName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  theme: PropTypes.string,
  type: PropTypes.string,
}

IconButton.defaultProps = {
  disabled: false,
  onClick: null,
  theme: 'success',
  type: 'button',
}

export default IconButton
