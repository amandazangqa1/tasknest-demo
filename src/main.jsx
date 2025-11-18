import React from 'react'
import { createRoot } from 'react-dom/client'
import TaskNestDemo from './TaskNestDemo.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskNestDemo />
  </React.StrictMode>
)
