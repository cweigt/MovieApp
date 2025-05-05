import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css'
import App from './App.jsx'

serviceWorkerRegistration.register(); //service worker for PWA

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
