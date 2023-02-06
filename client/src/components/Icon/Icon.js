import {
  TrashIcon as TrashIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
} from '@heroicons/react/24/outline'

import {
  TrashIcon as TrashIconSolid,
  PlusCircleIcon as PlusCircleSolid,
} from '@heroicons/react/24/solid'

const Icon = ({ name, className, variant = 'outline' }) => {
  const icons = {
    TrashIcon: {
      outline: <TrashIconOutline className={className} />,
      solid: <TrashIconSolid className={className} />,
    },
    PlusCircleIcon: {
      outline: <PlusCircleIconOutline className={className} />,
      solid: <PlusCircleSolid className={className} />,
    },
  }
  return icons[name][variant]
}

export default Icon
