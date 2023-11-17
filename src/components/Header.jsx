import { fetchUserData } from "./userService";
import React, { useEffect, useState } from 'react';

const Header = () => {
    const [userData, setUserData] = useState(null);


useEffect(() => {
    const loadData = async () => {
        const data = await fetchUserData();
        setUserData(data);
    };

    loadData();
},[]);

    return (
        <div className = "fixed flex w-screen p-4 bg-transparent justify-between">
            <h1 className = "font-bold text-2xl text-blue-500">Notes App</h1>
            <div className = "flex flex-row items-center gap-1">
            {userData && <p className = "text-slate-900 text-sm font-semibold">{userData.firstName}</p>}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 fill-blue-500">
            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
            </div>

        </div>
    )
}

export default Header