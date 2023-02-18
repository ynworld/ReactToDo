import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <DndProvider debugMode backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>,
)
