import { observer } from 'mobx-react'

import './TodoItem.css'
import { CheckboxField, Button } from '../'
import { Icon } from '../../components'
import { iconNames } from '../../constants'

const TodoItem = ({ todo }) => {
  const { id, text, isChecked, toggle } = todo

  return (
    <article className="todo__list-item">
      <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
      <div className="todo__list-icons">
        <Button className="todo__list-button">
          <PencilIcon className="todo__list-icon" />
        </Button>
        <Button className="todo__list-button" onClick={todo.delete}>
          <Icon name={iconNames.trash} className="todo__list-icon" />
        </Button>
      </div>
    </article>
  )
}

export default observer(TodoItem)
