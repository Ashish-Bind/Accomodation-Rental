import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

function UserProvider({ children }) {
  const [user, setUser] = useState('')
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
