import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { usePlace } from '../context/PlacesContext'

function Header() {
  const { user } = useUser()
  const { filters, updateFilterValue } = usePlace()

  const username =
    user?.name?.[0].toUpperCase() + user?.name?.slice(1, user.name.length)

  const location = useLocation()

  return (
    <div>
      <header className="flex justify-between ">
        <Link to="/" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
            />
          </svg>
          <span className="font-semibold text-2xl">
            Stay<span className="font-extralight">Wise</span>
          </span>
        </Link>

        {location.pathname === '/' && (
          <div className="flex gap-0 border items-center border-gray-300 rounded-full p-2 shadow-md shadow-gray-300">
            <input
              id="searchInput"
              type="text"
              data-search="true"
              placeholder="Any Location"
              onChange={updateFilterValue}
              name="search"
              autoComplete="off"
              value={filters.search}
              className="border-none outline-none cursor-default"
            />
            <label
              className="bg-primary text-white p-2 rounded-full cursor-pointer"
              htmlFor="searchInput"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </label>
          </div>
        )}

        <Link to={user ? '/account' : '/login'}>
          <div className="flex gap-1 border items-center border-gray-300 rounded-full shadow-md shadow-gray-300 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {user && <div className="font-semibold mr-2">{username}</div>}
          </div>
        </Link>
      </header>
    </div>
  )
}

export default Header
