import { useState, useMemo } from 'react'
import { useFloating, useClick, useDismiss, useRole, useInteractions } from '@floating-ui/react'

const useModal = ({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    onOpenChange: setOpen,
    open,
  })

  const { context } = data

  const click = useClick(context, {
    enabled: controlledOpen == null,
  })
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })
  const role = useRole(context)

  const interactions = useInteractions([click, dismiss, role])

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  )
}

export default useModal
