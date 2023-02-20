import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { DndProvider } from 'react-dnd-multi-backend'

import { DragPreview } from './components'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <DndProvider options={HTML5toTouch}>
      <App />
      <DragPreview />
    </DndProvider>
  </React.StrictMode>,
)
