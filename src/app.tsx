import { useContext, useState } from 'preact/hooks'
import { Route, Routes } from 'react-router-dom'
import Login from './pages.tsx/Login'
import Landing from './pages.tsx/Landing'
import Dashboard from './pages.tsx/Dashboard'
import Protected from './components/Protected'
import UserProvider, { UserContext } from './components/UserProvider'
import { directusClient } from './directus'
import cookie from 'cookiejs'
import { fromUnixTime } from 'date-fns'

export function App() {
  const [count, setCount] = useState(0);
  const { user } = useContext<any>(UserContext);

  const handleRefresh = () => {
    directusClient.refresh().then(() => {
      const auth = JSON.parse(cookie.get(import.meta.env.VITE_DIRECTUS_CLIENT_AUTH_STORAGE_NAME) as string);
      console.log("refresh #", count + 1);
      console.log("access_token:", auth.access_token);
      console.log("refresh_token:", auth.refresh_token);
      console.log("expires at (unix time):", auth.expires_at);
      console.log("expires at (date):", fromUnixTime(auth.expires_at / 1000));
    });
    setCount(count + 1);
  }

  const handleGetToken = () => {
    directusClient.getToken().then(res => {
      console.log("res:", res);
    }).catch(err => {
      console.log("err:", err);
    });
  }

  return (
    <>
      <div className="fixed top-0 left-0 flex flex-row space-x-4 mt-4 ml-4 z-[100]">
        <button onClick={handleRefresh} className="border border-gray-400 rounded-sm p-2 hover:text-white hover:bg-gray-800 cursor-pointer">Refresh</button>
        <button onClick={handleGetToken} className="border border-gray-400 rounded-sm p-2 hover:text-white hover:bg-gray-800 cursor-pointer">Get Token</button>
        <p>Current User: {user ? `{ id: ${user.id} }` : "logged out"}</p>
      </div>
      <Routes>
        <Route path="/home" element={<Protected><Dashboard /></Protected>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  )
}
