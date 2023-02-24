import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { DndProvider } from 'react-dnd-multi-backend'
import dndPipeline from './helpers/dndPipeline'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <DndProvider options={dndPipeline}>
      <App />
    </DndProvider>
  </React.StrictMode>,
)
