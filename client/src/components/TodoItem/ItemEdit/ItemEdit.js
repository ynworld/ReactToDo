import { useState } from 'react'
import { observer } from 'mobx-react'

import { iconNames } from '../../../constants'
import { Button, Icon } from '../../../components'

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
        className="min-h-[3.2rem] flex-auto px-2 border-2 border-primary rounded-md text-xl outline-none focus:shadow-lg focus:shadow-primary-tint transition-all ease-in-out"
        placeholder="I need to..."
        autoFocus
        value={inputText}
        onChange={handleTextInput}
      />
      <div className="flex items-center gap-4">
        <Button type="submit" className="group inline-block h-12 w-12" onClick={handleEditSubmit}>
          <Icon
            name={iconNames.check}
            className="text-gray-800 transition-all duration-300 group-hover:text-primary-dark group-hover:stroke-2
            group-focus:text-primary-dark"
          />
        </Button>
        <Button className="group inline-block h-12 w-12" onClick={handleEditCancel}>
          <Icon
            name={iconNames.xmark}
            className="text-gray-800 transition-all duration-300 group-hover:text-secondary group-hover:stroke-2 
            group-focus:text-secondary"
          />
        </Button>
      </div>
    </form>
  )
}

export default observer(ItemEdit)
