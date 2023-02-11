import { observer } from 'mobx-react'
import classnames from 'classnames'

import { ItemEdit, ItemView } from '../../components'

const TodoItem = ({ todo }) => {
  return (
    <article
      className={classnames(
        'flex justify-between items-center gap-3 p-4 rounded-lg min-h-[4rem]',
        'shadow-md bg-gradient-to-br from-white to-gray-50',
      )}
    >
      {todo.isEditing ? <ItemEdit todo={todo} /> : <ItemView todo={todo} />}
    </article>
  )
}

export default observer(TodoItem)
