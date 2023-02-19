import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { Icon } from '../Icon'
import { iconNames } from '../../constants'

const classesByTheme = {
  alert: 'group-hover:text-alert group-focus:text-alert',
  success: 'group-hover:text-primary-dark group-focus:text-primary-dark',
}

const IconButton = ({ type = 'button', iconName, onClick, disabled = false, theme, children }) => {
  const name = iconNames[iconName]

  const classesWithChild = classnames(children ? 'px-3 py-1' : 'justify-center')

  if (!name) return null

  return (
    <button
      className={classnames(
        classesByTheme[theme],
        'group inline-flex gap-2 min-h-[2rem] min-w-[2rem] items-center rounded-md text-sm text-gray-800',
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
        <Icon name={name} />
      </div>
      {children}
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
