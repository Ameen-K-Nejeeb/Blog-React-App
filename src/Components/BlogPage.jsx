import React from 'react'
import { useParams } from 'react-router-dom' 
import { useSelector } from 'react-redux'


const BlogPage = () => {

    const {id} = useParams();
    const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

    if (!blog) return <p>Blog not found !</p>
    
  return (
    <div>

        <h2>{blog.title}</h2>
        <p>{blog.description}</p>
        <img src="{blog.coverImage}" alt="{blog.title}" />
      
    </div>
  )
}

export default BlogPage
