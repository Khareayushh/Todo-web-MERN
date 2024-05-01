
import CryptoJS from 'crypto-js';
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
// import dotenv from 'dotenv';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { setUser }: any = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // console.log("secret key", process.env.SECRET_KEY)
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement sign-up logic here
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      // const secretKey: any = "priv";
      // const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();

      const { data } = await axios.post("http://localhost:3000/auth/signup", {username, password})
      localStorage.setItem("tokenID", data.token);
      console.log(data);
      setUser({username: username});
      
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    } catch (error) {
      console.error(error);
      return;
    }
    setUsername('');
    setPassword('');
  };


  return (
    <div className="bg-slate-300 m-auto max-w-screen-md flex justify-center items-center font-mono">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold m-4">Sign Up</h2>
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
          <button type="submit" className="bg-slate-400 px-4 py-2 rounded hover:bg-slate-500 duration-150 hover:text-white mb-4">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup
