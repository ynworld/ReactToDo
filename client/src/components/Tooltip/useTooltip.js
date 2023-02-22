import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'

import { useState, useMemo } from 'react'

const useTooltip = ({
  initialOpen = false,
  placement = 'top',
  isOpen: isControlledOpen,
  setIsOpen: setIsControlledOpen,
}) => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(initialOpen)

  const isOpen = isControlledOpen ?? isUncontrolledOpen
  const setIsOpen = setIsControlledOpen ?? setIsUncontrolledOpen

  const data = useFloating({
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift({ padding: 5 }),
    ],
    onOpenChange: setIsOpen,
    open: isOpen,
    placement,
    whileElementsMounted: autoUpdate,
  })

  const { context } = data

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 500,
    initial: {
      opacity: 0,
    },
  })

  const hover = useHover(context, {
    enabled: isControlledOpen == null,
    move: false,
  })
  const focus = useFocus(context, {
    enabled: isControlledOpen == null,
  })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const interactions = useInteractions([hover, focus, dismiss, role])

  return useMemo(
    () => ({
      isMounted,
      isOpen,
      setIsOpen,
      styles,
      ...interactions,
      ...data,
    }),
    [isOpen, setIsOpen, isMounted, interactions, data, styles],
  )
}

export default useTooltip
