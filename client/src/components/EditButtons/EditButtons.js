import { PropTypes } from 'prop-types'

import { observer } from 'mobx-react'

import { iconNames } from '../../constants'
import { IconButton } from '..'

import { TodoListItem } from '../../stores/TodoListStore'

const EditButtons = ({ todo }) => {
  const { canEdit } = todo

  const handleEditStart = () => {
    todo.startEdit()
  }

  return (
    <div className="flex flex-col gap-2 rounded-md bg-white p-2 shadow-md">
      <IconButton
        disabled={!canEdit}
        iconName={iconNames.pencil}
        onClick={handleEditStart}
        theme="success"
      >
        <div>Edit</div>
      </IconButton>
      <IconButton iconName={iconNames.trash} onClick={todo.delete} theme="alert">
        <div>Delete</div>
      </IconButton>
    </div>
  )
}

EditButtons.propTypes = {
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(EditButtons)
