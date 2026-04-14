import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const Navbar = () => {
  const { user, signOutUser } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleLogout = async () => {
    try {
      setError('')
      await signOutUser()
      navigate('/')
    } catch (logoutError) {
      setError(logoutError.message)
    }
  }

  const linkClassName = ({ isActive }) =>
    `transition hover:text-sky-200 ${isActive ? 'text-white' : 'text-sky-100'}`

  return (
    <nav className='border-b border-slate-200 bg-slate-950'>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link to='/' className='text-2xl font-bold text-white'>Blog App</Link>
          <p className='text-sm text-slate-400'>Firebase-authenticated publishing workflow</p>
        </div>

        <div className='flex flex-wrap items-center gap-4 text-sm font-medium'>
          <NavLink to='/' className={linkClassName}>Home</NavLink>

          {user ? (
            <>
              <NavLink to='/add' className={linkClassName}>Write Blog</NavLink>
              <span className='rounded-full bg-slate-800 px-3 py-1 text-slate-200'>
                {user.email}
              </span>
              <button
                type='button'
                onClick={handleLogout}
                className='rounded-full bg-white px-4 py-2 text-slate-950 transition hover:bg-slate-200'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to='/login' className={linkClassName}>Login</NavLink>
              <NavLink
                to='/signup'
                className='rounded-full bg-sky-500 px-4 py-2 text-white transition hover:bg-sky-400'
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
      {error ? <p className="mx-auto max-w-6xl px-4 pb-4 text-sm text-rose-300">{error}</p> : null}
    </nav>
  )
}

export default Navbar
