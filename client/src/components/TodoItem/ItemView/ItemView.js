import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { CheckboxField, IconButton } from '../..'
import { Popover, PopoverTrigger, PopoverContent } from '../../Popover'

import { iconNames, iconVariants } from '../../../constants'

import { TodoListItem } from '../../../stores/TodoListStore'

const ItemView = ({ todo }) => {
  const { id, text, isChecked, isImportant, toggle, canEdit } = todo

  const handleEditStart = () => {
    todo.startEdit()
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <CheckboxField id={id} isChecked={isChecked} label={text} onChange={toggle} />
        <div className="text-xs text-gray-400">{`Created on: ${todo.displayDate}`}</div>
      </div>
      <Popover>
        <PopoverTrigger>
          <IconButton iconName={iconNames.ellipsisHorizontal} theme="success" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-md">
            <IconButton
              disabled={!canEdit}
              iconName={iconNames.pencil}
              onClick={handleEditStart}
              theme="success"
            />
            <IconButton
              iconName={iconNames.fire}
              iconVariant={isImportant ? iconVariants.solid : undefined}
              onClick={todo.toggleIsImportant}
              theme="alert"
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
