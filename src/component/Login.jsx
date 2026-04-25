import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import images from '../../imgdata/img data.js';
import pinterestLogo from '../assets/icons/Pinterest.png';

const Login = () => {
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const bgImages = images.slice(0, 24);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      setError('No accounts found. Time to create one!');
      return;
    }

    const matchedUser = users.find(u => 
      (identifier === u.email || identifier === u.username) && password === u.password
    );
    
    if (matchedUser) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(matchedUser));
      alert('Success! Getting your boards ready...');
      navigate('/');
    } else {
      setError('Hmm, that doesn\'t match our records. Try again?');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white font-sans selection:bg-[#ff8a8a] selection:text-white">
      <div className="absolute inset-0 z-0 grid grid-cols-2 opacity-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {bgImages.map((src, index) => (
          <div key={index} className="h-64 w-full p-1">
            <img 
              src={src} 
              alt="" 
              className="h-full w-full rounded-xl object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/90 via-white/40 to-white/90" />

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/60 backdrop-blur-xl md:px-12">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-md overflow-hidden">
                <img src={pinterestLogo} alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#e60023]">
              Pinterest
            </span>
          </Link>
        </div>
      </header>

      <main className="relative z-20 flex min-h-screen items-center justify-center px-4 pt-20 pb-10">
        <div className="mx-auto flex w-full max-w-[480px] flex-col items-center">
          <div className="w-full overflow-hidden rounded-[32px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] md:p-10">
            <div className="flex flex-col items-center">
              <div className="mb-6 h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-inner overflow-hidden">
                <img src={pinterestLogo} alt="Logo" className="w-10 h-10 object-contain" />
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight text-[#111111]">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Log in to see your saved ideas
              </p>

              {error && <p className="mt-4 text-xs font-bold text-red-500 text-center">{error}</p>}

              <form className="mt-8 w-full space-y-3" onSubmit={handleLogin}>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 ml-1">Email or Username</label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Email or @username"
                    className="h-11 w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-4 text-sm transition-all focus:border-[#e60023] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#e60023]/5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 ml-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-11 w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-4 text-sm transition-all focus:border-[#e60023] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#e60023]/5"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-[#e60023] text-sm font-bold text-white transition-all hover:bg-[#ad081b] active:scale-[0.98]"
                >
                  Log In
                </button>
              </form>

              <div className="relative my-6 w-full text-center">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
              </div>

              <div className="w-full text-center space-y-4">
                <p className='text-xs text-gray-500 px-4'>
                  This project is for educational purposes. Feel free to explore the UI and authentication flow!
                </p>
                
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-600">
                    Not on Pinterest yet?{' '}
                    <Link to="/signup" className="font-bold text-[#2787b3] hover:underline">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
