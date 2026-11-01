import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import AllPosts from './pages/AllPosts.jsx'
import AddNew from './pages/AddNew.jsx'
import EditPost from './pages/EditPost.jsx'
import Preview from './pages/Preview.jsx'

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>Articles</h1>
        <nav>
          <NavLink to="/posts">All Posts</NavLink>
          <NavLink to="/new">Add New</NavLink>
          <NavLink to="/preview">Preview</NavLink>
        </nav>
      </aside>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/new" element={<AddNew />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </main>
    </div>
  )
}
