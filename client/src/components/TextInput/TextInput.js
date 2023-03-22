import { useState } from 'react'
import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import { Truncate } from '..'

const emptyFieldErrorText = 'Please enter some text'

const TextInput = ({ value, onChange, className, ...inputProps }) => {
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
    <div className="relative flex flex-col">
      <input
        className={classnames(
          className,
          errorText
            ? 'border-alert shadow-md shadow-alert/25'
            : 'border-primary focus:shadow-md focus:shadow-primary/25',
          'flex-1 rounded-md border-2 p-2 text-sm',
          'outline-none transition-all duration-300',
        )}
        onChange={handleChange}
        type="text"
        value={value}
        {...inputProps}
      />
      {errorText && (
        <div className="absolute -bottom-6 max-w-full text-sm font-medium text-alert">
          <Truncate>{errorText}</Truncate>
        </div>
      )}
    </div>
  )
}

export default TextInput

TextInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
}
