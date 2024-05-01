import { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../context/authContext'
import axios from 'axios';

const Appbar = () => {

  const { user, setUser }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    setUser({ username: "" });
    navigate('/login');
  }

  const getDetails = async () => {
    const tokenId = localStorage.getItem("tokenID");
    const result = await axios.get("http://localhost:3000/auth/me", {
      headers: {
        "Authorization": "bearer " + tokenId
      }
    });
    console.log(result.data.user)
    setUser(() => (
      { username: result.data.user }));
  }

  useEffect(() => {
    getDetails();
    // if making user as dependency then it works infinitly.
  }, [])

  // useEffect(() => {
  //   //have to call to "/me" to check and update user; 
  //   console.log(user)
  // }, [])
  return (
    <nav className="flex items-center justify-between py-4 px-8 font-mono bg-white z-10">
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
