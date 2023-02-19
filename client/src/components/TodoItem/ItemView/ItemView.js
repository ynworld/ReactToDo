import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import {
  CheckboxField,
  EditButtons,
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
} from '../..'

import { iconNames } from '../../../constants'

import { TodoListItem } from '../../../stores/TodoListStore'

const ItemView = ({ todo }) => {
  const { id, text, isChecked, toggle } = todo

  return (
    <>
      <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
      <Popover placement="left-start">
        <PopoverTrigger>
          <IconButton iconName={iconNames.ellipsisHorizontal} theme="success" />
        </PopoverTrigger>
        <PopoverContent>
          <EditButtons todo={todo} />
        </PopoverContent>
      </Popover>
    </>
  )
}

ItemView.propTypes = {
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemView)
