import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const YourBoard = () => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('saved')
  const [savedPins, setSavedPins] = useState([])

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn')
    const savedUser = localStorage.getItem('user')
    if (status === 'true' && savedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(savedUser))
    }

    const saved = JSON.parse(localStorage.getItem('savedPins') || '[]')
    setSavedPins(saved)
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center theme-bg p-8 transition-colors duration-300">
        <div className="max-w-sm text-center">
          <div className="w-24 h-24 theme-input rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 theme-text">Log in to see your boards</h1>
          <p className="text-zinc-500 mb-8">Save your favorite ideas and organize them into boards.</p>
          <Link to="/login" className="inline-block bg-[#e60023] text-white px-8 py-3 rounded-full font-bold hover:bg-[#ad081b] transition-colors">Log in</Link>
        </div>
      </div>
    )
  }

  const firstLetter = user?.username ? user.username.charAt(0).toUpperCase() : '?';

  return (
    <div className="w-full h-screen overflow-y-auto theme-bg p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Profile */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-28 h-28 rounded-full bg-[#E60023] flex items-center justify-center text-4xl font-black text-white mb-4 border-2 theme-border shadow-xl">
             {firstLetter}
          </div>
          <h1 className="text-3xl font-bold tracking-tight theme-text transition-colors">{user?.username || 'Pinterest User'}</h1>
          <p className="text-zinc-500 mt-1 font-medium text-sm">@{user?.username?.toLowerCase().replace(/\s+/g, '') || 'user'}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-12 border-b theme-border pb-2 transition-colors">
            <button 
                onClick={() => setActiveTab('created')}
                className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'created' ? 'theme-text' : 'text-zinc-400'}`}
            >
                Created
                {activeTab === 'created' && <div className="absolute bottom-0 left-0 w-full h-[2px] theme-text bg-current rounded-full" />}
            </button>
            <button 
                onClick={() => setActiveTab('saved')}
                className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'saved' ? 'theme-text' : 'text-zinc-400'}`}
            >
                Saved
                {activeTab === 'saved' && <div className="absolute bottom-0 left-0 w-full h-[2px] theme-text bg-current rounded-full" />}
            </button>
        </div>

        {/* Content */}
        {activeTab === 'saved' ? (
            <div className="pb-32">
                {savedPins.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <div className="cursor-pointer group">
                            <div className="h-56 rounded-[24px] overflow-hidden theme-input mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300 relative border theme-border">
                                <div className="grid grid-cols-2 h-full gap-[2px]">
                                    {savedPins.slice(0, 4).map((src, i) => (
                                        <img key={i} src={src} className="w-full h-full object-cover" alt="Saved" />
                                    ))}
                                    {savedPins.length < 4 && <div className="bg-zinc-100 dark:bg-zinc-800" />}
                                </div>
                            </div>
                            <div className="px-2">
                                <h3 className="font-bold text-lg theme-text">All Pins</h3>
                                <p className="text-xs text-zinc-500 font-medium">{savedPins.length} Pins</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-zinc-500 mb-4">Nothing saved yet! Go explore some ideas.</p>
                        <Link to="/" className="text-[#e60023] font-bold hover:underline">Start Exploring</Link>
                    </div>
                )}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm text-zinc-500 mb-6">You haven't created any Pins yet.</p>
                <button className="bg-[#e60023] text-white px-8 py-2.5 rounded-full font-bold hover:bg-[#ad081b] transition-all shadow-lg text-sm">
                    Create
                </button>
            </div>
        )}
      </div>
    </div>
  )
}

export default YourBoard
