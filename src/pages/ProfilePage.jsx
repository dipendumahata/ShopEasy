import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    phone: ''
  })
  const [lastOrderTotal, setLastOrderTotal] = useState('')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'))
    const orderTotal = localStorage.getItem('lastOrderTotal')

    if (storedProfile) setProfile(storedProfile)
    if (orderTotal) setLastOrderTotal(orderTotal)
  }, [])

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile))
    setEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">👤 Your Profile</h1>

        {/* Profile Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            {editing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            ) : (
              <p className="text-gray-800">{profile.name || '—'}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Address</label>
            {editing ? (
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            ) : (
              <p className="text-gray-800">{profile.address || '—'}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            {editing ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            ) : (
              <p className="text-gray-800">{profile.phone || '—'}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Last Order Total</label>
            <p className="text-green-700 font-semibold">₹{lastOrderTotal || '0.00'}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 text-center">
          {editing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
