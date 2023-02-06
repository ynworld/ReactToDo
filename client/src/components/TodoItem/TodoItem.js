import { observer } from 'mobx-react'

import './TodoItem.css'
import { CheckboxField, Button } from '../'
import { TrashIcon } from '@heroicons/react/24/outline'

const TodoItem = ({ todo }) => {
  const { id, text, isChecked, toggle } = todo

  return (
    <article className="todo__list-item">
      <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
      <div className="todo__list-icons">
        <Button className="todo__list-button" onClick={todo.delete}>
          <TrashIcon className="todo__list-icon" />
        </Button>
      </div>
    </article>
  )
}

export default observer(TodoItem)
