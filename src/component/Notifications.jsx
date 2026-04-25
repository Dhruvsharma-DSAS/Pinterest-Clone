import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Notifications = () => {
  const navigate = useNavigate()
  
  const [updates, setUpdates] = useState([
    {
      id: 1,
      slug: 'vegetarian-recipes',
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
      slug: 'chic-decor',
      type: 'user_action',
      text: 'Emma saved your pin to "Chic Decor"',
      image: 'https://i.pinimg.com/1200x/f5/a7/d6/f5a7d628c7e1a3c0a1da92b22cd733dc.jpg',
      time: '5h',
      read: true
    },
    {
      id: 3,
      slug: 'reading-aesthetic',
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
      slug: 'cute-animals',
      type: 'user_action',
      text: 'Someone liked your "Cute Animals" board',
      image: 'https://i.pinimg.com/736x/95/40/b1/9540b1b5148dcb258bcfb7b55d705373.jpg',
      time: '2d',
      read: true
    },
    {
      id: 5,
      slug: 'secondhand-glow-ups',
      type: 'recommendation',
      text: 'Because you saved "Glow ups", check these out',
      images: [
        'https://i.pinimg.com/736x/63/ee/89/63ee89f3e840c57193b8f92fe60ba85d.jpg',
        'https://i.pinimg.com/736x/96/52/92/965292c83e93599aa12f93a0b42a1029.jpg'
      ],
      time: '3d',
      read: true
    }
  ])

  const handleNotificationClick = (notif) => {
    setUpdates(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))
    if (notif.slug) {
      navigate(`/explore/${notif.slug}`)
    }
  }

  return (
    <div className="w-full h-screen overflow-y-auto bg-white dark:bg-[#111111] p-6 sm:p-10 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-12 text-center">
            <h1 className="text-2xl font-bold border-b-2 border-black dark:border-white dark:text-white inline-block pb-1 px-4 transition-colors">Updates</h1>
        </div>

        <div className="flex flex-col gap-2">
            {updates.length > 0 ? (
                updates.map((notif) => (
                <div 
                    key={notif.id} 
                    onClick={() => handleNotificationClick(notif)}
                    className={`flex items-center gap-4 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-[24px] cursor-pointer transition-all group relative`}
                >
                    {!notif.read && <div className="absolute left-1 w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)]" />}
                    
                    <div className="flex-shrink-0">
                    {notif.images ? (
                        <div className="flex -space-x-6">
                        {notif.images.slice(0, 2).map((img, i) => (
                            <div key={i} className={`w-16 h-16 rounded-[20px] border-[3px] ${notif.read ? 'border-zinc-100 dark:border-zinc-800' : 'border-white dark:border-zinc-700'} overflow-hidden shadow-sm transition-colors`}>
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
                    <p className={`text-[15px] leading-snug ${notif.read ? 'text-zinc-400 dark:text-zinc-500' : 'text-black dark:text-zinc-100 font-semibold'} line-clamp-2 transition-colors`}>
                        {notif.text}
                    </p>
                    <p className="text-[13px] text-zinc-400 mt-1 font-medium">{notif.time}</p>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center dark:text-white">
                            <span className="font-bold">...</span>
                        </button>
                    </div>
                </div>
                ))
            ) : (
                <div className="py-20 text-center">
                    <p className="text-xl font-bold text-zinc-300 dark:text-zinc-700">You're all caught up!</p>
                </div>
            )}
        </div>

        <div className="mt-20 text-center border-t border-zinc-100 dark:border-zinc-800/50 pt-10 pb-20">
          <p className="text-[11px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[2px]">Pinterest Community</p>
        </div>
      </div>
    </div>
  )
}

export default Notifications
