import { usePreview } from 'react-dnd-multi-backend'
import classnames from 'classnames'

import { ItemView, Icon } from '..'
import { iconNames } from '../../constants'

const DragPreview = () => {
  const preview = usePreview()

  if (!preview.display) return null

  const { item, style, ref, monitor } = preview

  const y = monitor.getClientOffset()?.y ?? 0
  const x = monitor.getItem()?.xOffSet
  const width = `${monitor.getItem()?.width}px`

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
        'bg-gradient-to-br from-white to-gray-50 opacity-50 shadow-md',
      )}
      style={finalStyle}
    >
      <ItemView todo={{ ...item.previewData }} />
      <div
        className={classnames(
          'absolute top-0 right-0 h-8 w-8 flex-none p-2 text-gray-500 hover:bg-black/[0.03]',
          'rounded-md transition-all duration-300 hover:text-black',
        )}
      >
        <Icon name={iconNames.chevronUpDown} />
      </div>
    </div>
  )
}

export default DragPreview
