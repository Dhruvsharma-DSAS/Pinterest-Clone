import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({ to, src, alt, label, className = "", hasNotification = false }) => {
  const content = (
    <div className="relative group flex items-center justify-center w-full">
      <img
        className={`${className} cursor-pointer hover:bg-gray-100 transition-all`}
        src={src}
        alt={alt}
      />
     
      {hasNotification && (
        <div className="absolute top-1 right-5 w-2 h-2 bg-[#e60023] rounded-full border-2 border-white"></div>
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

const LeftBar = () => {
  return (
    <div className="grid h-screen w-[96px] grid-rows-[auto_1fr_auto] justify-items-center border-r border-zinc-200 bg-white py-6">
      <NavItem
        to="/"
        src="https://i.pinimg.com/736x/6e/ad/91/6ead912ceb43c93b8e189d1eb802845f.jpg"
        alt="Pinterest logo"
        className="h-12 w-11 rounded-full object-cover"
      />

      <div className="grid content-start justify-items-center gap-9 pt-10 w-full">
        <NavItem
          to="/"
          src="https://i.pinimg.com/736x/cb/3e/07/cb3e0728a69d17bbcbe8fd6b1642b209.jpg"
          alt="Home"
          label="Home"
          className="h-[49px] w-[49px] p-[1px] object-contain rounded-2xl"
        />
        <NavItem
          to="/explore"
          src="https://i.pinimg.com/736x/3e/08/22/3e0822d8dcb8ef03fac3df915903fbe8.jpg"
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
          src="https://i.pinimg.com/1200x/db/53/f4/db53f45df0246d78d4bc64c7bb750036.jpg"
          alt="Notifications"
          label="Notifications"
          hasNotification={true}
          className="h-[39px] w-[39px] p-[4px] object-contain rounded-full"
        />
      </div>

      <NavItem
        src="https://i.pinimg.com/736x/e5/d1/b0/e5d1b01c1447bea5b4cdc2344a315a93.jpg"
        alt="Settings"
        label="Settings"
        className="h-[30px] w-[30px] object-contain"
      />
    </div>
  )
}

export default LeftBar
