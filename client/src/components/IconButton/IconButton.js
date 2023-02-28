import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { Icon } from '../Icon'
import { iconNames, iconVariants } from '../../constants'

const classesByTheme = {
  alert: 'hover:text-alert group-active:text-alert',
  success: 'hover:text-primary-dark group-active:text-primary-dark',
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
  if (!iconName) return null

  return (
    <button
      className={classnames(
        classesByTheme[theme],
        'inline-flex min-h-[2rem] min-w-[2rem] items-center gap-2 rounded-md text-sm text-gray-800',
        'transition-all duration-300 hover:bg-black/[0.03] disabled:pointer-events-none',
        'disabled:text-gray-400',
        children ? 'px-2' : 'justify-center',
      )}
      disabled={disabled}
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      <div className={classnames('h-6 w-6 flex-none transition-all duration-300')}>
        <Icon name={iconNames[iconName]} variant={iconVariants[iconVariant]} />
      </div>
      {children && <span className="text-gray-800">{children}</span>}
    </button>
  )
}

IconButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  iconName: PropTypes.oneOf([...Object.values(iconNames)]).isRequired,
  iconVariant: PropTypes.oneOf([...Object.values(iconVariants)]),
  onClick: PropTypes.func,
  theme: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
}

export default IconButton
