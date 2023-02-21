import { useRef } from 'react'
import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'

import { dndItemTypes } from '../../constants/dnd'
import useSortable from '../../hooks/dnd/use-sortable'

import TodoItem from './TodoItem'

const TodoItemWithDnd = ({ index, todo }) => {
  const itemToMoveRef = useRef(null)

  const { todoListStore } = todo

  const { drag, isDragging } = useSortable({
    dropCallback: todoListStore.reorderItems,
    index,
    itemToMoveRef,
    moveCallback: todoListStore.moveItem,
    previewData: todo,
    type: dndItemTypes.todo,
  })

  return (
    <TodoItem
      dndProps={{ canDrag: !todoListStore.hasItemInEditingMode, drag, isDragging, itemToMoveRef }}
      todo={todo}
    />
  )
}

export default observer(TodoItemWithDnd)

TodoItemWithDnd.propTypes = {
  index: PropTypes.number,
  todo: PropTypes.object,
}
