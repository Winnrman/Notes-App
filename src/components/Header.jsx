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
                <DropdownMenu userData={userData} />
            </div>
        </div>
    )
}

export default Header