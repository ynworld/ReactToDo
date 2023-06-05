import { observer } from 'mobx-react'
import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import { Truncate } from '..'

const TextInput = ({
  value,
  onChange,
  className,
  maxLength,
  isInvalid,
  errorText,
  ...inputProps
}) => {
  return (
    <span
      className={classnames(
        className,
        isInvalid
          ? 'border-alert shadow-md shadow-alert/25 focus-within:shadow-alert/25'
          : 'border-primary focus-within:shadow-md focus-within:shadow-primary/25',
        'inline-flex items-center rounded-md border-2 p-1 text-sm',
        'relative transition-all duration-300',
      )}
    >
      <input
        className="flex-1 bg-transparent p-1 outline-none"
        maxLength={maxLength}
        onChange={onChange}
        type="text"
        value={value}
        {...inputProps}
      />
      {maxLength && (
        <div className="px-0.5 text-xs text-gray-500">
          {value.length} / {maxLength}
        </div>
      )}
      {isInvalid && Boolean(errorText) && (
        <div className="absolute -bottom-6 max-w-full text-sm font-medium text-alert">
          <Truncate>{errorText}</Truncate>
        </div>
      )}
    </span>
  )
}

export default observer(TextInput)

TextInput.propTypes = {
  className: PropTypes.string,
  errorText: PropTypes.string,
  isInvalid: PropTypes.bool,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
}
