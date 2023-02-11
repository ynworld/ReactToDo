import { observer } from 'mobx-react'

import { CheckboxField, ItemEdit, Icon } from '../../components'
import { iconNames } from '../../constants'

import classnames from 'classnames'

const TodoItem = ({ todo }) => {
  const { id, text, isChecked, toggle, isEditing, canEdit } = todo

  const handleEditStart = () => {
    todo.startEdit()
  }

  return (
    <article
      className={classnames(
        'flex justify-between items-center gap-3 p-4 rounded-lg min-h-[4rem]',
        'shadow-md bg-gradient-to-br from-white to-gray-50',
      )}
    >
      {isEditing ? (
        <ItemEdit todo={todo} />
      ) : (
        <>
          <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
          <div className="flex items-center gap-3">
            <button
              className={classnames(
                'inline-block w-6 h-6 text-gray-800 hover:text-primary-dark focus:text-primary-dark',
                'disabled:text-gray-400 transition-colors duration-300',
              )}
              onClick={handleEditStart}
              disabled={!canEdit}
            >
              <Icon name={iconNames.pencil} />
            </button>
            <button
              className={classnames(
                'inline-block w-6 h-6 text-gray-800 hover:text-alert focus:text-alert',
                'transition-colors duration-300',
              )}
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
