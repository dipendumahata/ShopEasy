import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShoppingCart } from 'lucide-react' // optional icon

const Header = () => {
  const cartCount = useSelector(state => state.cartReducer.cartItems.length)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition">
          🛒 ShopEasy
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Home
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 font-medium transition">
            <ShoppingCart className="inline mr-1" size={20} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
