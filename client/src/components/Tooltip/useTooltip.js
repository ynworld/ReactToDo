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
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift({ padding: 5 }),
    ],
    onOpenChange: setOpen,
    open,
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
    enabled: controlledOpen == null,
    move: false,
  })
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const interactions = useInteractions([hover, focus, dismiss, role])

  return useMemo(
    () => ({
      isMounted,
      open,
      setOpen,
      styles,
      ...interactions,
      ...data,
    }),
    [open, setOpen, isMounted, interactions, data, styles],
  )
}

export default useTooltip
