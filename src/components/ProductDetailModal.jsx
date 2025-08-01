import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'

const ProductDetailModal = ({ product, onClose }) => {
  const dispatch = useDispatch()
  const discountPercent = product.discountPercent || Math.floor(Math.random() * 6) + 10
  const discountedPrice = product.discountedPrice || (product.price * (1 - discountPercent / 100)).toFixed(2)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl p-6 max-w-md w-full shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 dark:text-gray-300 hover:text-red-500 text-2xl"
        >
          &times;
        </button>

        {/* Product Info */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>

        <div className="text-lg font-bold text-green-600">₹{discountedPrice}</div>
        <div className="text-sm text-gray-400 line-through">₹{product.price}</div>
        <div className="text-sm text-red-500 mb-4">-{discountPercent}% off</div>

        <button
          onClick={() => {
            dispatch(addToCart({ ...product, discountedPrice, discountPercent }))
            onClose()
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductDetailModal
