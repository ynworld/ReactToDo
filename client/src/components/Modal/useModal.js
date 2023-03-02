import { useState, useMemo } from 'react'
import { useFloating, useClick, useDismiss, useRole, useInteractions } from '@floating-ui/react'

const useModal = ({
  initialOpen = false,
  isOpen: isControlledOpen,
  setIsOpen: setIsControlledOpen,
}) => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(initialOpen)

  const isOpen = isControlledOpen ?? isUncontrolledOpen
  const setIsOpen = setIsControlledOpen ?? setIsUncontrolledOpen

  const data = useFloating({
    onOpenChange: setIsOpen,
    open: isOpen,
  })

  const { context } = data

  const click = useClick(context, {
    enabled: isControlledOpen == null,
  })
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })
  const role = useRole(context)

  const interactions = useInteractions([click, dismiss, role])

  return useMemo(
    () => ({
      isOpen,
      setIsOpen,
      ...interactions,
      ...data,
    }),
    [isOpen, setIsOpen, interactions, data],
  )
}

export default useModal
