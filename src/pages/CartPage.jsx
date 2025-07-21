import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { increaseQty, decreaseQty, removeFromCart } from '../redux/slices/cartSlice'


const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cartReducer.cartItems)

  const handlePlaceOrder = () => {
    navigate('/place-order', { state: { cartItems } })
  }

  const totalOriginalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const totalDiscountedPrice = cartItems.reduce((sum, item) => sum + item.discountedPrice * item.qty, 0)
  const totalSaved = (totalOriginalPrice - totalDiscountedPrice).toFixed(2)

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is currently empty.</p>
      ) : (
        <>
          {/* Cart Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="w-full max-w-xs bg-white rounded-2xl shadow-md p-4 flex flex-col"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-44 object-cover rounded-lg"
                />
                <h2 className="mt-3 font-semibold text-lg text-gray-800">{item.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

                {/* Price + Qty */}
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Price: ₹{item.discountedPrice} × {item.qty}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{(item.discountedPrice * item.qty).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-full"
                  >
                    −
                  </button>
                  <span className="text-gray-700">{item.qty}</span>
                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-600 font-bold rounded-full"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition"
                >
                  Remove
                </button>
                
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cart Summary</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Total Original Price:</span>
              <span className="line-through">₹{totalOriginalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Total Discounted Price:</span>
              <span className="font-medium text-green-600">
                ₹{totalDiscountedPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-700 font-semibold mt-2">
              <span>You Saved:</span>
              <span className="text-red-500">₹{totalSaved}</span>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl transition text-lg"
              >
                Place Order
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  )
}

export default CartPage
