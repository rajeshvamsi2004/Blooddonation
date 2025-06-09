import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Buttons = () => {
  return (
    <div className='Buttonsdiv'>
      <Link to='/login'><button>Login</button></Link>
      <Link to='/signup'><button>Signup</button></Link>
    </div>
  )
}

export default Buttons
