import { useDrag, useDrop } from 'react-dnd'
import _noop from 'lodash/noop'

import { dndItemTypes } from '../../constants/dnd'

import moveItem from './move-item'

const useSortable = ({ dropCallback = _noop, index, itemToMoveRef, moveCallback, type } = {}) => {
  const [{ isDragging }, drag, preview] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop()

      if (!didDrop) {
        moveCallback(item.index, item.originalIndex)
      }
    },
    item: () => ({ index, originalIndex: index }),
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

  drop(preview(itemToMoveRef))

  return { drag, isDragging }
}

export default useSortable
