import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function AccountPage() {
  const { ready, user } = useUser()
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready) {
    return <div>Loading ...</div>
  }
  if (ready && !user) {
    return <Navigate to="/login" />
  }

  
  function LinkClasses (type=null) {
    let classes = 'py-2 px-6';
    if (type === subpage) {
      classes += 'bg-primary text-white rounded-full'
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
      <Link className={LinkClasses('profile')} to={'/account'}>My profile</Link>
        <Link className={LinkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
        <Link className={LinkClasses('places')} to={'/account/places'}>My accommodations</Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
    </div>
  );
}

export default AccountPage
