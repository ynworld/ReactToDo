import { PropTypes } from 'prop-types'

import {
  PlusCircleIcon,
  TrashIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

import { iconNames, iconVariants } from '../../constants'

const outlineIconRenderers = {
  [iconNames.plusCircle]: PlusCircleIcon,
  [iconNames.trash]: TrashIcon,
  [iconNames.pencil]: PencilIcon,
  [iconNames.xmark]: XMarkIcon,
  [iconNames.check]: CheckIcon,
}

const solidIconRenderers = {}

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
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
}

Icon.defaultProps = {
  className: '',
  variant: 'outline',
}

export default Icon
