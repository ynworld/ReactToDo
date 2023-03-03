import { PropTypes } from 'prop-types'
import { forwardRef } from 'react'
import {
  useMergeRefs,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from '@floating-ui/react'

import { useModalContext } from './Modal'

const ModalContent = forwardRef((props, propRef) => {
  const { context: floatingContext, ...context } = useModalContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])

  return (
    <FloatingPortal>
      {context.isOpen && (
        <FloatingOverlay className=" bg-black/80" lockScroll>
          <FloatingFocusManager context={floatingContext}>
            <div ref={ref} {...context.getFloatingProps(props)}>
              {props.children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  )
})

ModalContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ModalContent
