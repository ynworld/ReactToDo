import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { TouchTransition, MouseTransition } from 'react-dnd-multi-backend'

const dndPipeline = {
  backends: [
    {
      backend: HTML5Backend,
      id: 'html5',
      preview: true,
      transition: MouseTransition,
    },
    {
      backend: TouchBackend,
      id: 'touch',
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
}

export default dndPipeline
