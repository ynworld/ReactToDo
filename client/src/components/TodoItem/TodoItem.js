import { PropTypes } from 'prop-types'
import { useRef } from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'

import { useDrag, useDrop } from 'react-dnd'

import { ItemEdit, ItemView } from '..'

import { TodoListItem } from '../../stores/TodoListStore'

const TodoItem = ({ todo, index }) => {
  const { id, text, isChecked, toggle, canEdit, startEdit } = todo

  const ref = useRef(null)
  const dragRef = useRef(null)

  const xOffSet = ref.current?.offsetLeft
  const width = ref.current?.clientWidth

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

        /** Note: we're mutating the monitor item here!
          Generally it's better to avoid mutations,
          but it's good here for the sake of performance
          to avoid expensive index searches. */

        /* eslint no-param-reassign: "off" */
        item.index = hoverIndex
      },
    },
    [index, xOffSet, width, todo.index],
  )

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      canDrag: !todo.todoListStore.hasItemInEditingMode,
      type: 'TODO',
      item: () => {
        return { id, xOffSet, width, text, isChecked, index, toggle, canEdit, startEdit }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: () => {
        if (index === todo.index) return
        todo.todoListStore.reorderItems()
      },
    }),
    [index, xOffSet, width, todo.index, todo.todoListStore.hasItemInEditingMode],
  )

  const opacity = isDragging ? 'opacity-0' : 'opacity-100'

  drop(preview(ref))
  drag(dragRef)

  return (
    <article
      ref={ref}
      className={classnames(
        'flex min-h-[4rem] items-center justify-between gap-3 rounded-lg p-4',
        'bg-gradient-to-br from-white to-gray-50 shadow-md',
        opacity,
      )}
      data-handler-id={handlerId}
    >
      {todo.isEditing ? <ItemEdit todo={todo} /> : <ItemView todo={todo} ref={dragRef} />}
    </article>
  )
}

TodoItem.propTypes = {
  index: PropTypes.number.isRequired,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(TodoItem)
