import { useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useHover,
  useInteractions,
  FloatingFocusManager,
  safePolygon,
  useTransitionStyles,
} from '@floating-ui/react'

import { IconButton, EditButtons } from '..'
import { iconNames } from '../../constants'

const EditPopover = ({ todo }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'left',
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  })
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 400,
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const hover = useHover(context, {
    handleClose: safePolygon(),
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role, hover])

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()} className="h-8 w-8">
        <IconButton iconName={iconNames.ellipsisHorizontal} theme="success" />
      </div>

      {isMounted && (
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y,
              left: x,
              width: 'max-content',
              ...styles,
            }}
            {...getFloatingProps}
            className="p-2 bg-gray-100 rounded-md shadow-md"
          >
            <EditButtons todo={todo} />
          </div>
        </FloatingFocusManager>
      )}
    </>
  )
}

export default EditPopover
