import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = import.meta.env.VITE_ClientId
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId} >
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
