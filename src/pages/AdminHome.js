import React from 'react'
import UserInterface from './ChatAi'
import NavBar from '../components/AdminNavbar'

export default function AdminHome() {
  return (
    <div>
      <NavBar />
        <UserInterface />
    </div>
  )
}
