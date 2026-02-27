import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Javascript from './components/Javascript'
import ReactCtn from './components/React-Ctn'
import ExpressCtn from './components/ExpressCtn'
import CreatorCtn from './components/CreatorCtn'
import SearchedCards from './components/SearchedCards'
import LoginRegister from './components/LoginRegister'
import Profile from './components/Profile'
import { Toaster } from "react-hot-toast"

import Navbar from './components/Navbar'

function App() {
  const location = useLocation()

  return (
    <div className='app'>
      <Navbar />
      <main className='route-shell' key={location.pathname}>
        <Routes location={location}>
          <Route path='/' element={<Home/>} />
          <Route path='/javascript-cards' element={<Javascript/>} />
          <Route path='/react-cards' element={<ReactCtn/>} />
          <Route path='/express-cards' element={<ExpressCtn/>} />
          <Route path='/creator' element={<CreatorCtn/>} />
          <Route path='/searched-cards' element={<SearchedCards/>} />
          <Route path='/login-register' element={<LoginRegister/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </main>
      <Toaster />
    </div>
  )
}

export default App
