import { useState, useMemo } from 'react'
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'

const useModal = ({
  initialOpen = false,
  isClickOutsideEnabled = true,
  isOpen: isControlledOpen,
  setIsOpen: setIsControlledOpen,
}) => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(initialOpen)

  const isOpen = isControlledOpen ?? isUncontrolledOpen
  const setIsOpen = setIsControlledOpen ?? setIsUncontrolledOpen

  const { refs, context } = useFloating({
    onOpenChange: setIsOpen,
    open: isOpen,
  })

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 500,
    initial: {
      opacity: 0,
    },
  })

  const click = useClick(context, {
    enabled: isControlledOpen == null,
  })
  const dismiss = useDismiss(context, {
    outsidePress: isClickOutsideEnabled,
    outsidePressEvent: 'mousedown',
  })
  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  return useMemo(
    () => ({
      context,
      getFloatingProps,
      getReferenceProps,
      isClickOutsideEnabled,
      isMounted,
      refs,
      setIsOpen,
      styles,
    }),
    [
      context,
      getFloatingProps,
      getReferenceProps,
      isClickOutsideEnabled,
      isMounted,
      refs,
      setIsOpen,
      styles,
    ],
  )
}

export default useModal
