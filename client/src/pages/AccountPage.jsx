import { Navigate, useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import axios from 'axios'
import { useState } from 'react'
import PlacesPage from './PlacesPage'
import AccountNav from '../components/AccountNav'

function AccountPage() {
  const [redirect, setRedirect] = useState(null)
  const { ready, user, setUser } = useUser()

  async function logout() {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }

  if (!ready) {
    return <div>Loading ...</div>
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center max-w-lg mx-auto">
        Logged in as {user.name} ({user.email})<br />
        <button className="primary max-w-sm mt-2" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default AccountPage
