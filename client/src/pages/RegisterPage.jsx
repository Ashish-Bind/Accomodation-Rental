import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(e) {
    e.preventDefault()
    axios.post('/register', { name, email, password })
  }

  return (
    <div className="max-w-lg mx-auto mt-20">
      <h1 className="text-3xl text-center">Register</h1>
      <form action="" onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Khabib Nurmagomedov"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Already have an account yet?{' '}
          <Link to="/login" className="underline text-black">
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
