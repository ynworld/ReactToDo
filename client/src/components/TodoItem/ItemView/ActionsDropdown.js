import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Popover, PopoverContent, PopoverTrigger } from '../../Popover'
import { IconButton } from '../../IconButton'
import { iconNames, iconVariants } from '../../../constants'
import { useBoolean } from '../../../hooks'

const ActionsDropdown = ({ todo, onDelete, openEditModal }) => {
  const [isPopoverOpen, { setValue: setIsPopoverOpen, setFalse: closePopover }] = useBoolean(false)

  const handleEditStart = () => {
    openEditModal()
    closePopover()
  }

  const handleDeleteStart = () => {
    onDelete(todo.id)
  }

  return (
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
            iconVariant={todo.isImportant ? iconVariants.solid : undefined}
            isPressed={todo.isImportant}
            onClick={todo.toggleIsImportant}
            theme="alert"
          />
          <IconButton iconName={iconNames.trash} onClick={handleDeleteStart} theme="alert" />
        </div>
      </PopoverContent>
    </Popover>
  )
}

ActionsDropdown.propTypes = {
  onDelete: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
}

export default observer(ActionsDropdown)
