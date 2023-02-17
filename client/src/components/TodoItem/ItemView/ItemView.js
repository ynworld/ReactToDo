import { PropTypes } from 'prop-types'
import { CheckboxField, EditButtons } from '../../../components'
import { observer } from 'mobx-react'

import { TodoListItem } from '../../../stores/TodoListStore'

const ItemView = ({ todo }) => {
  const { id, text, isChecked, toggle } = todo

  return (
    <>
      <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
      <EditButtons todo={todo} />
    </>
  )
}

ItemView.propTypes = {
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemView)
