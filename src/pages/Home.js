import React from 'react'
import UserInterface from './UserInterface'
import NavBar from '../components/NavBar'

export default function Home() {
  return (
    <div>
      <NavBar />
        <UserInterface />
    </div>
  )
}
