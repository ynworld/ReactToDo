import { PropTypes } from 'prop-types'
import { useState, useRef, useEffect } from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { iconNames } from '../../../constants'

import { TodoListItem } from '../../../stores/TodoListStore'

import { IconButton } from '../..'

const ItemEdit = ({ todo }) => {
  const [inputText, setInputText] = useState(todo.text)

  const ref = useRef(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

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

  const handleKeyUp = (event) => {
    if (event.key === 'Escape') handleEditCancel()
  }

  return (
    <form className="flex flex-auto gap-2" onSubmit={handleEditSubmit}>
      <input
        ref={ref}
        className={classnames(
          'h-8 flex-auto rounded-md border-2 border-primary px-2 text-sm',
          'outline-none transition-all duration-300 focus:shadow-md focus:shadow-primary/25',
        )}
        onChange={handleTextInput}
        onKeyUp={handleKeyUp}
        placeholder="I need to..."
        type="text"
        value={inputText}
      />
      <div className="flex items-center gap-1">
        <IconButton
          iconName={iconNames.check}
          onClick={handleEditSubmit}
          theme="success"
          type="submit"
        />
        <IconButton iconName={iconNames.xmark} onClick={handleEditCancel} theme="alert" />
      </div>
    </form>
  )
}

ItemEdit.propTypes = {
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemEdit)
