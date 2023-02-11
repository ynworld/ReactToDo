import { Icon } from '../../components'
import { iconNames } from '../../constants'
import classnames from 'classnames'

const classesByTheme = {
  alert: 'hover:text-alert focus:text-alert',
  success: 'hover:text-primary-dark focus:text-primary-dark',
}

const IconButton = ({ type = 'button', iconName, onClick, disabled = false, theme }) => {
  const name = iconNames[iconName]

  if (!name) return null

  return (
    <button
      type={type}
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

export default IconButton
