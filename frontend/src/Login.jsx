import React,{useState} from 'react';
import './Main.css';
import { FaUnlockAlt } from 'react-icons/fa'; 
import { CgMail } from 'react-icons/cg'; 
import ToastNotification, { showSuccessToast, showErrorToast } from './ToastNotification';
import { Link } from 'react-router-dom';
const Login =  () => {
  const[email,setEmail] = useState('');
  const[pass,setPass] = useState('');
  const Sub = async (e) => {
    e.preventDefault(); 
    
      const res = await fetch('http://localhost:4000/login', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Password: pass })
      });

      const result = await res.text(); 
      if (res.ok) {
            showSuccessToast(result);
          } else {
            console.log("Error")
          }
        
        
  };

  
  
  return (
    <div>
      <section>
        <div className="login-box">
          <form onSubmit={Sub}>
            <h2>Login</h2>

            <div className="input-box">
              <span className="icon">
                <CgMail size={19} />
              </span>
              <input 
                type="email"
                name="email"
                required
                autoComplete="new-password"
                onChange={(e)=>{setEmail(e.target.value)}}
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
                onChange={(e)=>{setPass(e.target.value)}}
              />
              <label>Password</label>
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
                Forgot Password?
            </div>

            <button type="submit">Login</button>

            <div className="register-link">
              <p>
                Don't have an account ? <Link style={{textDecoration: 'none', color: 'white'}} to='/signup'>Register</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
      <ToastNotification/>
    </div>
  );
}

export default Login;
