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
    <>
      <input
        className={classnames(
          className,
          errorText
            ? 'border-alert shadow-md shadow-alert/25'
            : 'border-primary focus:shadow-md focus:shadow-primary/25',
          'flex-1 rounded-md border-2 p-2 text-sm',
          'outline-none transition-all duration-300',
        )}
        maxLength={maxLength}
        onChange={handleChange}
        type="text"
        value={value}
        {...inputProps}
      />
      {maxLength && (
        <div className="absolute right-2 top-1/2 text-xs text-gray-500">
          {value.length} / {maxLength}
        </div>
      )}
      {errorText && (
        <div className="absolute -bottom-6 max-w-full text-sm font-medium text-alert">
          <Truncate>{errorText}</Truncate>
        </div>
      )}
    </>
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
