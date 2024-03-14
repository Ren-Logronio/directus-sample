import { useState } from 'preact/hooks'
import { Route, Routes } from 'react-router-dom'
import Login from './pages.tsx/Login'
import Landing from './pages.tsx/Landing'
import Dashboard from './pages.tsx/Dashboard'
import Protected from './components/Protected'

export function App() {

  return (
    <>
      <p>Directus App</p>
      <Routes>
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  )
}
