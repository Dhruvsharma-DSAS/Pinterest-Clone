import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProfileMenu from './ProfileMenu'
import vegetarian from '../../imgdata/Vegetarian recipes to make on repeat'
import chic from '../../imgdata/Chic decor ideas inspired by animal prints'
import secondhand from '../../imgdata/Secondhand glow ups'
import reading from '../../imgdata/Reading aesthetic'
import cute from '../../imgdata/How to draw cute animals'
import good from '../../imgdata/Good things are happening'

const categoryData = {
  'vegetarian-recipes': { title: 'Vegetarian recipes to make on repeat', data: vegetarian },
  'chic-decor': { title: 'Chic decor ideas inspired by animal prints', data: chic },
  'secondhand-glow-ups': { title: 'Secondhand glow ups', data: secondhand },
  'reading-aesthetic': { title: 'Reading aesthetic', data: reading },
  'cute-animals': { title: 'How to draw cute animals', data: cute },
  'good-things': { title: 'Good things are happening', data: good }
}

const ExploreCategory = ({ onPinClick }) => {
  const { categoryId } = useParams()
  const category = categoryData[categoryId]
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn')
    if (status === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const handleSave = (e, src) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem('savedPins') || '[]');
    if (!saved.includes(src)) {
        saved.push(src);
        localStorage.setItem('savedPins', JSON.stringify(saved));
        alert('Saved to your board!');
    } else {
        alert('Already saved!');
    }
  };

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center h-screen theme-bg theme-text">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <Link to="/explore" className="text-blue-500 hover:underline">Back to Explore</Link>
      </div>
    )
  }

  const images = category.data || []

  return (
    <div className="w-full h-screen overflow-y-auto theme-bg p-8 transition-colors duration-300">
      <div className="flex items-center justify-between mb-12 sticky top-0 theme-header z-20 py-4 transition-colors">
        <div className="flex items-center gap-6">
            <Link to="/explore" className="p-2 hover:theme-input rounded-full transition-colors theme-text">
            <span className="text-2xl">←</span>
            </Link>
            <h1 className="text-3xl font-black theme-text transition-colors">{category.title}</h1>
        </div>
        <div className="flex items-center gap-4">
            {isLoggedIn ? (
                <ProfileMenu />
            ) : (
                <Link
                    to="/login"
                    className="rounded-full bg-[#e60023] px-5 py-2.5 text-white font-bold hover:bg-[#ad081b] transition-colors shadow-lg"
                >
                    Log in
                </Link>
            )}
        </div>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 pb-20">
        {images.map((src, index) => (
          <div 
            key={index} 
            onClick={() => onPinClick(src)}
            className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img 
              src={src} 
              alt={`${category.title} ${index}`} 
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
              <div className="flex justify-end">
                <button 
                    onClick={(e) => handleSave(e, src)}
                    className="bg-red-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-red-700 transition-colors shadow-lg active:scale-95"
                >
                    Save
                </button>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors">
                  <span className="text-xs">↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExploreCategory
