import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    const navigate = useNavigate();

    localStorage.removeItem('token').then(() => {
        
        navigate('/login')

    }).catch((err) => {
        console.log(err)
    });;
    
  return (
    <div>

    </div>
  )
}
