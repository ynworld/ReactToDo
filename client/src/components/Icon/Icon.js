import { PropTypes } from 'prop-types'

import {
  PlusCircleIcon,
  TrashIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon,
  EllipsisHorizontalIcon,
  FireIcon,
} from '@heroicons/react/24/outline'

import { FireIcon as FireIconSolid } from '@heroicons/react/24/solid'

import { iconNames, iconVariants } from '../../constants'

const outlineIconRenderers = {
  [iconNames.plusCircle]: PlusCircleIcon,
  [iconNames.trash]: TrashIcon,
  [iconNames.pencil]: PencilIcon,
  [iconNames.xmark]: XMarkIcon,
  [iconNames.check]: CheckIcon,
  [iconNames.ellipsisHorizontal]: EllipsisHorizontalIcon,
  [iconNames.fire]: FireIcon,
}

const solidIconRenderers = {
  [iconNames.fire]: FireIconSolid,
}

const iconRenderersByVariant = {
  [iconVariants.outline]: outlineIconRenderers,
  [iconVariants.solid]: solidIconRenderers,
}

const Icon = ({ name, className, variant }) => {
  const variantIconRenderers = iconRenderersByVariant[variant]
  const Renderer = variantIconRenderers[name]

  if (!Renderer) return null

  return <Renderer className={className} />
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
}

Icon.defaultProps = {
  className: '',
  variant: 'outline',
}

export default Icon
