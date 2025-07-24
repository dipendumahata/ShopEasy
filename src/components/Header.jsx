import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const cartCount = useSelector(state => state.cartReducer.cartItems.length)
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode
  const toggleDarkMode = () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      setDarkMode(false)
      localStorage.setItem('theme', 'light')
    } else {
      html.classList.add('dark')
      setDarkMode(true)
      localStorage.setItem('theme', 'dark')
    }
  }

  // Load saved theme on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }
  }, [])

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white">
          🛒 ShopEasy
        </Link>

        <nav className="flex items-center gap-4 text-gray-700 dark:text-gray-100">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
          <Link to="/profile">Profile</Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="ml-4 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
