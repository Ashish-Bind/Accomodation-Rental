import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../context/UserContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUser } = useUser()

  async function loginUser(e) {
    e.preventDefault()
    try {
      const res = await axios.post('/login', { email, password })
      setUser(res.data)
      alert('Login Successful!')
      setRedirect(true)
    } catch ({ response }) {
      alert(response.data)
      setEmail('')
      setPassword('')
    }
  }

  return !redirect ? (
    <div className="max-w-lg mx-auto mt-20">
      <h1 className="text-3xl text-center">Login</h1>
      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="primary">Login</button>
        <div className="text-center py-2">
          Don&apos;t have an account yet?{' '}
          <Link to="/register" className="underline text-black">
            Register Now
          </Link>
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/" />
  )
}

export default LoginPage
