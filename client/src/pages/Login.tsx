import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const { setUser }: any = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRight, setIsRight] = useState(true);

  const showToastMessage = () => {
    toast.info("Login to access Todos!", {
      position: "top-center"
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3000/auth/login", { username, password })
      localStorage.setItem("tokenID", result.data.token);
      console.log("Token set Successfully", {
        username,
        password
      });
      setUser({ username: username });
      navigate("/");
    } catch (error) {
      setIsRight(false);
      console.log(error)
    }
    // setTimeout(() => {
    //   navigate("/");
    // }, 3000)
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  useEffect(()=>{
    showToastMessage();
  }, [])

  return (
    <div className="bg-slate-300 m-auto max-w-screen-md flex justify-center items-center font-mono">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold m-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
          <div className="mb-4">
            <label htmlFor="username" className="p-2">Username:</label>
            <input
              placeholder='khareayushh'
              className="rounded p-1"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="p-2">Password:</label>
            <input
              placeholder='******'
              className="rounded p-1"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {(!isRight) && <p className="text-red-400 mb-4 font-semibold">Username or Password is INVALID</p> }
          <button type="submit" className="bg-slate-400 px-4 py-2 rounded hover:bg-slate-500 duration-150 hover:text-white mb-4">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
