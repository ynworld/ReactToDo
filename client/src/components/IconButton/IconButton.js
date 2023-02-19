import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { Icon } from '../Icon'
import { iconNames, iconVariants } from '../../constants'

const classesByTheme = {
  alert: 'group-hover:text-alert group-focus:text-alert',
  success: 'group-hover:text-primary-dark group-focus:text-primary-dark',
}

const IconButton = ({
  type = 'button',
  iconName,
  iconVariant,
  onClick,
  disabled = false,
  theme,
  children,
}) => {
  const name = iconNames[iconName]
  const variant = iconVariants[iconVariant]

  const classesWithChild = classnames(children ? 'px-3 py-1' : 'justify-center')

  if (!name) return null

  return (
    <button
      className={classnames(
        classesByTheme[theme],
        'group inline-flex min-h-[2rem] min-w-[2rem] items-center gap-2 rounded-md text-sm text-gray-800',
        'transition-all duration-300 hover:bg-black/[0.03] disabled:pointer-events-none',
        'disabled:text-gray-400',
        classesWithChild,
      )}
      disabled={disabled}
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      <div
        className={classnames(
          classesByTheme[theme],
          'h-6 w-6 flex-none transition-all duration-300',
        )}
      >
        <Icon name={name} variant={variant} />
      </div>
      {children}
    </button>
  )
}

IconButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  iconName: PropTypes.string.isRequired,
  iconVariant: PropTypes.string,
  onClick: PropTypes.func,
  theme: PropTypes.string,
  type: PropTypes.string,
}

export default IconButton
