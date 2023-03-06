import { useState, useMemo } from 'react'

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'

const usePopover = ({
  initialOpen = false,
  isOpen: isControlledOpen,
  placement = 'bottom',
  modal = false,
  setIsOpen: setIsControlledOpen,
}) => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(initialOpen)

  const isOpen = isControlledOpen ?? isUncontrolledOpen
  const setIsOpen = setIsControlledOpen ?? setIsUncontrolledOpen

  const data = useFloating({
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'end',
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
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const interactions = useInteractions([click, dismiss, role])

  return useMemo(
    () => ({
      isMounted,
      isOpen,
      modal,
      setIsOpen,
      ...interactions,
      ...data,
      styles,
    }),
    [data, isOpen, setIsOpen, isMounted, interactions, modal, styles],
  )
}

export default usePopover
