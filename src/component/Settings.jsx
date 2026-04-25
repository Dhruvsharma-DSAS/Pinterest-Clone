import React, { useState, useEffect } from 'react'

const Settings = () => {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    username: ''
  })
  const [isDarkMode, setIsDarkMode] = useState(false)
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
    
    // Update current user
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    // Update in users array too
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    
    setUser(updatedUser)
    setMessage('Profile updated successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="w-full h-screen overflow-y-auto bg-white p-6 sm:p-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">Settings</h1>

        {message && (
            <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-2xl font-bold text-center border border-green-100 animate-pulse">
                {message}
            </div>
        )}

        <section className="mb-12">
            <h2 className="text-lg font-bold mb-6">Public Profile</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-600 ml-1">Name</label>
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-12 bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-4 focus:border-black focus:bg-white outline-none transition-all"
                        placeholder="Your Name"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-600 ml-1">Username</label>
                    <input 
                        type="text" 
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        className="w-full h-12 bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-4 focus:border-black focus:bg-white outline-none transition-all"
                        placeholder="@username"
                    />
                </div>
                <button 
                    type="submit"
                    className="bg-[#e60023] text-white px-8 py-3 rounded-full font-bold hover:bg-[#ad081b] transition-all active:scale-95 shadow-md"
                >
                    Save Changes
                </button>
            </form>
        </section>

        <section className="mb-12 border-t border-zinc-100 pt-10">
            <h2 className="text-lg font-bold mb-6">Account Management</h2>
            <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-3xl">
                <div>
                    <p className="font-bold">Dark Mode</p>
                    <p className="text-sm text-zinc-500">Adjust the interface colors</p>
                </div>
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`w-14 h-8 rounded-full relative transition-all duration-300 ${isDarkMode ? 'bg-black' : 'bg-zinc-200'}`}
                >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${isDarkMode ? 'left-7' : 'left-1 shadow-md'}`} />
                </button>
            </div>
        </section>

        <section className="mb-20 border-t border-zinc-100 pt-10">
            <h2 className="text-lg font-bold mb-6">About</h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Version</span>
                    <span className="font-bold">1.2.0-human-crafted</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Build</span>
                    <span className="font-bold">Production</span>
                </div>
            </div>
        </section>
      </div>
    </div>
  )
}

export default Settings
