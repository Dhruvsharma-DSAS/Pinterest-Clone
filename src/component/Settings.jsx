import React, { useState, useEffect } from 'react'

const Settings = ({ onClose, isDarkMode, setIsDarkMode }) => {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    username: ''
  })
  const [message, setMessage] = useState('')

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
    <div className="fixed inset-0 z-[999] flex items-center justify-start">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`relative z-10 ml-[106px] h-[90vh] max-w-xl w-full ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'} rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-left-8 duration-500 border`}>
        <div className="p-8 sm:p-10 h-full overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-black tracking-tight">Settings</h1>
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
                <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-6">Public Profile</h2>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-60 ml-1">Name</label>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className={`w-full h-14 ${isDarkMode ? 'bg-zinc-800 border-zinc-700 focus:border-white' : 'bg-zinc-50 border-zinc-200 focus:border-red-500'} border-2 rounded-2xl px-5 outline-none transition-all font-medium`}
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-60 ml-1">Username</label>
                        <input 
                            type="text" 
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className={`w-full h-14 ${isDarkMode ? 'bg-zinc-800 border-zinc-700 focus:border-white' : 'bg-zinc-50 border-zinc-200 focus:border-red-500'} border-2 rounded-2xl px-5 outline-none transition-all font-medium`}
                            placeholder="@username"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="bg-[#e60023] text-white px-10 py-4 rounded-full font-bold hover:bg-[#ad081b] transition-all active:scale-95 shadow-xl shadow-red-500/20"
                    >
                        Save Changes
                    </button>
                </form>
            </section>

            <section className="mb-12 border-t border-zinc-100/10 pt-10">
                <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-6">Theme Settings</h2>
                <div className={`flex items-center justify-between p-6 ${isDarkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'} rounded-[32px] border ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <div>
                        <p className="font-bold">Dark Mode</p>
                        <p className="text-sm opacity-50 font-medium">Switch between light and dark</p>
                    </div>
                    <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-16 h-9 rounded-full relative transition-all duration-500 ${isDarkMode ? 'bg-blue-600' : 'bg-zinc-300'}`}
                    >
                        <div className={`absolute top-1.5 w-6 h-6 bg-white rounded-full transition-all duration-500 shadow-md ${isDarkMode ? 'left-8' : 'left-1.5'}`} />
                    </button>
                </div>
            </section>

            <section className="border-t border-zinc-100/10 pt-10 pb-4">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-[13px]">
                        <span className="opacity-40 font-medium">Version</span>
                        <span className="font-bold tracking-wider">1.4.2-final</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                        <span className="opacity-40 font-medium">Theme</span>
                        <span className={`font-bold px-3 py-1 rounded-full text-[10px] uppercase ${isDarkMode ? 'bg-zinc-800 text-blue-400' : 'bg-zinc-100 text-zinc-600'}`}>
                            {isDarkMode ? 'Dark' : 'Light'}
                        </span>
                    </div>
                </div>
            </section>
        </div>
      </div>
    </div>
  )
}

export default Settings
