import React, { useState, useEffect } from 'react'

const Settings = ({ onClose }) => {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    username: ''
  })
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      setUser(parsed)
      setFormData({
        name: parsed.name || '',
        username: parsed.username || ''
      })
    }
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault()
    if (!user) return

    const updatedUser = { ...user, ...formData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    
    setUser(updatedUser)
    setMessage('Profile updated successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Settings Modal Card */}
      <div className={`relative z-10 max-w-2xl w-full ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} rounded-[48px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300`}>
        <div className="p-8 sm:p-12 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-black tracking-tight">Settings</h1>
                <button 
                    onClick={onClose}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors`}
                >
                    ×
                </button>
            </div>

            {message && (
                <div className="mb-8 p-5 bg-green-500/10 text-green-500 rounded-3xl font-bold text-center border border-green-200/20">
                    {message}
                </div>
            )}

            <section className="mb-12">
                <h2 className="text-lg font-bold mb-6 text-zinc-500 uppercase tracking-widest text-xs">Public Profile</h2>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-60 ml-1">Name</label>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className={`w-full h-14 ${isDarkMode ? 'bg-zinc-800 border-zinc-700 focus:border-white' : 'bg-zinc-50 border-zinc-100 focus:border-red-500'} border-2 rounded-2xl px-5 outline-none transition-all font-medium`}
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-60 ml-1">Username</label>
                        <input 
                            type="text" 
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className={`w-full h-14 ${isDarkMode ? 'bg-zinc-800 border-zinc-700 focus:border-white' : 'bg-zinc-50 border-zinc-100 focus:border-red-500'} border-2 rounded-2xl px-5 outline-none transition-all font-medium`}
                            placeholder="@username"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="bg-[#e60023] text-white px-10 py-3.5 rounded-full font-bold hover:bg-[#ad081b] transition-all active:scale-95 shadow-xl shadow-red-500/20"
                    >
                        Save Changes
                    </button>
                </form>
            </section>

            <section className="mb-12 border-t border-zinc-100/10 pt-10">
                <h2 className="text-lg font-bold mb-6 text-zinc-500 uppercase tracking-widest text-xs">App Settings</h2>
                <div className={`flex items-center justify-between p-5 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-50'} rounded-[32px] border ${isDarkMode ? 'border-zinc-800' : 'border-zinc-100'}`}>
                    <div>
                        <p className="font-bold">Dark Mode</p>
                        <p className="text-sm opacity-50 font-medium">Toggle the dark side</p>
                    </div>
                    <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-14 h-8 rounded-full relative transition-all duration-500 ${isDarkMode ? 'bg-blue-600' : 'bg-zinc-300'}`}
                    >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-500 shadow-md ${isDarkMode ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>
            </section>

            <section className="border-t border-zinc-100/10 pt-10 pb-4">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[13px]">
                        <span className="opacity-40 font-medium">Version</span>
                        <span className="font-bold tracking-wider">1.3.0-overlay</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                        <span className="opacity-40 font-medium">Mode</span>
                        <span className="font-bold tracking-wider">{isDarkMode ? 'Dark' : 'Light'}</span>
                    </div>
                </div>
            </section>
        </div>
      </div>
    </div>
  )
}

export default Settings
