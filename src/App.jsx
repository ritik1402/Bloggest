import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog";
import AuthPage from "./components/AuthPage";
import ProtectedRoute from "./components/ProtectedRoutes"; // ✅ corrected filename
import { AuthProvider } from "./components/AuthContext"; // ✅ corrected path
import Blog from "./components/Blog";
import EditBlog from "./components/EditBlog";
import MyBlog from "./components/MyBlog";
// import Blog from './components/Blog';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/authpage" element={<AuthPage />} />

        <Route
          path="/addblog"
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myblogs"
          element={
            <ProtectedRoute>
              <MyBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
