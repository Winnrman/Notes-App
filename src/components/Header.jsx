import DropdownMenu from "./DropdownMenu";
import { fetchUserData } from "./userService";
import React, { useEffect, useState } from 'react';

const Header = () => {
    const [userData, setUserData] = useState(null);

const handleClick = () => {
    window.location = "/";
}

useEffect(() => {
    const loadData = async () => {
        const data = await fetchUserData();
        setUserData(data);
    };

    window.addEventListener('scroll', handleScroll);
    loadData();

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };

},[]);
    const [opacity, setOpacity] = useState(0);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const newOpacity = Math.min(scrollY / 300, 1); // Adjust the denominator as needed
        setOpacity(newOpacity);
    };

    useEffect(() => {
        
    }, []);

    return (
        <div style={{ background: `rgba(90, 11, 163, ${opacity})` }} className="fixed flex w-screen p-4 justify-between">
            <h1 onClick = {handleClick} className = "hover:cursor-pointer font-bold flex gap-2 items-center text-2xl text-slate-100/60"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-slate-100/60">
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
            Noteify</h1>
            <div className = "flex flex-row items-center gap-1">
                {userData && <p className = "text-slate-100/60 text-md font-semibold">{userData.firstName}</p>}
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 fill-blue-500">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg> */}
                <DropdownMenu userData={userData} />
            </div>
        </div>
    )
}

export default Header