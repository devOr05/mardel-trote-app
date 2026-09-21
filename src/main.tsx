import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Forzar el título correcto en la pestaña de Mar del Trote
document.title = 'Mar del Trote | Running & Nutrición';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
