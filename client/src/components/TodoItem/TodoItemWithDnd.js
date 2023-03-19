import { useRef } from 'react'
import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'

import { dndItemTypes } from '../../constants/dnd'
import useSortable from '../../hooks/dnd/use-sortable'

import TodoItem from './TodoItem'

const TodoItemWithDnd = ({ handleDelete, index, todo }) => {
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
      handleDelete={handleDelete}
      todo={todo}
    />
  )
}

export default observer(TodoItemWithDnd)

TodoItemWithDnd.propTypes = {
  handleDelete: PropTypes.func,
  index: PropTypes.number,
  todo: PropTypes.object,
}
