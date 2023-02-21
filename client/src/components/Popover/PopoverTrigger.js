import { PropTypes } from 'prop-types'
import { forwardRef } from 'react'

import { useMergeRefs } from '@floating-ui/react'
import { usePopoverContext } from './Popover'

const PopoverTrigger = forwardRef(({ children, ...props }, propRef) => {
  const context = usePopoverContext()
  const childrenRef = children.ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  return (
    <div
      ref={ref}
      data-state={context.isOpen ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  )
})

export default PopoverTrigger

PopoverTrigger.propTypes = {
  children: PropTypes.node,
}
