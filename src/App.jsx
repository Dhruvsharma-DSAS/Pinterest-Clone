import React, { useState } from 'react'
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

const Layout = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark')

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  return (
    <div className='flex h-screen bg-white dark:bg-[#111111] transition-colors duration-300 relative text-black dark:text-white'>
      <LeftBar onSettingsClick={() => setShowSettings(true)} />
      <div className='flex-1 h-screen overflow-hidden'>
        {children}
      </div>
      
      {showSettings && (
        <Settings 
          onClose={() => setShowSettings(false)} 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout><RightBar /></Layout>} />
      <Route path='/explore' element={<Layout><Explore /></Layout>} />
      <Route path='/explore/:categoryId' element={<Layout><ExploreCategory /></Layout>} />
      <Route path='/notifications' element={<Layout><Notifications /></Layout>} />
      <Route path='/your-board' element={<Layout><YourBoard /></Layout>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default App
