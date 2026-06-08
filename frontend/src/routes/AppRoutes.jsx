import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

import Home from '../pages/Home'
import GameDetail from '../pages/GameDetail'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import Feed from '../pages/Feed'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Dashboard from '../pages/admin/Dashboard'
import ManageGames from '../pages/admin/ManageGames'
import ManageUsers from '../pages/admin/ManageUsers'
import NotFound from '../pages/NotFound'


function PrivateRoute({ children }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

function AdminRoute({ children }) {
  const { token, isAdmin } = useAuth()
  if (!token) return <Navigate to="/login" />
  if (!isAdmin()) return <Navigate to="/" />
  return children
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/"             element={<Home />} />
                  <Route path="/games/:id"    element={<GameDetail />} />
                  <Route path="/cart"         element={<Cart />} />
                  <Route path="/checkout"     element={<PrivateRoute><Checkout /></PrivateRoute>} />
                  <Route path="/profile"      element={<PrivateRoute><Profile /></PrivateRoute>} />
                  <Route path="/feed"         element={<PrivateRoute><Feed /></PrivateRoute>} />
                  <Route path="/admin"        element={<AdminRoute><Dashboard /></AdminRoute>} />
                  <Route path="/admin/games"  element={<AdminRoute><ManageGames /></AdminRoute>} />
                  <Route path="/admin/users"  element={<AdminRoute><ManageUsers /></AdminRoute>} />
                  <Route path="*"             element={<NotFound />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}