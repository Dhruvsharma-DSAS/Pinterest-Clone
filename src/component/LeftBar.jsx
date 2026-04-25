import React from 'react'
import { Link } from 'react-router-dom'
import settingIcon from '../assets/icons/Setting icon .png'
import notificationIcon from '../assets/icons/notification icon.png'
import pinterestLogo from '../assets/icons/Pinterest.png'

const NavItem = ({ to, src, alt, label, className = "", hasNotification = false }) => {
  const content = (
    <div className="relative group flex items-center justify-center w-full">
      <img
        className={`${className} cursor-pointer hover:theme-input transition-all`}
        src={src}
        alt={alt}
      />
     
      {hasNotification && (
        <div className="absolute top-1 right-5 w-2 h-2 bg-[#e60023] rounded-full border-2 theme-border"></div>
      )}
      {label && (
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-black text-white text-[11px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-xl translate-x-[-10px] group-hover:translate-x-0">
          {label}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-[5px] border-y-transparent border-r-[5px] border-r-black"></div>
        </div>
      )}
    </div>
  )

  return to ? <Link to={to} className="w-full flex justify-center">{content}</Link> : content
}

const LeftBar = ({ onSettingsClick, isDarkMode }) => {
  return (
    <div className="grid h-screen w-[96px] grid-rows-[auto_1fr_auto] justify-items-center border-r theme-border theme-bg py-6 transition-colors duration-300">
      <NavItem
        to="/"
        src={pinterestLogo}
        alt="Pinterest logo"
        className="h-12 w-11 rounded-full object-contain"
      />

      <div className="grid content-start justify-items-center gap-9 pt-24 w-full">
        <NavItem
          to="/"
          src="https://i.pinimg.com/736x/cb/3e/07/cb3e0728a69d17bbcbe8fd6b1642b209.jpg"
          alt="Home"
          label="Home"
          className="h-[40px] w-[40px] p-[1px] object-contain rounded-2xl"
        />
        <NavItem
          to="/explore"
          src="https://i.pinimg.com/736x/32/23/ae/3223ae7efbcd98dadbe20465fcd6b7ab.jpg"
          alt="Explore"
          label="Explore"
          className="h-[40px] w-[40px] p-[7px] object-contain rounded-2xl"
        />
        <NavItem
          to="/your-board"
          src="https://i.pinimg.com/736x/fd/4d/3e/fd4d3ec06e0390cab9f385f944acb1c5.jpg"
          alt="Your Board"
          label="Your Board"
          className="h-[49px] w-[49px] p-[8px] object-contain rounded-full"
        />
        <NavItem
          to="/notifications"
          src="https://i.pinimg.com/1200x/c9/fe/af/c9feaf6c08af754376617ffb7220a1c8.jpg"
          alt="Notifications"
          label="Notifications"
          hasNotification={true}
          className="h-[39px] w-[39px] p-[2px] object-contain rounded-full"
        />
      </div>

      <div onClick={onSettingsClick} className="w-full flex justify-center pb-4">
        <div className="w-12 h-12 rounded-full border theme-border flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm">
            <NavItem
                src="https://i.pinimg.com/1200x/79/62/3b/79623b5a87609eaa87dd0475e755c6ca.jpg"
                alt="Settings"
                label="Settings"
                className="h-[40px] w-[40px] object-cover rounded-full dark:invert transition-all duration-300"
            />
        </div>
      </div>
    </div>
  )
}

export default LeftBar
