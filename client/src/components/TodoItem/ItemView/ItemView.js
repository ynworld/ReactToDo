import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { CheckboxField, Icon, IconButton, Truncate } from '../..'
import { Popover, PopoverTrigger, PopoverContent } from '../../Popover'

import { iconNames, iconVariants } from '../../../constants'

import { TodoListItem } from '../../../stores/TodoListStore'

const ItemView = ({ openEditModal, todo }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { id, text, isChecked, isImportant, toggle } = todo

  const startEdit = () => {
    openEditModal() // Open Edit Modal
    setIsOpen(false) // Close Popover
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
      <Popover isOpen={isOpen} modal setIsOpen={setIsOpen}>
        <PopoverTrigger>
          <IconButton iconName={iconNames.ellipsisHorizontal} isPressed={isOpen} theme="success" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-md">
            <IconButton
              disabled={!todo.canEdit}
              iconName={iconNames.pencil}
              onClick={startEdit}
              theme="success"
            />
            <IconButton
              iconName={iconNames.fire}
              iconVariant={isImportant ? iconVariants.solid : undefined}
              isPressed={isImportant}
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
  openEditModal: PropTypes.func.isRequired,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemView)
