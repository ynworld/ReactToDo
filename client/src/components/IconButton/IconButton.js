import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { Icon } from '../Icon'
import { iconNames, iconVariants } from '../../constants'

const classesByTheme = {
  alert: 'hover:text-alert focus:text-alert',
  success: 'hover:text-primary-dark focus:text-primary-dark',
}

const IconButton = ({ type, iconName, iconVariant, onClick, disabled = false, theme }) => {
  const name = iconNames[iconName]
  const variant = iconVariants[iconVariant]

  if (!name) return null

  return (
    <button
      className={classnames(
        classesByTheme[theme],
        'group inline-flex min-h-[2rem] min-w-[2rem] items-center justify-center gap-2 rounded-md text-sm text-gray-800',
        'transition-all duration-300 hover:bg-black/[0.03] disabled:pointer-events-none',
        'disabled:text-gray-400',
      )}
      disabled={disabled}
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      <div className="h-6 w-6 flex-none">
        <Icon name={name} variant={variant} />
      </div>
    </button>
  )
}

IconButton.propTypes = {
  disabled: PropTypes.bool,
  iconName: PropTypes.string.isRequired,
  iconVariant: PropTypes.string,
  onClick: PropTypes.func,
  theme: PropTypes.string,
  type: PropTypes.string,
}

export default IconButton
