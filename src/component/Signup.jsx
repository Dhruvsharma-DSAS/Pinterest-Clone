import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import images from '../../imgdata/img data.js';
import pinterestLogo from '../assets/icons/Pinterest.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    birthdate: '',
    gender: '',
    location: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const bgImages = images.slice(0, 24);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, username, email, password, birthdate, gender, location } = formData;

    if (!name || !username || !email || !password || !birthdate || !gender || !location) {
      setError('Every detail counts! Please fill in everything.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email || u.username === username)) {
      setError('This email or username is already taken!');
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    alert(`Welcome aboard, ${name}! Your demo account is ready.`);
    navigate('/login');
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
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
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
                Join the Community
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Explore, Create, and Inspire
              </p>

              {error && <p className="mt-4 text-xs font-bold text-red-500">{error}</p>}

              <form className="mt-8 w-full space-y-3" onSubmit={handleSignup}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 ml-1">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="h-11 w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-4 text-sm transition-all focus:border-[#e60023] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#e60023]/5"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 ml-1">Username</label>
                    <input
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="@userid"
                      className="h-11 w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-4 text-sm transition-all focus:border-[#e60023] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#e60023]/5"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 ml-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="h-11 w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-4 text-sm transition-all focus:border-[#e60023] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#e60023]/5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 ml-1">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className="h-11 w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-4 text-sm transition-all focus:border-[#e60023] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#e60023]/5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 ml-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender || ''}
                      onChange={handleInputChange}
                      className="h-11 w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-4 text-sm transition-all focus:border-[#e60023] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#e60023]/5"
                    >
                      <option value="" disabled>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 ml-1">Location</label>
                    <input
                      name="location"
                      type="text"
                      value={formData.location || ''}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="h-11 w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-4 text-sm transition-all focus:border-[#e60023] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#e60023]/5"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 ml-1">Birthdate</label>
                  <input
                    name="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    className="h-11 w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-4 text-sm transition-all focus:border-[#e60023] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#e60023]/5"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-[#e60023] text-sm font-bold text-white transition-all hover:bg-[#ad081b] active:scale-[0.98]"
                >
                  Create Account
                </button>
              </form>

              <div className="relative my-6 w-full text-center">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <span className="relative bg-white px-3 text-[10px] font-black text-gray-400">OR</span>
              </div>

              <div className="w-full text-center space-y-4">
                <p className='text-xs text-gray-500 px-4'>
                  This is a project demonstration. No data is shared with third parties. Join us for the experience!
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500">
                    Already have a vibe?{' '}
                    <Link to="/login" className="font-bold text-[#111111] hover:underline">
                      Log in
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

export default Signup;
