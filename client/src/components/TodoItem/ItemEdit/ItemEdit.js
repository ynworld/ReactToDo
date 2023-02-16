import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { iconNames } from '../../../constants'

import { TodoListItem } from '../../../stores/TodoListStore'

import { IconButton } from '../..'

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
      todo.todoListStore.resetItems()
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
          'outline-none focus:shadow-md focus:shadow-primary/25 transition-all duration-300',
        )}
        placeholder="I need to..."
        // autoFocus
        value={inputText}
        onChange={handleTextInput}
      />
      <div className="flex items-center gap-2">
        <IconButton
          type="submit"
          iconName={iconNames.check}
          theme="success"
          onClick={handleEditSubmit}
        />
        <IconButton iconName={iconNames.xmark} theme="alert" onClick={handleEditCancel} />
      </div>
    </form>
  )
}

ItemEdit.propTypes = {
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemEdit)
