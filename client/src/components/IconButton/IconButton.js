import { Icon } from '../../components'
import { iconNames } from '../../constants'
import classnames from 'classnames'

const IconButton = ({ children, type = 'button', icon, onClick, disabled = false, variation }) => {
  const variations = {
    primary: 'hover:text-primary-dark focus:text-primary-dark',
    secondary: 'hover:text-secondary focus:text-secondary',
  }

  return (
    <button
      type={type}
      className={classnames(
        variations[variation],
        'inline-block w-6 h-6 text-sm text-gray-800',
        'transition-all duration-300',
        'disabled:text-gray-400',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icon name={iconNames[icon]} />}
      {children}
    </button>
  )
}

export default IconButton
