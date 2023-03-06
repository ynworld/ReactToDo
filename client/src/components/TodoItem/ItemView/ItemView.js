import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { CheckboxField, Icon, IconButton, Truncate } from '../..'
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
      <div className="flex flex-col gap-2 overflow-hidden">
        <CheckboxField id={id} isChecked={isChecked} onChange={toggle}>
          <Truncate>{text}</Truncate>
        </CheckboxField>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="h-4 w-4">
            <Icon name={iconNames.calendarDays} />
          </div>
          {todo.displayDate}
        </div>
      </div>
      <Popover modal>
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
