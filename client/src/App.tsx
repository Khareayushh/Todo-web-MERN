// import { useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Singup'
import Login from './pages/Login'
import Appbar from './components/Appbar'
import { MyAuthContext } from './context/authContext'
import { useState } from 'react'

function App() {
  
  const [user, setUser] = useState({});

  return (
    <MyAuthContext value={{user, setUser}}>
      <Appbar />
      <Routes>
        <Route path='/' index element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </MyAuthContext>
  )
}

export default App
