import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog";
import AuthPage from "./components/AuthPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AuthProvider } from "./components/AuthContext";
import Blog from "./components/Blog";
import EditBlog from "./components/EditBlog";
import MyBlog from "./components/MyBlog";
import { Toaster } from "react-hot-toast";
// import Blog from './components/Blog';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: { background: "#363636", color: "#fff" },
          success: {
            duration: 2000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Routes>
        <Route path="/authpage" element={<AuthPage />} />

        <Route path="/" element={<BlogList />} />
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
