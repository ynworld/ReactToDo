import { useRef } from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'

import { useDrag, useDrop } from 'react-dnd'

import { ItemEdit, ItemView } from ".."

const TodoItem = ({ todo, index }) => {
  const { id } = todo

  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop(
    {
      accept: 'TODO',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex === hoverIndex) {
          return
        }

        const hoverBoundingRect = ref.current?.getBoundingClientRect()

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        const clientOffset = monitor.getClientOffset()

        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }

        todo.todoListStore.moveItem(dragIndex, hoverIndex)

        item.index = hoverIndex
      },
    },
    [index, todo.index],
  )

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'TODO',
      item: () => {
        return { id, index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: !todo.todoListStore.hasItemInEditingMode,
      end: () => {
        if (index === todo.index) return
        todo.todoListStore.reorderItems()
      },
    }),
    [index, todo.index, todo.todoListStore.hasItemInEditingMode],
  )

  const opacity = isDragging ? 'opacity-0' : 'opacity-100'

  drag(drop(ref))

  return (
    <article
      ref={ref}
      data-handler-id={handlerId}
      className={classnames(
        'flex justify-between items-center gap-3 p-4 rounded-lg min-h-[4rem]',
        'shadow-md bg-gradient-to-br from-white to-gray-50',
        opacity,
      )}
    >
      {todo.isEditing ? <ItemEdit todo={todo} /> : <ItemView todo={todo} />}
    </article>
  )
}

export default observer(TodoItem)
