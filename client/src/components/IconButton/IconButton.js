import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { Icon } from '..'
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
      type={type === 'submit' ? 'submit' : 'button'}
      className={classnames(
        classesByTheme[theme],
        'inline-flex w-8 h-8 text-sm text-gray-800 rounded-md items-center justify-center',
        'hover:bg-black/[0.03] disabled:pointer-events-none transition-all duration-300',
        'disabled:text-gray-400',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="h-6 w-6 flex-none">
        <Icon name={name} />
      </div>
    </button>
  )
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  theme: PropTypes.string,
}

IconButton.defaultProps = {
  type: 'button',
  onClick: null,
  disabled: false,
  theme: 'success',
}

export default IconButton
