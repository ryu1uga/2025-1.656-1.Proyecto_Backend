import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginPage from './pages/LoginPage.tsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginPage /> } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)