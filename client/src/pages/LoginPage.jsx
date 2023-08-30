import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="max-w-lg mx-auto mt-20">
      <h1 className="text-3xl text-center">Login</h1>
      <form action="">
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
  )
}

export default LoginPage
