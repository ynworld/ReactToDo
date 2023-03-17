import { PropTypes } from 'prop-types'
import classnames from 'classnames'
import { forwardRef } from 'react'

import { Icon } from '../Icon'
import { iconNames, iconVariants } from '../../constants'

const classesByTheme = {
  alert: { notPressed: 'hover:text-alert', pressed: 'text-alert' },
  success: { notPressed: 'hover:text-primary-dark', pressed: 'text-primary-dark' },
}

const IconButton = forwardRef((props, forwardedRef) => {
  const {
    type = 'button',
    iconName,
    iconVariant,
    isPressed,
    onClick,
    disabled = false,
    theme,
    children,
  } = props

  if (!iconName) return null

  return (
    <button
      ref={forwardedRef}
      className={classnames(
        isPressed
          ? `${classesByTheme[theme].pressed} bg-black/[0.03]`
          : `${classesByTheme[theme].notPressed} hover:bg-black/[0.03]`,
        'inline-flex min-h-[2rem] min-w-[2rem] items-center gap-2 rounded-md text-sm text-gray-800',
        'transition-all duration-200 hover:bg-black/[0.03] disabled:pointer-events-none',
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
})

IconButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  iconName: PropTypes.oneOf([...Object.values(iconNames)]).isRequired,
  iconVariant: PropTypes.oneOf([...Object.values(iconVariants)]),
  isPressed: PropTypes.bool,
  onClick: PropTypes.func,
  theme: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
}

export default IconButton
