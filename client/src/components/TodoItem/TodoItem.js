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
            <Button
              className="group inline-block w-12 h-12"
              onClick={handleEditStart}
              disabled={!canEdit}
            >
              <Icon
                name={iconNames.pencil}
                className="text-gray-800 transition-all duration-300
                group-hover:text-primary-dark
                group-hover:stroke-2
                group-focus:text-primary-dark group-disabled:text-gray-400
                group-disabled:cursor-not-allowed group-disabled:stroke-1"
              />
            </Button>
            <Button className="group inline-block w-12 h-12" onClick={todo.delete}>
              <Icon
                name={iconNames.trash}
                className="text-gray-800 transition-all duration-300 group-hover:text-secondary
                group-hover:stroke-2 
                group-focus:text-secondary"
              />
            </Button>
          </div>
        </>
      )}
    </article>
  )
}

export default observer(TodoItem)
