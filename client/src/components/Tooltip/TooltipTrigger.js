import { PropTypes } from 'prop-types'
import { isValidElement, cloneElement, forwardRef } from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { useTooltipContext } from './Tooltip'

const TooltipTrigger = forwardRef(({ children, asChild = false, ...props }, propRef) => {
  const context = useTooltipContext()
  const childrenRef = children.ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  // `asChild` allows the user to pass any element as the anchor
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
      // The user can style the trigger based on the state
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  )
})

TooltipTrigger.propTypes = {
  asChild: PropTypes.bool,
  children: PropTypes.node,
}

export default TooltipTrigger
