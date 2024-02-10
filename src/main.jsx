import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CardContextProvider from '../ContextAPI/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CardContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CardContextProvider>
  </React.StrictMode>,
)
