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
        'group inline-flex gap-2 min-h-[2rem] min-w-[2rem] justify items-center rounded-md text-sm text-gray-800',
        'transition-all duration-300 hover:bg-black/[0.03] disabled:pointer-events-none',
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
  children: PropTypes.node,
}

export default IconButton
