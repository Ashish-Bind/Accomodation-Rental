import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

function UserProvider({ children }) {
  const [user, setUser] = useState('')
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data)
        setReady(true)
      })
    }
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
