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
      <CheckboxField todo={todo} />
      <ViewButtons
        canEdit={todo.canEdit}
        handleEditStart={handleEditStart}
        handleItemDelete={handleItemDelete}
      />
    </article>
  )
}

export default observer(ItemView)
