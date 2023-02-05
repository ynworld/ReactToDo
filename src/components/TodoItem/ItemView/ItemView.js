import { observer } from 'mobx-react'
import { CheckboxField } from '../..'
import ViewButtons from './ViewButtons'

import './ItemView.css'

const ItemView = ({ todo }) => {
  const handleEditStart = () => {
    if (!todo.canEdit) return

    todo.startEdit()
  }

  const handleItemDelete = () => {
    todo.delete()
  }

  return (
    <article className="view__container">
      <CheckboxField
        id={todo.id}
        label={todo.text}
        onChange={todo.toggle}
        isChecked={todo.isChecked}
      />
      <div className="item__text">{todo.text}</div>
      <ViewButtons handleEditStart={handleEditStart} handleItemDelete={handleItemDelete} />
    </article>
  )
}

export default observer(ItemView)
