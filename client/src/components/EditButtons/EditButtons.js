import { observer } from 'mobx-react'

import classnames from 'classnames'

import { iconNames } from '../../constants'
import { Icon } from '..'

const EditButtons = ({ todo }) => {
  const canEdit = todo.canEdit

  const handleEditStart = () => {
    todo.startEdit()
  }

  const btnClass = classnames(
    'group flex items-center gap-2 p-2 h-8 rounded-md text-sm',
    'hover:bg-gray-100 focus:bg-gray-100 outline-none focus:outline-none',
    'transition-all duration-300',
  )

  return (
    <div className="flex flex-col min-w-min gap-2 p-2 bg-white rounded-md shadow-md">
      <button type="button" className={btnClass} onClick={handleEditStart} disabled={!canEdit}>
        <div className="flex w-6 h-6 group-hover:text-primary group-focus:text-primary transition-all duration-300">
          <Icon name={iconNames.pencil} />
        </div>
        <span>Edit</span>
      </button>
      <button type="button" className={btnClass} onClick={todo.delete}>
        <div
          className={classnames(
            'flex w-6 h-6 group-hover:text-alert group-focus:text-alert transition-all duration-300',
          )}
        >
          <Icon name={iconNames.trash} />
        </div>
        <span>Delete</span>
      </button>
    </div>
  )
}

export default observer(EditButtons)
