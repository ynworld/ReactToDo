import { useDrag, useDrop } from 'react-dnd'
import _noop from 'lodash/noop'

import { getEmptyImage } from 'react-dnd-html5-backend'

import { dndItemTypes } from '../../constants/dnd'

import moveItem from './move-item'

const useSortable = ({
  canDrag,
  dropCallback = _noop,
  index,
  item: itemToMove,
  moveCallback,
  type,
} = {}) => {
  const { ref: itemToMoveRef, ...itemData } = itemToMove

  const [{ isDragging }, drag, preview] = useDrag({
    canDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop()

      if (!didDrop) {
        moveCallback(item.index, item.originalIndex)
      }
    },
    item: () => ({ data: itemData, index, originalIndex: index, ref: itemToMoveRef }),
    previewOptions: true,
    type: dndItemTypes[type],
  })

  const [, drop] = useDrop({
    accept: dndItemTypes[type],
    drop(item) {
      if (item.index === item.originalIndex) return

      dropCallback()
    },
    hover(dragItem, monitor) {
      moveItem({
        dragItem,
        index,
        itemToMoveRef,
        monitor,
        moveCallback,
      })
    },
  })

  drop(itemToMoveRef)

  preview(getEmptyImage())

  return { drag, isDragging }
}

export default useSortable
