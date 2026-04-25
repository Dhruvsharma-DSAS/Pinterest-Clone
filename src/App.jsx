import React from 'react'
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
  return (
    <div className='flex h-screen bg-white'>
      <LeftBar />
      <div className='flex-1 h-screen overflow-hidden'>
        {children}
      </div>
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
      <Route path='/settings' element={<Layout><Settings /></Layout>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default App
