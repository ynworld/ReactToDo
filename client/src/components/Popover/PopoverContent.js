import { PropTypes } from 'prop-types'
import { forwardRef } from 'react'

import { useMergeRefs, FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import { usePopoverContext } from './Popover'

const PopoverContent = forwardRef((props, propRef) => {
  const { context: floatingContext, ...context } = usePopoverContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])

  const { styles } = context

  return (
    context.isOpen && (
      <FloatingPortal id="float">
        <FloatingFocusManager context={floatingContext} initialFocus={-1} modal={false}>
          <div
            ref={ref}
            style={{
              left: context.x ?? 0,
              position: context.strategy,
              top: context.y ?? 0,
              width: 'max-content',
              ...props.style,
              ...styles,
            }}
            {...context.getFloatingProps(props)}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    )
  )
})

export default PopoverContent

PopoverContent.propTypes = {
  children: PropTypes.node,
  style: PropTypes.string,
}
