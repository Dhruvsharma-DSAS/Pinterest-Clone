import React, { useState } from 'react'

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('updates')
  
  const [updates, setUpdates] = useState([
    {
      id: 1,
      type: 'recommendation',
      text: 'New ideas for your board: Vegetarian Recipes',
      images: [
        'https://i.pinimg.com/736x/63/ee/89/63ee89f3e840c57193b8f92fe60ba85d.jpg',
        'https://i.pinimg.com/736x/38/db/e8/38dbe83bb51358c087c496808d6fa94f.jpg',
        'https://i.pinimg.com/1200x/fa/9c/95/fa9c9576c9986702a590b723cdfbbdc5.jpg'
      ],
      time: '2h',
      read: false
    },
    {
      id: 2,
      type: 'user_action',
      text: 'Emma saved your pin to "Chic Decor"',
      image: 'https://i.pinimg.com/1200x/f5/a7/d6/f5a7d628c7e1a3c0a1da92b22cd733dc.jpg',
      time: '5h',
      read: true
    },
    {
      id: 3,
      type: 'recommendation',
      text: 'You might like these "Reading Aesthetic" pins',
      images: [
        'https://i.pinimg.com/736x/a9/a6/f3/a9a6f3c554d9fc2114217cdcdffb65f0.jpg',
        'https://i.pinimg.com/736x/72/9a/13/729a1331da87f1fe02932578d2e12117.jpg'
      ],
      time: '1d',
      read: false
    },
    {
      id: 4,
      type: 'user_action',
      text: 'Someone liked your "Cute Animals" board',
      image: 'https://i.pinimg.com/736x/95/40/b1/9540b1b5148dcb258bcfb7b55d705373.jpg',
      time: '2d',
      read: true
    }
  ])

  const [messages, setMessages] = useState([
    {
      id: 101,
      sender: 'Emma Wilson',
      lastMessage: 'Hey, I loved that decor idea!',
      avatar: 'https://i.pravatar.cc/150?u=emma',
      time: '1d',
      unread: true
    },
    {
      id: 102,
      sender: 'Pinterest Support',
      lastMessage: 'Welcome to your new creative space.',
      avatar: 'https://i.pinimg.com/736x/6e/ad/91/6ead912ceb43c93b8e189d1eb802845f.jpg',
      time: '3d',
      unread: false
    }
  ])

  const markAsRead = (id) => {
    setUpdates(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="w-full h-screen overflow-y-auto bg-white p-6 sm:p-10 scroll-smooth">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-10 mb-12 relative border-b border-zinc-100">
          <button 
            onClick={() => setActiveTab('updates')}
            className={`pb-4 text-lg font-bold transition-all relative ${activeTab === 'updates' ? 'text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            Updates
            {activeTab === 'updates' && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-black rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`pb-4 text-lg font-bold transition-all relative ${activeTab === 'messages' ? 'text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            Messages
            {activeTab === 'messages' && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-black rounded-full" />}
          </button>
        </div>

        {activeTab === 'updates' ? (
          <div className="flex flex-col gap-2">
            {updates.length > 0 ? (
              updates.map((notif) => (
                <div 
                  key={notif.id} 
                  onClick={() => markAsRead(notif.id)}
                  className="flex items-center gap-4 p-4 hover:bg-zinc-50 rounded-[24px] cursor-pointer transition-all group relative"
                >
                  {!notif.read && <div className="absolute left-1 w-2 h-2 bg-blue-600 rounded-full" />}
                  
                  <div className="flex-shrink-0">
                    {notif.images ? (
                      <div className="flex -space-x-6">
                        {notif.images.slice(0, 2).map((img, i) => (
                          <div key={i} className="w-16 h-16 rounded-[20px] border-[3px] border-white overflow-hidden shadow-sm">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-[20px] overflow-hidden shadow-sm">
                        <img src={notif.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-[15px] leading-snug ${notif.read ? 'text-zinc-500' : 'text-black font-semibold'} line-clamp-2`}>
                      {notif.text}
                    </p>
                    <p className="text-[13px] text-zinc-400 mt-1 font-medium">{notif.time}</p>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 rounded-full hover:bg-zinc-200 flex items-center justify-center">
                      <span className="text-zinc-400 font-bold">...</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-400 py-20">No new updates right now.</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-center gap-4 p-4 hover:bg-zinc-50 rounded-[24px] cursor-pointer transition-all group">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <img src={msg.avatar} alt={msg.sender} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`text-[16px] ${msg.unread ? 'font-bold' : 'font-semibold'}`}>{msg.sender}</h4>
                  <p className={`text-[14px] truncate ${msg.unread ? 'text-black font-medium' : 'text-zinc-500'}`}>
                    {msg.lastMessage}
                  </p>
                </div>

                <div className="text-right">
                    <p className="text-[12px] text-zinc-400 font-medium">{msg.time}</p>
                    {msg.unread && <div className="w-2.5 h-2.5 bg-red-600 rounded-full ml-auto mt-1" />}
                </div>
              </div>
            ))}
            
            <div className="mt-8 px-4">
              <button className="w-full bg-zinc-100 hover:bg-zinc-200 text-black font-bold py-3 rounded-full transition-colors active:scale-[0.98]">
                New Message
              </button>
            </div>
          </div>
        )}

        <div className="mt-20 text-center border-t border-zinc-100 pt-10 pb-20">
          <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[2px]">Pinterest Community</p>
        </div>
      </div>
    </div>
  )
}

export default Notifications
