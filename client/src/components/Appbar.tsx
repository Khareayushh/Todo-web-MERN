import { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../context/authContext'

const Appbar = () => {

  const { user, setUser }: any = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(user);

  // setTimeout(()=> {
  //   setUser({ username: "hanuman" });
  // }, 3000)

  const handleLogout = async () => {
    localStorage.clear();
    setUser({username: ""});
    navigate('/login');
  }

  useEffect(() => {
    
  }, [user])
  return (
    <nav className="flex items-center justify-between my-4 mx-8 font-mono">
      <NavLink to="/">
        <p className="text-xl font-bold">Intersting Todo</p>
      </NavLink>
      {(user.username) ? (<div className="flex gap-4 items-center">
        <p className='font-bold'>Hello✋, {user.username}</p>
        <button className="bg-slate-200 p-2 rounded-md hover:bg-slate-300 duration-200" onClick={handleLogout}>Logout</button>
      </div>) : (<div className='font-semibold'>
        <NavLink to="/login" className="p-4 mr-2">Login</NavLink>
        <NavLink to="/signup" className="p=4">Sign-Up</NavLink>
      </div>)}

    </nav>
  )
}

export default Appbar
