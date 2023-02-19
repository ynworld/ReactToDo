import { PropTypes } from 'prop-types'
import { forwardRef, isValidElement, cloneElement } from 'react'

import { useMergeRefs } from '@floating-ui/react'
import { usePopoverContext } from './Popover'

const PopoverTrigger = forwardRef(({ children, asChild = false, ...props }, propRef) => {
  const context = usePopoverContext()
  const childrenRef = children.ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      }),
    )
  }

  return (
    <div
      ref={ref}
      data-state={context.open ? 'open' : 'closed'}
      type="button"
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  )
})

export default PopoverTrigger

PopoverTrigger.propTypes = {
  asChild: PropTypes.bool,
  children: PropTypes.node,
}
