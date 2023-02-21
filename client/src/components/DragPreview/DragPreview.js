import { usePreview } from 'react-dnd-multi-backend'
import classnames from 'classnames'

import { Icon } from '..'
import { iconNames } from '../../constants'

const DragPreview = () => {
  const preview = usePreview()

  if (!preview.display) return null

  const { item, style, ref, monitor } = preview

  const itemWidth = item.ref?.current?.clientWidth ?? 0
  const itemOffsetLeft = item.ref?.current?.offsetLeft ?? 0

  const y = monitor.getClientOffset()?.y ?? 0
  const x = itemOffsetLeft
  const width = `${itemWidth}px`

  const transform = `translate(${x}px, ${y}px)`

  const finalStyle = {
    ...style,
    WebkitTransform: transform,
    transform,
    width,
  }

  return (
    <div
      ref={ref}
      className={classnames(
        'flex min-h-[4rem] items-center justify-between gap-3 rounded-lg p-4',
        'bg-gradient-to-br from-white to-gray-50 shadow-md',
      )}
      style={finalStyle}
    >
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 flex-none text-primary">
          <Icon name={iconNames.chevronUpDown} />
        </div>
        <div className="text-sm text-gray-800">{item.data.text}</div>
      </div>
    </div>
  )
}

export default DragPreview
