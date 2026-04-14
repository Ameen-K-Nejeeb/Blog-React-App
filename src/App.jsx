import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import BlogPage from './Components/BlogPage'
import Login from './Components/Login'
import Signup from './Components/Signup'
import EditBlog from './Components/EditBlog'
import BlogForm from './Components/BlogForm'
import Home from './Components/Home'
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/add" element={<BlogForm />} />
            <Route path="/edit/:id" element={<EditBlog />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
