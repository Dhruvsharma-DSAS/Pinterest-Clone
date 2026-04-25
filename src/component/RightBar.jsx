import React, { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import imageData from '../../imgdata/img data'
import ProfileMenu from './ProfileMenu'
import vegetarian from '../../imgdata/Vegetarian recipes to make on repeat'
import chic from '../../imgdata/Chic decor ideas inspired by animal prints'
import secondhand from '../../imgdata/Secondhand glow ups'
import reading from '../../imgdata/Reading aesthetic'
import cute from '../../imgdata/How to draw cute animals'
import good from '../../imgdata/Good things are happening'

const RightBar = ({ onPinClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [displayImages, setDisplayImages] = useState([]);

  const suggestions = [
    { text: 'Vegetarian recipes', data: vegetarian },
    { text: 'Chic decor', data: chic },
    { text: 'Secondhand glow ups', data: secondhand },
    { text: 'Reading aesthetic', data: reading },
    { text: 'Cute animals', data: cute },
    { text: 'Good things', data: good }
  ];

  const initialImages = useMemo(() => {
    return [...imageData].sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn');
    if (status === 'true') {
      setIsLoggedIn(true);
    }
    setDisplayImages(initialImages);

    const timer = setTimeout(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [initialImages]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setDisplayImages(initialImages);
      return;
    }

    const matchedSuggestion = suggestions.find(s => 
      s.text.toLowerCase().includes(query.toLowerCase())
    );

    if (matchedSuggestion) {
      setDisplayImages(matchedSuggestion.data);
    } else {
      setDisplayImages([...initialImages].sort(() => Math.random() - 0.5).slice(0, 15));
    }
    setShowSuggestions(false);
  };

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

  return (
    <div className="w-full h-screen overflow-y-auto p-4 relative theme-bg transition-colors duration-300">
      {showNotification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
            <div className="bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-zinc-700">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                    <img src="https://i.pinimg.com/736x/63/ee/89/63ee89f3e840c57193b8f92fe60ba85d.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold">New ideas waiting for you!</span>
            </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8 sticky top-0 theme-header z-50 py-2 transition-colors">
        <div className="flex-1 relative">
            <div className="theme-input rounded-full flex items-center px-4 py-2.5 shadow-sm border theme-border focus-within:ring-2 ring-zinc-200 transition-all">
                <span className="text-gray-500 mr-2">🔍</span>
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    placeholder="Search for ideas..." 
                    className="bg-transparent border-none outline-none w-full text-sm theme-text placeholder-zinc-500 font-medium"
                />
                {searchQuery && (
                    <button onClick={() => {setSearchQuery(''); setDisplayImages(initialImages);}} className="text-zinc-400 hover:text-zinc-600 px-2">✕</button>
                )}
            </div>

            {showSuggestions && (
                <div className="absolute top-full left-0 w-full mt-2 theme-bg border theme-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4">
                        <p className="text-xs font-black text-zinc-400 mb-3 uppercase tracking-widest px-2">Suggestions</p>
                        <div className="grid grid-cols-1 gap-1">
                            {suggestions.map((s, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleSearch(s.text)}
                                    className="flex items-center gap-3 p-3 hover:theme-input rounded-xl transition-all text-left w-full group"
                                >
                                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                        <img src={s.data[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                                    </div>
                                    <span className="theme-text font-bold text-sm">{s.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 text-center border-t theme-border">
                        <p className="text-[10px] text-zinc-500 font-bold">Press Enter to search globally</p>
                    </div>
                </div>
            )}
        </div>

        <div className="flex gap-4 font-semibold text-sm items-center">
          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-[#e60023] px-6 py-2.5 text-white font-bold hover:bg-[#ad081b] transition-colors shadow-lg"
            >
              Log in
            </Link>
          )}
        </div>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 pb-20">
        {displayImages.map((src, index) => (
          <div 
            key={index} 
            onClick={() => onPinClick(src)}
            className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative shadow-sm hover:shadow-xl transition-all duration-300 animate-in fade-in zoom-in-95 duration-500"
          >
            <img 
              src={src} 
              alt={`Pin ${index}`} 
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
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

      {showSuggestions && (
          <div 
            className="fixed inset-0 z-40 bg-black/5" 
            onClick={() => setShowSuggestions(false)}
          />
      )}
    </div>
  )
}

export default RightBar
