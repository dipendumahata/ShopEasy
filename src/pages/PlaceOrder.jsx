import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PlaceOrderPage = () => {
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  const totalAmount = cartItems.reduce((sum, item) => sum + item.discountedPrice * item.qty, 0)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🧾 Order Summary</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No items to place an order.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
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

          <div className="flex justify-between text-xl font-bold text-gray-800">
            <span>Total Amount:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                alert('✅ Order placed successfully!')
                navigate('/')
              }}
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
