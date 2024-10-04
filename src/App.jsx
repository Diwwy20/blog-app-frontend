import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

import './App.css';
import Home from './pages/home/Home';
import ArticleDetail from './pages/articleDetail/ArticleDetail';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import AdminLayout from './pages/admin/AdminLayout';
import Admin from './pages/admin/screens/Admin';
import Comments from './pages/admin/screens/comments/Comments';
import ManagePosts from './pages/admin/screens/posts/ManagePosts';
import EditPost from './pages/admin/screens/posts/EditPost';
import Categories from './pages/admin/screens/categories/Categories';
import EditCategories from './pages/admin/screens/categories/EditCategories';
import Users from './pages/admin/screens/users/Users';

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<ArticleDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="categories/manage" element={<Categories />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
          <Route path="categories/manage/edit/:slug" element={<EditCategories />} />
          <Route path="users/manage" element={<Users />} />
        </Route> 
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;