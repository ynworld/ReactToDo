import { useState } from 'react'
import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import { Truncate } from '..'

const TextInput = ({ error, value, setValue, placeholder }) => {
  const [errorText, setErrorText] = useState(null)

  const validateInput = (text) => {
    if (text.trim() === '') {
      setErrorText(error)
    } else {
      setErrorText(null)
    }
  }

  const handleTextInputChange = (event) => {
    setValue(event.target.value)
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
        onChange={handleTextInputChange}
        placeholder={placeholder}
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
  error: PropTypes.string,
  placeholder: PropTypes.string,
  setValue: PropTypes.func,
  value: PropTypes.string,
}
