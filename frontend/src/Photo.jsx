import React,{useState} from 'react'
import Blood1 from './pics/Blood1.jpeg'
import Blood2 from './pics/Blood2.jpeg';
import { useEffect } from 'react';
const Photo = () => {
  const[pho,setPho] = useState(false);
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setPho(true);
    },60000)
  })
  const phot = pho ? Blood1 : Blood2 
  return (
    <div>
      <img src={phot} alt="" />  
    </div>
  )
}

export default Photo
