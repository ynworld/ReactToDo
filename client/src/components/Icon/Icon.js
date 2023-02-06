import * as IconsOutline from '@heroicons/react/24/outline'
import * as IconsSolid from '@heroicons/react/24/solid'

const iconNames = ['PlusCircleIcon', 'TrashIcon']

const icons = {}
iconNames.forEach((icon) => {
  const componentOutline = IconsOutline[icon]
  const componentSolid = IconsSolid[icon]
  icons[icon] = {
    outline: componentOutline,
    solid: componentSolid,
  }
})

const Icon = ({ name, className, variant = 'outline' }) => {
  const RenderIcon = icons[name][variant]
  return <RenderIcon className={className} />
}

export default Icon
