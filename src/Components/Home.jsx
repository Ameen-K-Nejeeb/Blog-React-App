import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Home = () => {

    const blogs = useSelector(state => state.blogs)

  return (
    <div>
        <h2>All Blogs</h2>
        <Link to='/add'>Add New Blog</Link>
        {blogs.map(blog => (
            <div key={blog.id}>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <Link to={`/blog/${blog.id}`}>Read More</Link>
            </div>
        ))}

    </div>
  )
}

export default Home
