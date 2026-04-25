import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ProfileMenu from './ProfileMenu'

// Import data for cover images
import vegetarianData from '../../imgdata/Vegetarian recipes to make on repeat'
import chicData from '../../imgdata/Chic decor ideas inspired by animal prints'
import secondhandData from '../../imgdata/Secondhand glow ups'
import readingData from '../../imgdata/Reading aesthetic'
import cuteData from '../../imgdata/How to draw cute animals'
import goodData from '../../imgdata/Good things are happening'

const Explore = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  React.useEffect(() => {
    const status = localStorage.getItem('isLoggedIn')
    if (status === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const exploreItems = [
    {
      id: 1,
      slug: 'vegetarian-recipes',
      title: 'Vegetarian recipes to make on repeat',
      subtitle: 'On the menu',
      image: vegetarianData[0]
    },
    {
      id: 2,
      slug: 'chic-decor',
      title: 'Chic decor ideas inspired by animal prints',
      subtitle: 'Statement pieces',
      image: chicData[0]
    },
    {
      id: 3,
      slug: 'secondhand-glow-ups',
      title: 'Secondhand glow ups',
      subtitle: 'Thrift it',
      image: secondhandData[0]
    },
    {
      id: 4,
      slug: 'reading-aesthetic',
      title: 'Reading aesthetic',
      subtitle: 'For the love of books',
      image: readingData[0]
    },
    {
      id: 5,
      slug: 'cute-animals',
      title: 'How to draw cute animals',
      subtitle: 'Aww-dorable art',
      image: cuteData[0]
    },
    {
      id: 6,
      slug: 'good-things',
      title: 'Good things are happening',
      subtitle: 'All about hopecore',
      image: goodData[0]
    }
  ]

  return (
    <div className="w-full h-screen overflow-y-auto bg-white dark:bg-[#111111] p-8 scroll-smooth transition-colors duration-300">
      {/* Search Header */}
      <div className="flex items-center gap-4 mb-12 max-w-5xl mx-auto sticky top-0 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md z-20 py-4 transition-colors">
        <div className="flex-1 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center px-4 py-3 border border-transparent focus-within:border-blue-400 transition-all">
          <span className="text-gray-500 mr-2 text-xl">🔍</span>
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none w-full text-lg dark:text-white"
          />
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-[#e60023] px-5 py-2.5 text-white font-bold hover:bg-[#ad081b] transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight dark:text-white transition-colors">Stay inspired</h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
        {exploreItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => navigate(`/explore/${item.slug}`)}
            className="relative h-[550px] rounded-[40px] overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
              <p className="text-base font-bold mb-2 uppercase tracking-widest opacity-90">{item.subtitle}</p>
              <h2 className="text-3xl md:text-4xl font-black leading-[1.1] max-w-[80%] drop-shadow-md">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explore
