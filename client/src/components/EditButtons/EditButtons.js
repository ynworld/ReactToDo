import { PropTypes } from 'prop-types'

import { observer } from 'mobx-react'

import { iconNames, iconVariants } from '../../constants'
import { IconButton } from '..'

import { TodoListItem } from '../../stores/TodoListStore'

const EditButtons = ({ todo }) => {
  const { canEdit, isImportant } = todo

  const variant = isImportant ? iconVariants.solid : iconVariants.outline

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
      <IconButton
        iconName={iconNames.fire}
        iconVariant={variant}
        onClick={todo.setImportant}
        theme="alert"
      >
        <div>Important</div>
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
