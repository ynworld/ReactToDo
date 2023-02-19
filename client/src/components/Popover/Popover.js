import { PropTypes } from 'prop-types'

import {
  useState,
  useMemo,
  useContext,
  createContext,
  forwardRef,
  isValidElement,
  cloneElement,
} from 'react'

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
  useMergeRefs,
  safePolygon,
  FloatingFocusManager,
} from '@floating-ui/react'

export function usePopover({
  initialOpen = false,
  placement = 'bottom',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
  const [labelId, setLabelId] = useState()
  const [descriptionId, setDescriptionId] = useState()

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'end',
      }),
      shift({ padding: 5 }),
    ],
  })

  const { context } = data

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
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId],
  )
}

const PopoverContext = createContext(null)

export const usePopoverContext = () => {
  const context = useContext(PopoverContext)

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />')
  }

  return context
}

export const Popover = ({ children, modal = false, ...restOptions }) => {
  const popover = usePopover({ modal, ...restOptions })
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>
}

export const PopoverTrigger = forwardRef(({ children, asChild = false, ...props }, propRef) => {
  const context = usePopoverContext()
  const childrenRef = children.ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      }),
    )
  }

  return (
    <div
      ref={ref}
      type="button"
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  )
})

export const PopoverContent = forwardRef((props, propRef) => {
  const { context: floatingContext, ...context } = usePopoverContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])

  return (
    context.open && (
      <FloatingFocusManager context={floatingContext} modal={context.modal} initialFocus={-1}>
        <div
          ref={ref}
          style={{
            position: context.strategy,
            top: context.y ?? 0,
            left: context.x ?? 0,
            width: 'max-content',
            ...props.style,
          }}
          {...context.getFloatingProps(props)}
        >
          {props.children}
        </div>
      </FloatingFocusManager>
    )
  )
})

Popover.propTypes = {
  children: PropTypes.node,
  modal: PropTypes.bool,
}

PopoverTrigger.propTypes = {
  children: PropTypes.node,
  asChild: PropTypes.bool,
}

PopoverContent.propTypes = {
  children: PropTypes.node,
  style: PropTypes.string,
}
