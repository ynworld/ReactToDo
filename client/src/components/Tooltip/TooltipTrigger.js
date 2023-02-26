import { PropTypes } from 'prop-types'
import { forwardRef } from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { useTooltipContext } from './TooltipProvider'

const TooltipTrigger = forwardRef(({ children, ...props }, propRef) => {
  const context = useTooltipContext()
  const childrenRef = children.ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  return (
    <div ref={ref} {...context.getReferenceProps(props)}>
      {children}
    </div>
  )
})

TooltipTrigger.propTypes = {
  children: PropTypes.node,
}

export default TooltipTrigger
