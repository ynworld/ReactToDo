import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { DndProvider } from 'react-dnd-multi-backend'
import { ToastContainer } from 'react-toastify'
import dndPipeline from './helpers/dndPipeline'
import { toastCloseDelay } from './constants/toasts'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <DndProvider options={dndPipeline}>
      <App />
      <ToastContainer autoClose={toastCloseDelay} />
    </DndProvider>
  </React.StrictMode>,
)
