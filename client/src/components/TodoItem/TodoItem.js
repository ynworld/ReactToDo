import { PropTypes } from 'prop-types'
import { useRef } from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'

import { useDrag, useDrop } from 'react-dnd'

import { isMobile } from 'react-device-detect'

import { ItemEdit, ItemView, Icon } from '..'

import { TodoListItem } from '../../stores/TodoListStore'

import { iconNames } from '../../constants'

const TodoItem = ({ todo, index }) => {
  const { id, text, isChecked, toggle, canEdit, startEdit } = todo

  const draggingIsAllowed = !todo.todoListStore.hasItemInEditingMode

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
      canDrag: draggingIsAllowed,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: () => {
        if (index === todo.index) return
        todo.todoListStore.reorderItems()
      },
      item: () => ({ canEdit, id, index, isChecked, startEdit, text, toggle, width, xOffSet }),
      type: 'TODO',
    }),
    [index, xOffSet, width, todo.index, draggingIsAllowed],
  )

  const opacity = isDragging ? '0' : '1'
  const hover = draggingIsAllowed ? 'group-hover:opacity-100' : ''
  const mobile = isMobile ? 'opacity-100' : 'opacity-0'

  drop(preview(ref))
  drag(dragRef)

  return (
    <article
      ref={ref}
      className={classnames(
        'group relative flex min-h-[4rem] flex-auto items-center justify-between gap-3 rounded-lg p-4',
        'bg-gradient-to-br from-white to-gray-50 shadow-md',
      )}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      {todo.isEditing ? <ItemEdit todo={todo} /> : <ItemView todo={todo} />}

      <div
        ref={dragRef}
        className={classnames(
          'absolute top-0 right-0 h-8 w-8 flex-none p-2 text-gray-500 hover:bg-black/[0.03]',
          'rounded-md transition-all duration-300 hover:text-black',
          hover,
          mobile,
        )}
      >
        <Icon name={iconNames.chevronUpDown} />
      </div>
    </article>
  )
}

TodoItem.propTypes = {
  index: PropTypes.number.isRequired,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(TodoItem)
