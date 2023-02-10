import { useState } from 'react'
import { observer } from 'mobx-react'

import { iconNames } from '../../../constants'
import { Icon } from '../../../components'

import classnames from 'classnames'

const ItemEdit = ({ todo }) => {
  const [inputText, setInputText] = useState(todo.text)

  const handleTextInput = (event) => {
    setInputText(event.target.value)
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()

    const text = inputText.trim()

    if (text.length === 0) return

    todo.setText(text)
    todo.finishEdit()
  }

  const handleEditCancel = () => {
    if (!todo.id) {
      todo.delete()
    } else {
      todo.finishEdit()
    }
  }

  return (
    <form className="flex flex-auto gap-4" onSubmit={handleEditSubmit}>
      <input
        type="text"
        className={classnames(
          'flex-auto px-2 border-2 border-primary rounded-md h-8 text-sm',
          'outline-none focus:shadow-md focus:shadow-primary-tint transition-all duration-300',
        )}
        placeholder="I need to..."
        autoFocus
        value={inputText}
        onChange={handleTextInput}
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className={classnames(
            'inline-block h-6 w-6 text-gray-800 hover:text-primary-dark focus:text-primary-dark',
            'transition-all duration-300',
          )}
          onClick={handleEditSubmit}
        >
          <Icon name={iconNames.check} />
        </button>
        <button
          className={classnames(
            'inline-block h-6 w-6 text-gray-800 hover:text-alert focus:text-alert',
            'transition-all duration-300',
          )}
          onClick={handleEditCancel}
        >
          <Icon name={iconNames.xmark} />
        </button>
      </div>
    </form>
  )
}

export default observer(ItemEdit)
