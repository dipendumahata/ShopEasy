import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../redux/slices/productSlice'


const HomePage = () => {
  const dispatch = useDispatch()
  const { products, status } = useSelector(state => state.productReducer)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        🆕 Get Latest Products Here
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
                     rounded-lg shadow-sm focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
        />
      </div>

      {/* Product Grid or Loading/Error */}
      {status === 'loading' ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(item => (
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
              No products match your search.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default HomePage
