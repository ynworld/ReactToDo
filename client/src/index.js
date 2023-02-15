import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { DndProvider, usePreview } from 'react-dnd-multi-backend'
import { ItemView } from './components'

import classnames from 'classnames'

const MyPreview = () => {
  const preview = usePreview()
  if (!preview.display) {
    return null
  }
  const { item, style, ref, monitor } = preview

  let y = monitor.getClientOffset()?.y ?? 0

  const transform = `translateY(${y}px)`

  const finalStyle = {
    ...style,
    transform,
    WebkitTransform: transform,
  }

  return (
    <div
      ref={ref}
      style={finalStyle}
      className={classnames(
        'flex justify-between items-center gap-3 p-4',
        'rounded-lg min-h-[4rem] ml-4',
        'shadow-md bg-gradient-to-br from-white to-gray-50',
        'opacity-50',
      )}
    >
      <ItemView todo={{ ...item }} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <DndProvider options={HTML5toTouch}>
      <App />
      <MyPreview />
    </DndProvider>
  </React.StrictMode>,
)
