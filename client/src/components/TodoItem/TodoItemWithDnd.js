import { useRef } from 'react'
import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'

import { dndItemTypes } from '../../constants/dnd'
import useSortable from '../../hooks/dnd/use-sortable'

import TodoItem from './TodoItem'

const TodoItemWithDnd = ({ onDelete, index, todo }) => {
  const itemToMoveRef = useRef(null)

  const { todoListStore } = todo
  const canDrag = !todoListStore.hasItemInEditingMode && !todo.isImportant

  const { drag, isDragging } = useSortable({
    canDrag,
    dropCallback: todoListStore.reorderItems,
    index,
    item: { ref: itemToMoveRef, ...todo },
    moveCallback: todoListStore.moveItem,
    type: dndItemTypes.todo,
  })

  return (
    <TodoItem
      dndProps={{ canDrag, drag, isDragging, itemToMoveRef }}
      onDelete={onDelete}
      todo={todo}
    />
  )
}

export default observer(TodoItemWithDnd)

TodoItemWithDnd.propTypes = {
  index: PropTypes.number,
  onDelete: PropTypes.func,
  todo: PropTypes.object,
}
