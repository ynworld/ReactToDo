import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { CheckboxField, Icon, Truncate } from '../..'

import { iconNames } from '../../../constants'

import { TodoListItem } from '../../../stores/TodoListStore'
import ActionsDropdown from './ActionsDropdown'

const ItemView = ({ onDelete, openEditModal, todo }) => {
  const { id, text, isChecked, toggle } = todo

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
      <ActionsDropdown onDelete={onDelete} openEditModal={openEditModal} todo={todo} />
    </>
  )
}

ItemView.propTypes = {
  onDelete: PropTypes.func,
  openEditModal: PropTypes.func.isRequired,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemView)
