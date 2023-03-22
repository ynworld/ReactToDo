import { useState } from 'react'
import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import { Truncate } from '..'

const TextInput = ({ value, onChange, ...inputProps }) => {
  const [errorText, setErrorText] = useState(null)

  const error = 'Please enter some text'

  const validateInput = (text) => {
    if (text.trim() === '') {
      setErrorText(error)
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
          errorText
            ? 'border-alert focus:shadow-alert/25'
            : 'border-primary focus:shadow-primary/25',
          'h-8 flex-1 rounded-md border-2 p-2 text-sm',
          'outline-none transition-all duration-300 focus:shadow-md',
        )}
        {...inputProps}
        onChange={handleChange}
        type="text"
        value={value}
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
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
}
