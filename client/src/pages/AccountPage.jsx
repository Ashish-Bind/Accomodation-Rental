import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function AccountPage() {
  const { ready, user } = useUser()
  if (!ready) {
    return <div>Loading ...</div>
  }
  if (ready && !user) {
    return <Navigate to="/login" />
  }
  return <div>Account Page for {user?.name}</div>
}

export default AccountPage
