import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { useState } from 'react'
<<<<<<< HEAD
import { CheckboxField, Icon, IconButton, Truncate } from '../..'
=======
import { CheckboxField, Icon, IconButton, ItemEditButtonWithModal, Truncate } from '../..'
>>>>>>> 0e7d54f (chore: move item edit to modal)
import { Popover, PopoverTrigger, PopoverContent } from '../../Popover'

import { iconNames, iconVariants } from '../../../constants'

import { TodoListItem } from '../../../stores/TodoListStore'

const ItemView = ({ todo }) => {
<<<<<<< HEAD
  const [isOpen, setIsOpen] = useState(null)
  const { id, text, isChecked, isImportant, toggle, canEdit } = todo
=======
  const [isOpen, setIsOpen] = useState(false)
  const { id, text, isChecked, isImportant, toggle } = todo
>>>>>>> 0e7d54f (chore: move item edit to modal)

  const closePopover = () => {
    setIsOpen(false)
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
            <ItemEditButtonWithModal closePopover={closePopover} todo={todo} />
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
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemView)
