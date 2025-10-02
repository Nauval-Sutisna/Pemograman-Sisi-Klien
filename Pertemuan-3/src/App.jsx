import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './package/Home.jsx'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
