import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { CheckboxField, Popover, PopoverTrigger, PopoverContent, IconButton } from '../..'

import { iconNames } from '../../../constants'

import { TodoListItem } from '../../../stores/TodoListStore'

const ItemView = ({ todo }) => {
  const { id, text, isChecked, toggle, canEdit } = todo

  const handleEditStart = () => {
    todo.startEdit()
  }

  return (
    <>
      <CheckboxField id={id} isChecked={isChecked} label={text} onChange={toggle} />
      <Popover placement="left-start">
        <PopoverTrigger>
          <IconButton iconName={iconNames.ellipsisHorizontal} theme="success" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex items-center gap-2">
            <IconButton
              disabled={!canEdit}
              iconName={iconNames.pencil}
              onClick={handleEditStart}
              theme="success"
            />
            <IconButton iconName={iconNames.trash} onClick={todo.delete} theme="alert" />
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

ItemView.propTypes = {
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemView)
