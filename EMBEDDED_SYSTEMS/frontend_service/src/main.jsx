import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import ApplicationRouter from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApplicationRouter />
    </Provider>
    <Toaster />
  </React.StrictMode>,
)
