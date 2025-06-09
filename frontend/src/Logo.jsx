import React from 'react'
import blood from './pics/blood.jpeg'
const Logo = () => {
  return (
    <div>
      <img style={{width: '100px', height: '80px', position: 'absolute', top: '-5px', left: '-8px' }} src={blood} alt="" />
    </div>
  )
}

export default Logo
