import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LoadingLazy } from './components/loading-lazy'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingLazy />}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
