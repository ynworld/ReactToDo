import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { DndProvider } from 'react-dnd-multi-backend'
import dndPipeline from './helpers/dndPipeline'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <DndProvider options={dndPipeline}>
      <App />
      <ToastContainer autoClose={3000} />
    </DndProvider>
  </React.StrictMode>,
)
