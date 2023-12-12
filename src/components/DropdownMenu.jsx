import React, { useState, useEffect, useRef } from 'react';

const DropdownMenu = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location = "/login";
};

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div onClick={toggleDropdown} className="cursor-pointer">
        {/* User SVG Icon Here */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 fill-slate-100/70">
          <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
        </svg>
        {/* {userData && <p className="text-slate-100/60 text-md font-semibold">{userData.firstName}</p>} */}
      </div>
      {isOpen && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* Dropdown items here */}
          {userData ? (
            <>
          <p className="justify-between flex block px-4 py-2 text-sm text-purple-900 font-bold hover:bg-gray-100 hover:rounded-md">{userData.accountType}<span className = "font-light">Change</span></p>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md">Account Settings</a>
          <div className = "flex flex-row items-center text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md w-full justify-between pr-4">
            <a href="/forum" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md">User Forums</a>
            <p className = "text-black text-xs font-semibold">0 New Posts</p>
          </div>
          <p onClick={logout} className="hover:cursor-pointer justify-between flex block px-4 py-2 text-sm text-purple-900 font-bold hover:bg-gray-100 hover:rounded-md">Sign Out</p>
          </>
            ) : (
            <p className="justify-between flex block px-4 py-2 text-sm text-purple-900 font-bold hover:bg-gray-100 hover:rounded-md">Sign In</p>
            )}
          {/* ... other links ... */}

        </div>
            
      )}


    </div>
  );
};

export default DropdownMenu;
