import { observer } from 'mobx-react'

import { CheckboxField, Button, ItemEdit, Icon } from '../../components'
import { iconNames } from '../../constants'

const TodoItem = ({ todo }) => {
  const { id, text, isChecked, toggle, isEditing, canEdit } = todo

  const handleEditStart = () => {
    todo.startEdit()
  }

  return (
    <article className="flex justify-between items-center gap-2 p-6 border-2 border-gray-50 rounded-lg shadow-md bg-gradient-to-br from-white to-gray-50">
      {isEditing ? (
        <ItemEdit todo={todo} />
      ) : (
        <>
          <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
          <div className="flex items-center gap-4">
            <button
              className="group inline-block w-12 h-12 text-gray-800 transition-all duration-300
              hover:text-primary-dark 
              focus:text-primary-dark
              disabled:text-gray-400"
              onClick={handleEditStart}
              disabled={!canEdit}
            >
              <Icon name={iconNames.pencil} />
            </button>
            <button
              className="group inline-block w-12 h-12 text-gray-800 transition-all duration-300 hover:text-secondary 
              focus:text-secondary"
              onClick={todo.delete}
            >
              <Icon name={iconNames.trash} />
            </button>
          </div>
        </>
      )}
    </article>
  )
}

export default observer(TodoItem)
