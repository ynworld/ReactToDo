import { observer } from 'mobx-react'

import './TodoItem.css'
import { CheckboxField, Button } from '../'
import { TrashIcon } from '../icons'

const TodoItem = ({ todo }) => {
  const handleItemDelete = () => todo.delete()

  const { id, text, isChecked, toggle } = todo

  return (
    <article className="todo__list-item">
      <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
      <div className="todo__list-icons">
        <Button className="todo__list-button" onClick={handleItemDelete}>
          <TrashIcon className="todo__list-icon" />
        </Button>
      </div>
    </article>
  )
}

export default observer(TodoItem)
