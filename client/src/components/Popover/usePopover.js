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
  useHover,
  useInteractions,
  safePolygon,
  useTransitionStyles,
} from '@floating-ui/react'

const usePopover = ({
  initialOpen = false,
  placement = 'bottom',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
  const [labelId, setLabelId] = useState()
  const [descriptionId, setDescriptionId] = useState()

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'end',
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
  })

  const click = useClick(context, {
    enabled: controlledOpen == null,
  })
  const hover = useHover(context, {
    handleClose: safePolygon(),
  })
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const interactions = useInteractions([click, dismiss, role, hover])

  return useMemo(
    () => ({
      descriptionId,
      isMounted,
      labelId,
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      setDescriptionId,
      setLabelId,
      styles,
    }),
    [open, setOpen, isMounted, interactions, data, modal, labelId, descriptionId, styles],
  )
}

export default usePopover
