import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.module.scss'
import App from './App.tsx'
import { AuthContextProvider } from './context/auth.tsx'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
)
