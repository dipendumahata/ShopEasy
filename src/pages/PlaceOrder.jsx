import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cartSlice } from '../redux/slices/cartSlice' // optional if you want to clear cart

const PlaceOrderPage = () => {
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  const totalAmount = cartItems.reduce((sum, item) => sum + item.discountedPrice * item.qty, 0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // State for form
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const handleOrder = () => {
    if (!name.trim() || !address.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    // Optional: Clear cart after placing order
    // dispatch(cartSlice.actions.clearCart()) // Uncomment if you add a clearCart reducer

    alert(`✅ Order placed successfully!\n\nName: ${name}\nTotal: ₹${totalAmount.toFixed(2)}`)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🧾 Order Summary</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No items to place an order.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">

          {/* Customer Info */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Information</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Address *</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your shipping address"
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Phone Number (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter phone number"
            />
          </div>

          {/* Product List */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Items in Cart</h2>
          <ul className="divide-y divide-gray-200 mb-6">
            {cartItems.map(item => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <div className="text-green-600 font-semibold">
                  ₹{(item.discountedPrice * item.qty).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          {/* Total & Confirm */}
          <div className="flex justify-between text-xl font-bold text-gray-800 mb-4">
            <span>Total Amount:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>

          <div className="text-center">
            <button
              onClick={handleOrder}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl transition text-lg"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlaceOrderPage
