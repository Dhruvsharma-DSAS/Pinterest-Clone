import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const YourBoard = () => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn')
    const savedUser = localStorage.getItem('user')
    
    if (status === 'true' && savedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const boards = [
    { id: 1, name: 'Dream Home', count: 12, image: 'https://i.pinimg.com/1200x/f5/a7/d6/f5a7d628c7e1a3c0a1da92b22cd733dc.jpg' },
    { id: 2, name: 'Recipes', count: 45, image: 'https://i.pinimg.com/736x/63/ee/89/63ee89f3e840c57193b8f92fe60ba85d.jpg' },
    { id: 3, name: 'Travel Vibes', count: 8, image: 'https://i.pinimg.com/736x/72/9a/13/729a1331da87f1fe02932578d2e12117.jpg' }
  ]

  if (!isLoggedIn) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white p-8">
        <div className="max-w-sm text-center">
          <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Log in to see your boards</h1>
          <p className="text-zinc-500 mb-8">Save your favorite ideas and organize them into boards to keep your inspiration in one place.</p>
          <Link 
            to="/login" 
            className="inline-block bg-[#e60023] text-white px-8 py-3 rounded-full font-bold hover:bg-[#ad081b] transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen overflow-y-auto bg-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-32 h-32 rounded-full bg-zinc-100 flex items-center justify-center text-4xl font-bold text-zinc-400 mb-4 border-4 border-white shadow-lg overflow-hidden">
             <img 
                src="https://img.freepik.com/free-photo/beautiful-shot-natural-scenery-autumn_181624-25934.jpg?semt=ais_hybrid&w=740&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold">{user?.username || 'Pinterest User'}</h1>
          <p className="text-zinc-500 mt-1">@{user?.username?.toLowerCase().replace(' ', '') || 'user'}</p>
          
          <div className="flex gap-4 mt-6">
            <button className="bg-zinc-100 px-4 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors">Edit Profile</button>
            <button className="bg-zinc-100 px-4 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors">Share</button>
          </div>
        </div>

        {/* Boards Section */}
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Your Boards</h2>
            <button className="w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center text-2xl font-bold">+</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <div key={board.id} className="cursor-pointer group">
              <div className="h-48 rounded-2xl overflow-hidden bg-zinc-100 mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                <img src={board.image} alt={board.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-lg">{board.name}</h3>
              <p className="text-sm text-zinc-500">{board.count} Pins</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default YourBoard
