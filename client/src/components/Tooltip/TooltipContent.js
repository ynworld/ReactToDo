import { PropTypes } from 'prop-types'
import { forwardRef } from 'react'
import { useMergeRefs, FloatingPortal } from '@floating-ui/react'
import { useTooltipContext } from './TooltipProvider'

const TooltipContent = forwardRef((props, propRef) => {
  const context = useTooltipContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])
  const { styles } = props

  return (
    <FloatingPortal id="tooltip">
      {context.isMounted && (
        <div
          ref={ref}
          style={{
            left: context.x ?? 0,
            position: context.strategy,
            styles,
            ...context.styles,
            top: context.y ?? 0,
            visibility: context.x == null ? 'hidden' : 'visible',
          }}
          {...context.getFloatingProps(props)}
        />
      )}
    </FloatingPortal>
  )
})

TooltipContent.propTypes = {
  styles: PropTypes.object,
}

export default TooltipContent
