import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import Header from './components/Header'
import PlaceOrderPage from './pages/PlaceOrder'
import ProfilePage from './pages/ProfilePage' // 👤 Import ProfilePage

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/place-order" element={<PlaceOrderPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* 👤 Add this */}
      </Routes>
    </Router>
  )
}

export default App