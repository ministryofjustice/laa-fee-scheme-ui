import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import 'govuk-frontend/dist/govuk/govuk-frontend.min.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)