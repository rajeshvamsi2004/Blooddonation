import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import './Main.css'
import { FaUnlockAlt } from 'react-icons/fa'; 
import { CgMail } from 'react-icons/cg'; 
import ToastNotification, { showSuccessToast, showErrorToast } from './ToastNotification';
import { Link } from 'react-router-dom';
const Signup = () => {
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[message,setMessage] = useState('');
  const Submit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Username: name,   
        Email: email,
        Password: password,
      }),
    });
  
    const data = await res.text();
    if (res.ok) {
      showSuccessToast(data);
    } else {
      console.log("Error")
    }
  };
 
  
  return (
    <div>
      <section>
         <div className="login-box" style={{fontFamily: 'sans-serif'}}>
                  <form onSubmit={Submit}>
                    <h2>Signup</h2>
        
                    <div className="input-box">
                      <span className="icon">
                        <CgMail size={19} />
                      </span>
                      <input 
                        type="username"
                        name="username"
                        required
                        autoComplete="new-password"
                        onChange={(e)=>setName(e.target.value)}
                      />
                      <label>Username</label>
                    </div>
        
                    <div className="input-box">
                      <span className="icon">
                        <FaUnlockAlt size={15} />
                      </span>
                      <input
                        type="Email"
                        name="Email"
                        required
                        autoComplete="new-password"
                        onChange={(e)=>setEmail(e.target.value)}
                      />
                      <label>Email</label>
                    </div>
                    <div className="input-box">
                      <span className="icon">
                        <FaUnlockAlt size={15} />
                      </span>
                      <input
                        type="password"
                        name="password"
                        required
                        autoComplete="new-password"
                        onChange={(e)=>setPassword(e.target.value)}
                        
                      />
                      <label> Password</label>
                    </div>
        
                    
        
                    <button type="submit">Register</button>
                    {message && <p color='red'>{message}</p>}
        
                    <div className="register-link">
                      <p>
                        Already  have an account ? <Link style={{textDecoration: 'none', color: 'white'}} to='/login'>Login</Link>
                      </p>
                    </div>
                  </form>
                </div>
      </section>
     <ToastNotification/>
    </div>
  )
}

export default Signup
