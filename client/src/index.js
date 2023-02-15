import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { DndProvider } from 'react-dnd-multi-backend'

import { Preview } from './components'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <DndProvider options={HTML5toTouch}>
      <App />
      <Preview />
    </DndProvider>
  </React.StrictMode>,
)
