import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import imageData from '../../imgdata/img data'
import ProfileMenu from './ProfileMenu'

const RightBar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const status = localStorage.getItem('isLoggedIn');
    if (status === 'true') {
      setIsLoggedIn(true);
    }

    const timer = setTimeout(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const shuffledImages = useMemo(() => {
    return [...imageData].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <div className="w-full h-screen overflow-y-auto p-4 relative bg-[var(--bg-primary)] transition-colors duration-300">
      
      {showNotification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
            <div className="bg-black dark:bg-zinc-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-zinc-700">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                    <img src="https://i.pinimg.com/736x/63/ee/89/63ee89f3e840c57193b8f92fe60ba85d.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold">New ideas waiting for you!</span>
            </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 sticky top-0 bg-[var(--bg-primary)]/80 backdrop-blur-md z-10 py-2 transition-colors duration-300">
        <div className="flex-1 bg-[var(--bg-secondary)] rounded-full flex items-center px-4 py-2.5 transition-colors">
          <span className="text-gray-500 mr-2">🔍</span>
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none w-full text-sm dark:text-white dark:placeholder-zinc-500"
          />
        </div>
        <div className="flex gap-4 font-semibold text-sm items-center">
          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-[#e60023] px-6 py-2.5 text-white font-bold hover:bg-[#ad081b] transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 pb-20">
        {shuffledImages.map((src, index) => (
          <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative shadow-sm hover:shadow-xl transition-all duration-300">
            <img 
              src={src} 
              alt={`Pin ${index}`} 
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
              <div className="flex justify-end">
                <button className="bg-red-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-red-700 transition-colors shadow-lg">Save</button>
              </div>
              <div className="flex justify-between items-center text-white">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors">
                    <span className="text-xs">↗</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightBar
