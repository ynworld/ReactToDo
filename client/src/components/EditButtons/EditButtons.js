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
    <div className="flex flex-col gap-2 p-2 bg-white rounded-md shadow-md">
      <IconButton
        iconName={iconNames.pencil}
        theme="success"
        onClick={handleEditStart}
        disabled={!canEdit}
      >
        <div>Edit</div>
      </IconButton>
      <IconButton iconName={iconNames.trash} theme="alert" onClick={todo.delete}>
        <div>Delete</div>
      </IconButton>
    </div>
  )
}

EditButtons.propTypes = {
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(EditButtons)
