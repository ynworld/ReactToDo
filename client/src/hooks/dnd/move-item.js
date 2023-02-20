const moveItem = ({ dragItem, index, itemToMoveRef, monitor, moveCallback }) => {
  if (!itemToMoveRef.current) return
  if (!moveCallback) return

  const dragIndex = dragItem.index
  const hoverIndex = index

  if (dragIndex === hoverIndex) return

  const hoverBoundingRect = itemToMoveRef.current.getBoundingClientRect()
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
  const clientOffset = monitor.getClientOffset()
  const hoverClientY = clientOffset.y - hoverBoundingRect.top

  // Only perform the move when the mouse has crossed half of the item's height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%

  // Dragging downwards
  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
  // Dragging upwards
  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

  moveCallback(dragIndex, hoverIndex)

  // Note: we're mutating the monitor item here!
  // Generally it's better to avoid mutations,
  // but it's good here for the sake of performance
  // to avoid expensive index searches.
  // eslint-disable-next-line no-param-reassign
  dragItem.index = hoverIndex
}

export default moveItem
