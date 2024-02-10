import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Javascript from './components/Javascript'
import ReactCtn from './components/React-Ctn'
import ExpressCtn from './components/ExpressCtn'
import CreatorCtn from './components/CreatorCtn'
import SearchedCards from './components/SearchedCards'

import Navbar from './components/Navbar'

function App() {

  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/javascript-cards' element={<Javascript/>} />
        <Route path='/react-cards' element={<ReactCtn/>} />
        <Route path='express-cards' element={<ExpressCtn/>} /> 
        <Route path='/creator' element={<CreatorCtn/>} />
        <Route path='/searched-cards' element={<SearchedCards/>} />
      </Routes>
    </div>
  )
}

export default App
