import { cloneElement, forwardRef, isValidElement } from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { PropTypes } from 'prop-types'
import { useModalContext } from './Modal'

const ModalTrigger = forwardRef(({ children, ...props }, forwardedRef) => {
  const { isOpen, getReferenceProps, refs } = useModalContext()
  const ref = useMergeRefs([refs.setReference, forwardedRef, children.ref])

  if (!isValidElement(children)) return null

  return cloneElement(
    children,
    getReferenceProps({
      ref,
      ...props,
      ...children.props,
      'data-state': isOpen ? 'open' : 'closed',
    }),
  )
})

ModalTrigger.propTypes = {
  children: PropTypes.node,
}

export default ModalTrigger
