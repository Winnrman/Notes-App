import '../index.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import {fetchNotes} from './notesService';
import {fetchUserData} from '../components/userService';
import Note from '../components/Note';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [notes, setNotes] = useState([]);

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const showDeleteNotification = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 1500); // Hides the notification after 1.5 seconds
    };

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.get('/api/user/notes', config);
            //the response in an array full of objects
            setNotes(response.data);
            // console.log(response.data); //these are objects in an array
        } catch (error) {
            console.error(error);
            // Handle errors, e.g., redirect to login if token is invalid or expired
        }
    };


    useEffect(() => {
        const loadData = async () => {
            const data = await fetchUserData();
            setUserData(data);
            // console.log(data);
        };

        loadData();
        fetchNotes();
    }, []);

    if (!userData) {
        return <div>Loading...</div>; // or any other loading state representation
    }

    

    return (
        <>
        <Header/>
        <div className = "bg-gradient-to-bl from-purple-900 to-blue-900 min-h-screen sm:h-screen"> 
            {showNotification && (
                <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-2 text-center">
                    {notificationMessage}
                </div>
            )}
            {/* Render user data here */}
            <div className = "pt-16 flex items-center justify-between mx-4">
            <h1 className = "text-2xl font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Welcome, {userData.firstName}!</h1>
            <button className = "flex items-center bg-slate-100/10 hover:bg-slate-100/20 text-white font-light py-2 px-3 rounded" onClick={() => window.location = "/notes/new"}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
</svg>
New</button>
        </div>

            {userData.notes.length > 0 ? (
                <div className = "w-full bg-transparent p-2 rounded-md">
                    {/* <h2 className = "text-xl font-semibold text-white">Your Notes</h2> */}
                    <div className="bg-transparent py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {notes.map(note => (
                        <Note key={note.id} note={note} showDeleteNotification={showDeleteNotification} fetchNotes={fetchNotes} />
                    ))}
</div>

                </div>
            ) : (
                <div>
                    <h2>You have no notes yet!</h2>
                    <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/notes/new"}>Create a note</button>    
                </div>
            )}
        <div className = "w-auto bg-slate-100/30 p-2 h-32 mx-6 rounded-md">
            <h1 className = "flex items-center gap-1 text-xl font-semibold text-white/80"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>Starred Notes</h1>
            {userData.starredNotes.length > 0 ? (
                <ul>
                    {userData.starredNotes.map(note => (
                        <Note note = {note}></Note>
                    ))}
                </ul>
            ) : (
                <div>
                    <h2 className = "text-xs text-center text-white/60 py-4">No starred notes.</h2>
                </div>
            )}
        </div>

        <div className = "w-auto rounded-md bg-slate-100/10 m-6 py-2">
            <h1 className = "flex items-center text-xl font-semibold text-white/70 px-4 gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
</svg>
Recent Notes</h1>
            {/* show the 5 most recent notes */}
            {userData.notes.length > 0 ? (
                // <div className = "rounded-md flex flex-col sm:flex-row">
                //     {notes.slice(0,5).map(note => (
                //         <Note note = {note}></Note>
                //     ))} 
                // </div>

                <div className="bg-transparent py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-5 xl:grid-cols-5">
                {notes.slice(0,5).map(note => (
                    <Note key={note.id} note={note} showDeleteNotification={showDeleteNotification} fetchNotes={fetchNotes} />
                ))}
                </div>
            ) : (
                <div>
                    <h2 className = "text-xs text-center">No recent notes.</h2>
                </div>
            )}
        </div>

        </div>
        </>
    );
};

export default Dashboard;