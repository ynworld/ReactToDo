import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { CheckboxField, IconButton } from '../..'
import { iconNames } from '../../../constants'

import { TodoListItem } from '../../../stores/TodoListStore'

const ItemView = ({ todo }) => {
  const { id, text, isChecked, toggle, canEdit } = todo

  const handleEditStart = () => {
    todo.startEdit()
  }

  return (
    <>
      <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
      <div className="flex items-center gap-2">
        <IconButton
          iconName={iconNames.pencil}
          theme="success"
          onClick={handleEditStart}
          disabled={!canEdit}
        />
        <IconButton iconName={iconNames.trash} theme="alert" onClick={todo.delete} />
      </div>
    </>
  )
}

ItemView.propTypes = {
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemView)
