import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const UserDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        )
        setUser(data)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  if (loading) return <div className="text-center mt-8">Loading...</div>

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Directory
      </Link>
      <div className="border rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
        <div className="space-y-2">
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone}</p>
          <p><span className="font-semibold">Website:</span> {user.website}</p>
          <p>
            <span className="font-semibold">Address:</span> {user.address.street}, 
            {user.address.city}, {user.address.zipcode}
          </p>
          <p>
            <span className="font-semibold">Company:</span> {user.company.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserDetails