import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import LeftBar from './component/LeftBar'
import Login from './component/Login'
import Signup from './component/Signup'
import RightBar from './component/RightBar'
import Explore from './component/Explore'
import Notifications from './component/Notifications'
import YourBoard from './component/YourBoard'
import ExploreCategory from './component/ExploreCategory'
import Settings from './component/Settings'

const Layout = ({ children, onSettingsClick, isDarkMode }) => {
  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-[#111111] text-white' : 'bg-white text-black'} transition-colors duration-300 relative`}>
      <LeftBar onSettingsClick={onSettingsClick} />
      <div className='flex-1 h-screen overflow-hidden'>
        {children}
      </div>
    </div>
  )
}

const App = () => {
  const [showSettings, setShowSettings] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleSettings = () => setShowSettings(!showSettings)

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout onSettingsClick={toggleSettings} isDarkMode={isDarkMode}><RightBar /></Layout>} />
        <Route path='/explore' element={<Layout onSettingsClick={toggleSettings} isDarkMode={isDarkMode}><Explore /></Layout>} />
        <Route path='/explore/:categoryId' element={<Layout onSettingsClick={toggleSettings} isDarkMode={isDarkMode}><ExploreCategory /></Layout>} />
        <Route path='/notifications' element={<Layout onSettingsClick={toggleSettings} isDarkMode={isDarkMode}><Notifications /></Layout>} />
        <Route path='/your-board' element={<Layout onSettingsClick={toggleSettings} isDarkMode={isDarkMode}><YourBoard /></Layout>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

      {showSettings && (
        <Settings 
          onClose={() => setShowSettings(false)} 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}
    </>
  )
}

export default App
