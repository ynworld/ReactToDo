import { PropTypes } from 'prop-types'

import { CheckboxField, IconButton } from '../../../components'
import { iconNames } from '../../../constants'
import { observer } from 'mobx-react'

import { TodoListItem } from '../../../stores/TodoListStore'

const ItemView = ({ todo }, ref) => {
  const { id, text, isChecked, toggle, canEdit } = todo

  const handleEditStart = () => {
    todo.startEdit()
  }

  return (
    <>
      <CheckboxField id={id} isChecked={isChecked} label={text} onChange={toggle} />
      <div className="flex items-center gap-2">
        <IconButton
          disabled={!canEdit}
          iconName={iconNames.pencil}
          onClick={handleEditStart}
          theme="success"
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
