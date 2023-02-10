import { useState } from 'react'
import { observer } from 'mobx-react'

import { IconButton } from '../../../components'

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
      <div className="flex items-center gap-4">
        <IconButton type="submit" icon="check" variation="primary" onClick={handleEditSubmit} />
        <IconButton icon="xmark" variation="secondary" onClick={handleEditCancel} />
      </div>
    </form>
  )
}

export default observer(ItemEdit)
