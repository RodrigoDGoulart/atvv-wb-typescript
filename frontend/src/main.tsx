import React from 'react'
import ReactDOM from 'react-dom/client'
import Rotas from './routes'
import { Head } from './shared/components'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Rotas />
  </React.StrictMode>
)