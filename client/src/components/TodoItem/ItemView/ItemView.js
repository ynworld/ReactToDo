import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { CheckboxField, Icon, IconButton, Truncate } from '../..'
import { Popover, PopoverTrigger, PopoverContent } from '../../Popover'

import { iconNames, iconVariants } from '../../../constants'
import { useBoolean } from '../../../hooks'

import { TodoListItem } from '../../../stores/TodoListStore'

const ItemView = ({ onDelete, openEditModal, todo }) => {
  const [isPopoverOpen, { setValue: setIsPopoverOpen, setFalse: closePopover }] = useBoolean(false)
  const { id, text, isChecked, isImportant, toggle } = todo

  const handleEditStart = () => {
    openEditModal()
    closePopover()
  }

  const handleDeleteStart = () => {
    onDelete(todo.id)
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
      <Popover isOpen={isPopoverOpen} modal setIsOpen={setIsPopoverOpen}>
        <PopoverTrigger>
          <IconButton
            iconName={iconNames.ellipsisHorizontal}
            isPressed={isPopoverOpen}
            theme="success"
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-md">
            <IconButton iconName={iconNames.pencil} onClick={handleEditStart} theme="success" />
            <IconButton
              iconName={iconNames.fire}
              iconVariant={isImportant ? iconVariants.solid : undefined}
              isPressed={isImportant}
              onClick={todo.toggleIsImportant}
              theme="alert"
            />
            <IconButton iconName={iconNames.trash} onClick={handleDeleteStart} theme="alert" />
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

ItemView.propTypes = {
  onDelete: PropTypes.func,
  openEditModal: PropTypes.func.isRequired,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemView)
