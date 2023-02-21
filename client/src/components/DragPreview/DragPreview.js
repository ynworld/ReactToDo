import { usePreview } from 'react-dnd-multi-backend'
import classnames from 'classnames'

import { Icon } from '..'
import { iconNames } from '../../constants'

const DragPreview = () => {
  const preview = usePreview()

  if (!preview.display) return null

  const { item, style, ref, monitor } = preview

  const y = monitor.getClientOffset()?.y ?? 0
  const x = item.xOffSet
  const width = `${item.width}px`

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
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 shrink-0 rounded-md bg-primary" />
        <div className="text-sm text-gray-800">{item.label}</div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={classnames(
            'inline-flex h-8 w-8 items-center justify-center rounded-md text-sm text-gray-800',
          )}
        >
          <div className="h-6 w-6 flex-none">
            <Icon name={iconNames.pencil} />
          </div>
        </div>
        <div
          className={classnames(
            'inline-flex h-8 w-8 items-center justify-center rounded-md text-sm text-gray-800',
          )}
        >
          <div className="h-6 w-6 flex-none">
            <Icon name={iconNames.trash} />
          </div>
        </div>
      </div>
      <div
        className={classnames(
          'absolute top-0 right-0 h-8 w-8 flex-none p-2 text-gray-500',
          'rounded-md transition-all duration-300',
        )}
      >
        <Icon name={iconNames.chevronUpDown} />
      </div>
    </div>
  )
}

export default DragPreview
