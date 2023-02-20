import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { CheckboxField, IconButton } from '../..'
import { Popover, PopoverTrigger, PopoverContent } from '../../Popover'

import { iconNames } from '../../../constants'

import { TodoListItem } from '../../../stores/TodoListStore'

const ItemView = ({ todo }) => {
  const { id, text, isChecked, isImportant, toggle, canEdit } = todo

  const handleEditStart = () => {
    todo.startEdit()
  }

  const handleImportant = () => {
    todo.setIsImportant()
  }

  const variant = isImportant ? 'solid' : ''

  return (
    <>
      <CheckboxField id={id} isChecked={isChecked} label={text} onChange={toggle} />
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
              iconVariant={variant}
              onClick={handleImportant}
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
