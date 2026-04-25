import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        const savedCurrentUser = localStorage.getItem('user');
        const savedAllUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (savedCurrentUser) {
            setCurrentUser(JSON.parse(savedCurrentUser));
        }
        setAllUsers(savedAllUsers);

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSwitchAccount = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        setCurrentUser(user);
        setIsOpen(false);
        window.location.reload();
    };

    const handleAddAccount = () => {
        navigate('/login');
        setIsOpen(false);
    };

    if (!currentUser) return null;

    const firstLetter = currentUser.username ? currentUser.username.charAt(0).toUpperCase() : '?';
    const otherUsers = allUsers.filter(u => u.email !== currentUser.email);

    return (
        <div className="relative" ref={menuRef}>
            {/* Profile Circle */}
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition-colors shadow-sm"
            >
                <span className="text-white font-bold text-lg">{firstLetter}</span>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className={`absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] py-4 z-[100] border overflow-hidden transition-all duration-300`}>
                    <div className="px-4 mb-4">
                        <p className="text-xs text-gray-500 mb-2">Currently in</p>
                        <div className={`flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-zinc-800/50`}>
                            <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-2xl">{firstLetter}</span>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between">
                                    <p className={`font-bold text-black dark:text-white text-lg leading-tight truncate`}>{currentUser.username}</p>
                                    <span className={`text-black dark:text-white text-xl`}>✓</span>
                                </div>
                                <p className="text-sm text-gray-500">Personal</p>
                                <p className="text-sm text-gray-500 break-all truncate">{currentUser.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-2">
                        <p className="px-4 text-xs font-bold text-gray-600 mb-2">Your accounts</p>
                        
                        {/* List other accounts */}
                        {otherUsers.map((user, index) => (
                            <div 
                                key={index}
                                onClick={() => handleSwitchAccount(user)}
                                className={`flex items-center gap-3 p-2 mx-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors`}
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-lg">{user.username.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className={`font-bold text-sm text-black dark:text-white truncate`}>{user.username}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>
                        ))}

                        <button 
                            onClick={handleAddAccount}
                            className={`w-full text-left px-4 py-2.5 font-bold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors mt-1`}
                        >
                            Add Pinterest account
                        </button>
                        <button 
                            onClick={handleLogout}
                            className={`w-full text-left px-4 py-2.5 font-bold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors mt-1`}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
