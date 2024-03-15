import { useState } from 'preact/hooks'
import { Route, Routes } from 'react-router-dom'
import Login from './pages.tsx/Login'
import Landing from './pages.tsx/Landing'
import Dashboard from './pages.tsx/Dashboard'
import Protected from './components/Protected'
import UserProvider from './components/UserProvider'

export function App() {

  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/home" element={<Protected><Dashboard /></Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </UserProvider>
    </>
  )
}
