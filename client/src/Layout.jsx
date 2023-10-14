import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function Layout() {
  return (
    <div className="lg:p-4  p-2 mx-1 lg:mx-10 h-full">
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
