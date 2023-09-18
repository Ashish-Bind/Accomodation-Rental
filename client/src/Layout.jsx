import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function Layout() {
  return (
    <div className="p-4 mx-10">
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
