import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { CheckboxField, Icon, Tooltip } from '../..'

import { iconNames } from '../../../constants'

import ActionsDropdown from './ActionsDropdown'

const ItemView = ({ onDelete, openEditModal, todo }) => {
  const { description, id, text, isChecked, toggle } = todo

  return (
    <>
      <div className="flex flex-col gap-2">
        <CheckboxField id={id} isChecked={isChecked} onChange={toggle}>
          <Tooltip content={description !== '' ? description : null} placement="top-start">
            <span>{text}</span>
          </Tooltip>
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
  todo: PropTypes.object.isRequired,
}

export default observer(ItemView)
