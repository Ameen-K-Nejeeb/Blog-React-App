import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './store'
import Navbar from './Components/Home'
import BlogPage from './Components/BlogPage'
import Login from './Components/Login'
import Signup from './Components/Signup'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Routes path="/" element={<Home/>} />
        <Routes path="/blog/:id" element={<BlogPage/>} />
        <Routes path="/login" element={<Login/>} />
        <Routes path="/signup" element={<Signup/>} />
      </Router>
    </Provider>
  )
}

export default App
