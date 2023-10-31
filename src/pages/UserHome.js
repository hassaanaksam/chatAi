import React from 'react'
import UserInterface from './UserInterface'
import UserNavbar from '../components/UserNavbar'


export default function UserHome() {
  return (
    <div>
      <UserNavbar />
        <UserInterface />
    </div>
  )
}
