import { PlusCircleIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { iconNames, iconVariants } from '../../constants'

const outlineIconRenderers = {
  [iconNames.plusCircle]: PlusCircleIcon,
  [iconNames.trash]: TrashIcon,
  [iconNames.pencil]: PencilIcon,
}

const solidIconRenderers = {}

const iconRenderersByVariant = {
  [iconVariants.outline]: outlineIconRenderers,
  [iconVariants.solid]: solidIconRenderers,
}

const Icon = ({ name, className, variant = 'outline' }) => {
  const variantIconRenderers = iconRenderersByVariant[variant]
  const Renderer = variantIconRenderers[name]

  if (!Renderer) return null

  return <Renderer className={className} />
}

export default Icon
