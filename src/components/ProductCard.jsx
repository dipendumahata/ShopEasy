import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice'

const ProductCard = ({ product, page }) => {
  const dispatch = useDispatch()

  // Apply discount: 10% to 15%
  const discountPercent = Math.floor(Math.random() * 6) + 10 // Random between 10 and 15
  const discountedPrice = (product.price * (1 - discountPercent / 100)).toFixed(2)

  return (
    <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>

        {/* Pricing Section */}
        <div className="mt-3">
          <span className="text-xl font-bold text-green-600">₹{discountedPrice}</span>
          <span className="text-sm line-through text-gray-400 ml-2">₹{product.price}</span>
          <span className="text-sm text-red-500 ml-2">-{discountPercent}%</span>
        </div>
      </div>

      <div className="p-4 pt-0">
        {page === 'cart' ? (
          <button
            onClick={() => dispatch(removeFromCart(product.id))}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition"
          >
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={() => dispatch(addToCart({ ...product, discountedPrice, discountPercent }))}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl transition"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
