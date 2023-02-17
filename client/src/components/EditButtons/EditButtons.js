import { observer } from 'mobx-react'

import classnames from 'classnames'

import { iconNames } from '../../constants'
import { Icon, IconButton } from '..'

const EditButtons = ({ todo }) => {
  const canEdit = todo.canEdit

  const handleEditStart = () => {
    todo.startEdit()
  }

  return (
    <div className="flex flex-col gap-2 p-2 bg-white rounded-md shadow-md">
      <IconButton
        iconName={iconNames.pencil}
        theme={'success'}
        onClick={handleEditStart}
        disabled={!canEdit}
      >
        <div>Edit</div>
      </IconButton>
      <IconButton iconName={iconNames.trash} theme={'alert'} onClick={todo.delete}>
        <div>Delete</div>
      </IconButton>
    </div>
  )
}

export default observer(EditButtons)
