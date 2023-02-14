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
  const { itemType, item, style, ref } = preview

  return (
    <div
      ref={ref}
      style={style}
      className={classnames(
        'flex justify-between items-center gap-3 p-4',
        'rounded-lg min-h-[4rem]',
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
