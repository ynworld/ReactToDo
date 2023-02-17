import { iconNames } from '../../constants'

import { IconButton } from '..'

const EditButtons = ({ todo }) => {
  const canEdit = todo.canEdit

  const handleEditStart = () => {
    todo.startEdit()
  }

  return (
    <div className="flex items-center gap-2">
      <IconButton
        iconName={iconNames.pencil}
        theme="success"
        onClick={handleEditStart}
        disabled={!canEdit}
      />
      <IconButton iconName={iconNames.trash} theme="alert" onClick={todo.delete} />
    </div>
  )
}

export default observer(EditButtons)
