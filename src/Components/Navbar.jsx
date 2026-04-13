import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <h1>Blog App</h1>
      <div>

        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>

      </div>
    </nav>
  )
}

export default Navbar
