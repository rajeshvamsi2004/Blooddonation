import React from 'react'
import './Main.css'
import FrontPageTwo from './FrontPageTwo'
import Buttons from './Buttons'

const FrontPage = () => {
  return (
    <div>
      <body>
        <div className="drop"></div>
        <div className="wave"></div>
        <FrontPageTwo/>
        <Buttons/>
      </body>
      
    </div>
  )
}

export default FrontPage
