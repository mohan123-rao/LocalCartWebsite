import { useState } from 'react'
import './App.css'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_URL;

function Signup() {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [cpassword,setCPassword] = useState();
  const navigate = useNavigate()

  const FormSubmit = async (e) => {
    e.preventDefault()
    console.log(name)
    try {
      const res = await axios.post(`${baseURL}/signup`,{name,email,password});
      console.log('Signup data added:', res.data);
      alert('SignUp successfully!');
      navigate('/login')

    } catch (err) {
      console.error('Error signUp data adding:', err);
      alert('Failed to signup');
    }

  }

  return (
    <div className='signup'>
    <h1>Sign Up</h1>
      <form onSubmit={FormSubmit}>
        Name:<br></br>
        <input id='userData' type='text' placeholder='Enter your Username' onChange={(e)=>setName(e.target.value)} required/><br /><br />
        Email:<br></br>
        <input type='email' id='userData' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} required/><br /><br />
        Password:<br></br>
        <input type='password' id='userData' placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)} required/><br /><br />
        Confirm Password:<br></br>
        <input type='password' id='userData' placeholder='Enter confirm password' onChange={(e)=>setCPassword(e.target.value)} required/><br /><br />
        <button>Sign Up</button><br /><br />
      </form>
    </div>
  )
}

export default Signup
