import { useState } from 'react'
import classnames from 'classnames'
import { PropTypes } from 'mobx-react'

const TextInput = ({ inputText, setInputText, placeholder }) => {
  const [errorText, setErrorText] = useState(null)

  const validateInput = (text) => {
    if (text.trim() === '') {
      setErrorText('Enter some text')
    } else {
      setErrorText(null)
    }
  }

  const handleTextInputChange = (event) => {
    setInputText(event.target.value)
    validateInput(event.target.value)
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        className={classnames(
          errorText
            ? 'border-alert focus:shadow-alert/25'
            : 'border-primary focus:shadow-primary/25',
          'h-8 grow rounded-md border-2 px-2 text-sm',
          'outline-none transition-all duration-300 focus:shadow-md',
        )}
        onChange={handleTextInputChange}
        placeholder={placeholder}
        type="text"
        value={inputText}
      />
      <p className="min-h-[1rem] text-sm font-medium leading-4 text-alert">
        {errorText && errorText}
      </p>
    </div>
  )
}

export default TextInput

TextInput.propTypes = {
  inputText: PropTypes.string,
  placeholder: PropTypes.string,
  setInputText: PropTypes.func,
}
