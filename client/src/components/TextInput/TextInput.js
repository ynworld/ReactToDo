import { useState } from 'react'
import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import { Truncate } from '..'

const emptyFieldErrorText = 'Please enter some text'

const TextInput = ({ value, onChange, className, maxLength, ...inputProps }) => {
  const [errorText, setErrorText] = useState(null)

  const validateInput = (text) => {
    if (text.trim() === '') {
      setErrorText(emptyFieldErrorText)
    } else {
      setErrorText(null)
    }
  }

  const handleChange = (event) => {
    onChange(event)
    validateInput(event.target.value)
  }

  return (
    <span
      className={classnames(
        className,
        errorText
          ? 'border-alert shadow-md shadow-alert/25'
          : 'border-primary focus-within:shadow-md',
        'inline-flex items-center rounded-md border-2 p-1 text-sm',
        'relative transition-all duration-300 focus-within:shadow-primary/25',
      )}
    >
      <input
        className="flex-1 bg-transparent p-1 outline-none"
        maxLength={maxLength}
        onChange={handleChange}
        type="text"
        value={value}
        {...inputProps}
      />
      {maxLength && (
        <div className="px-0.5 text-xs text-gray-500">
          {value.length} / {maxLength}
        </div>
      )}
      {errorText && (
        <div className="absolute -bottom-6 max-w-full text-sm font-medium text-alert">
          <Truncate>{errorText}</Truncate>
        </div>
      )}
    </span>
  )
}

export default TextInput

TextInput.propTypes = {
  className: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
}
