import { observer } from 'mobx-react'
import classnames from 'classnames'

import { useDrag } from 'react-dnd'

import { ItemEdit, ItemView } from '../../components'

const TodoItem = ({ todo }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TODO',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const opacity = isDragging ? 0 : 100

  return (
    <article
      ref={drag}
      className={classnames(
        'flex justify-between items-center gap-3 p-4 rounded-lg min-h-[4rem]',
        'shadow-md bg-gradient-to-br from-white to-gray-50',
        `opacity-${opacity}`,
      )}
    >
      {todo.isEditing ? <ItemEdit todo={todo} /> : <ItemView todo={todo} />}
    </article>
  )
}

export default observer(TodoItem)
