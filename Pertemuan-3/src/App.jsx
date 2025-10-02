import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './package/Home.jsx'
import './App.css'
import Login from './package/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
