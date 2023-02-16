import { usePreview } from 'react-dnd-multi-backend'
import classnames from 'classnames'

import { ItemView } from '..'

const DragPreview = () => {
  const preview = usePreview()
  if (!preview.display) {
    return null
  }
  const { item, style, ref, monitor } = preview

  const y = monitor.getClientOffset()?.y ?? 0
  const x = monitor.getItem()?.xOffSet
  const width = `${monitor.getItem()?.width}px`

  const transform = `translate(${x}px, ${y}px)`

  const finalStyle = {
    ...style,
    width: width,
    transform,
    WebkitTransform: transform,
  }

  return (
    <div
      ref={ref}
      style={finalStyle}
      className={classnames(
        `w-[${width}px]`,
        'flex justify-between items-center gap-3 p-4',
        'rounded-lg min-h-[4rem]',
        'shadow-md bg-gradient-to-br from-white to-gray-50',
        'opacity-50',
      )}
    >
      <ItemView todo={{ ...item }} />
    </div>
  )
}

export default DragPreview
