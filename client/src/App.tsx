// import { useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Singup'
import Login from './pages/Login'
import Appbar from './components/Appbar'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Appbar />
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </>
  )
}

export default App
