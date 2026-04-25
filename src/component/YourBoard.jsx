import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const YourBoard = () => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('saved')

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
    { id: 3, name: 'Travel Vibes', count: 8, image: 'https://i.pinimg.com/736x/72/9a/13/729a1331da87f1fe02932578d2e12117.jpg' },
    { id: 4, name: 'Art Inspiration', count: 23, image: 'https://i.pinimg.com/736x/95/40/b1/9540b1b5148dcb258bcfb7b55d705373.jpg' }
  ]

  if (!isLoggedIn) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-[#111111] p-8 transition-colors duration-300">
        <div className="max-w-sm text-center">
          <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Log in to see your boards</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">Save your favorite ideas and organize them into boards to keep your inspiration in one place.</p>
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

  const firstLetter = user?.username ? user.username.charAt(0).toUpperCase() : '?';

  return (
    <div className="w-full h-screen overflow-y-auto bg-white dark:bg-[#111111] p-8 scroll-smooth transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-32 h-32 rounded-full bg-yellow-500 flex items-center justify-center text-5xl font-black text-white mb-4 border-4 border-white dark:border-zinc-800 shadow-xl transition-colors">
             {firstLetter}
          </div>
          <h1 className="text-4xl font-bold tracking-tight dark:text-white transition-colors">{user?.username || 'Pinterest User'}</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">@{user?.username?.toLowerCase().replace(/\s+/g, '') || 'user'}</p>
          
          <div className="flex gap-4 mt-8">
            <button className="bg-zinc-100 dark:bg-zinc-800 dark:text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95">Edit Profile</button>
            <button className="bg-zinc-100 dark:bg-zinc-800 dark:text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95">Share</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-12 border-b border-zinc-100 dark:border-zinc-800/50 pb-2 transition-colors">
            <button 
                onClick={() => setActiveTab('created')}
                className={`pb-4 text-lg font-bold transition-all relative ${activeTab === 'created' ? 'text-black dark:text-white' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
                Created
                {activeTab === 'created' && <div className="absolute bottom-0 left-0 w-full h-1 bg-black dark:bg-white rounded-full" />}
            </button>
            <button 
                onClick={() => setActiveTab('saved')}
                className={`pb-4 text-lg font-bold transition-all relative ${activeTab === 'saved' ? 'text-black dark:text-white' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
                Saved
                {activeTab === 'saved' && <div className="absolute bottom-0 left-0 w-full h-1 bg-black dark:bg-white rounded-full" />}
            </button>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
                <button className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors dark:text-white">
                    <span className="text-xl">🎚️</span>
                </button>
            </div>
            <button className="w-12 h-12 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-3xl font-light transition-colors dark:text-white">+</button>
        </div>

        {/* Content Grid */}
        {activeTab === 'saved' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-32">
            {boards.map((board) => (
                <div key={board.id} className="cursor-pointer group">
                <div className="h-56 rounded-[32px] overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300 relative">
                    <img src={board.image} alt={board.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="px-2">
                    <h3 className="font-bold text-xl group-hover:text-red-600 transition-colors dark:text-zinc-200">{board.name}</h3>
                    <p className="text-sm text-zinc-500 font-medium">{board.count} Pins</p>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-xl text-zinc-500 mb-6">You haven't created any Pins yet.</p>
                <button className="bg-[#e60023] text-white px-8 py-3 rounded-full font-bold hover:bg-[#ad081b] transition-all active:scale-95 shadow-lg">
                    Create your first Pin
                </button>
            </div>
        )}
      </div>
    </div>
  )
}

export default YourBoard
