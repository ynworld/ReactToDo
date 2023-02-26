import { PropTypes } from 'prop-types'

import {
  CalendarDaysIcon,
  CheckIcon,
  ChevronUpDownIcon,
  EllipsisHorizontalIcon,
  FireIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { FireIcon as FireIconSolid } from '@heroicons/react/24/solid'

import { iconNames, iconVariants } from '../../constants'

const outlineIconRenderers = {
  [iconNames.calendarDays]: CalendarDaysIcon,
  [iconNames.check]: CheckIcon,
  [iconNames.chevronUpDown]: ChevronUpDownIcon,
  [iconNames.ellipsisHorizontal]: EllipsisHorizontalIcon,
  [iconNames.fire]: FireIcon,
  [iconNames.pencil]: PencilIcon,
  [iconNames.plusCircle]: PlusCircleIcon,
  [iconNames.trash]: TrashIcon,
  [iconNames.xmark]: XMarkIcon,
}

const solidIconRenderers = {
  [iconNames.fire]: FireIconSolid,
}

const iconRenderersByVariant = {
  [iconVariants.outline]: outlineIconRenderers,
  [iconVariants.solid]: solidIconRenderers,
}

const Icon = ({ name, className, variant = iconVariants.outline }) => {
  const variantIconRenderers = iconRenderersByVariant[variant]
  const Renderer = variantIconRenderers[name]

  if (!Renderer) return null

  return <Renderer className={className} />
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOf([...Object.values(iconNames)]).isRequired,
  variant: PropTypes.oneOf([...Object.values(iconVariants)]),
}

export default Icon
