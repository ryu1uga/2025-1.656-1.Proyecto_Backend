import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import MainPage from './pages/MainPage.tsx'
import GamePage from './pages/game/GamePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/game" element={ <GamePage /> } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)