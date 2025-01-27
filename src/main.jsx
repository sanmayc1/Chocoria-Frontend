import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { persistor, store } from './Store/Store.jsx';
import { PersistGate } from 'redux-persist/integration/react';

const clientId = import.meta.env.VITE_ClientId
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <GoogleOAuthProvider clientId={clientId} >
    <App />
    </GoogleOAuthProvider>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
