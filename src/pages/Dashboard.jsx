import '../index.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import {fetchNotes} from './notesService';
import {fetchUserData} from '../components/userService';
import Note from '../components/Note';
import { get, set } from 'mongoose';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [notes, setNotes] = useState([]);
    const [starredNotes, setStarredNotes] = useState([]);
    const [viewingUpgradeNotification, setViewingUpgradeNotification] = useState(false); // Whether the user is viewing the upgrade notification

    const [currentTab, setCurrentTab] = useState('starredNotes'); // Can be 'starredNotes' or 'recentNotes'


    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const [creatingFolder, setCreatingFolder] = useState(false);

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

    const handleCreateFolder = async (e) => {
        console.log("Creating folder")

        const token = localStorage.getItem('token');
        const config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        };

        const body = {title: e.target[0].value}; // e.target[0] is the input element

        const response = await axios.post('/api/folders', body, config);
        // console.log(response.data);
        const newFolder = response.data;
        const newUserData = { ...userData };
        newUserData.folders.push(newFolder);
        setUserData(newUserData);
    }


    // const getFolderDetails = async (folderId) => {
    //     const token = localStorage.getItem('token');
    //     const config = {
    //         headers: {
    //         'Authorization': `Bearer ${token}`
    //         }
    //     };

    //     const response = await axios.get(`/api/folders/${folderId}`, config);
    //     setFolderData(response.data);
    //     console.log(response.data);
    // }

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchUserData();
            //check for expired token
            if (data.message) {
                window.location = '/login';
            }
            setUserData(data);
            // console.log(data);
        };

        loadData();
        fetchNotes();
    }, []);

    const [folderData, setFolderData] = useState([]);

    // fetch the folder data for each folder
    useEffect(() => {
        const fetchFoldersData = async () => {
            if (userData) {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                const foldersData = await Promise.all(userData.folders.map(async (folder) => {
                    const response = await axios.get(`/api/folders/${folder}`, config);
                    return response.data;
                }));
                setFolderData(foldersData);
            }
        };
    
        fetchFoldersData();
    }, [userData]);

    const handleDeleteFolder = async (folderId) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.delete(`/api/folders/${folderId}`, config);
        // console.log(response.data);

        const newUserData = { ...userData };
        newUserData.folders = newUserData.folders.filter(folder => folder !== folderId);

        setUserData(newUserData);
        showDeleteNotification('Folder deleted successfully');
    };

    const handleNewNote = async () => {
        //check if user is free
        if (userData.accountType === 'Free'){
            //check notes length
            if (userData.notes.length >= 50){
                setViewingUpgradeNotification(true);
            } else {
                window.location = "/notes/new";
            }
        }
        else{
            // window.location = "/notes/new";
            console.log("Creating new note")
        }
    }

    const handleSearch = async () => {
        alert("Search function is currently under development")
    }


    useEffect(() => {
        const fetchStarredNotes = async () => {
            try {
                let userId = userData._id;
                console.log(userId);
                const response = await axios.get(`/api/users/${userId}/starredNotes`);
                setStarredNotes(response.data);
            } catch (error) {
                console.error('Error fetching starred notes:', error);
            }
        };
    
        fetchStarredNotes();
    }, [userData]); // Fetch starred notes when userData changes

    


    if (!userData) {
        return <div>Loading...</div>; // or any other loading state representation
    }

    return (
        <>
        <Header/>
        {viewingUpgradeNotification && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white w-3/4 sm:w-fit rounded-md p-4 gap-2 flex flex-col">
                    <div className="flex justify-between items-center gap-2">
                        <h1 className="text-xl font-bold">Notes Limit Reached</h1>
                        <button
                            className="w-8 h-8 hover:bg-slate-100 rounded-md items-center flex justify-center"
                            onClick={() => setViewingUpgradeNotification(false)}
                        >
                            {/* Close Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 p-1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <p className="text-sm">
                        You have reached the maximum number of notes for a free user. Upgrade to Pro to create unlimited notes.
                    </p>
                    <div className="flex justify-between gap-2">
                        <button
                            className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded
                            flex items-center gap-1"
                            onClick={() => {
                                window.location = '/upgrade';
                            }}
                        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
                        </svg>
                            Upgrade
                            {/* Upgrade Icon */}
                            

                        </button>
                        <button
                            className="bg-slate-100/10 hover:bg-slate-100/20 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setViewingUpgradeNotification(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}


        <div className = "bg-gradient-to-bl from-purple-900 to-blue-900 min-h-screen h-full py-6 sm:py-0"> 
            {showNotification && (
                <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-2 text-center">
                    {notificationMessage}
                </div>
            )}
            {/* Render user data here */}
            <div className = "pt-16 flex items-center justify-between mx-4">
            <h1 className = "text-2xl font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Welcome, {userData.firstName}!</h1>
            
            {/* search bar goes here*/}
            
            
            <button className = "flex items-center bg-slate-100/10 hover:bg-slate-100/20 text-white font-light py-2 px-3 rounded" onClick={() => handleNewNote()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
</svg>
New</button>
        </div>
            {creatingFolder && (
                //center div in the middle of the screen
                <div className = "fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center">
                    <div className = "bg-white rounded-md p-4 gap-2 flex flex-col">
                        <div className = "flex justify-between items-center gap-2">
                        <h1 className = "text-xl font-bold">Create new folder</h1>
                        <button className = "w-8 h-8 hover:bg-slate-100 rounded-md items-center flex justify-center" onClick={() => setCreatingFolder(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
</svg>
</button>
                        </div>
                        <form className = "flex flex-col w-72 gap-2" onSubmit={e => handleCreateFolder(e)}>
                            
                            <input type="text" placeholder="Folder name" className = "border border-gray-300 bg-slate-900/10 p-2 rounded-md w-full" required/>
                            <button type="submit" className = "bg-purple-900 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
                        </form>
                    </div>
                </div>
            )    
            }
            <div className = "flex items-center bg-slate-100/10 rounded-md px-2 m-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-100/80">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                    </svg>
                <input className = "bg-transparent h-auto rounded-md p-1 w-full text-sm focus:outline-none focus:outline-none text-white focus:border-transparent"></input>
                <button onClick = {(e) => {handleSearch()}} className = "bg-transparent hover:bg-slate-100/20 text-white font-bold py-2 px-2 rounded">Search</button>
            </div>

            {/* THIS SECTION IS FOR FOLDERS, AND IS CURRENTLY UNDER DEVELOPMENT */}
            {folderData.length === 0 ? (
                <div className = "w-auto bg-slate-100/10 p-2 rounded-md p-2 m-6">
                    <button onClick = {(e) => setCreatingFolder(true)} className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create a folder</button>
                </div>
            ) : (   
                <div className = "w-auto bg-transparent p-2 m-4 rounded-md">
                    <div className="bg-transparent py-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {folderData.map(folder => (
                        <div key={folder._id} className="group bg-slate-100/10 ring-2 ring-slate-100/20 rounded-md p-2 hover:bg-slate-100/20 hover:ring-slate-100/50 relative">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-slate-100/70">
                                <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zM9 12.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z" clipRule="evenodd" />
                                </svg>

                                    <h1 className="text-slate-100/90 font-semibold">{folder.title}</h1>
                                </div>
                                <div className = "flex items-center gap-2">
                                <button 
                                className="top-2 bg-transparent hover:bg-slate-100/10 text-white rounded hidden group-hover:block"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents triggering the folder's onClick
                                    handleDeleteFolder(folder._id);
                                }}
                            >
                                {/* Trash Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 p-1">
                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                </svg>

                            </button>
                                <p className="text-white/60 text-sm">{folder.notesCount} notes</p>
                                </div>
                            </div>
                            
                        </div>
                    ))}
                    <button onClick = {(e) => setCreatingFolder(true)} className = "flex items-center gap-1 bg-slate-100/20 hover:bg-slate-100/30 w-fit text-white font-semibold py-2 px-4 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white/60">
                        <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V10.5z" clipRule="evenodd" />
                    </svg>New</button>
                    </div>
                </div>
            )}


            {/* <button onClick = {(e) => setCreatingFolder(true)} className = "flex items-center gap-2 bg-slate-100/10 p-2 w-fit rounded-md m-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white/60">
            <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V10.5z" clipRule="evenodd" />
            </svg>
            <h1 className = "text-white/60 text-sm">Create folder</h1>
            </button>

            <div className = "flex flex-row items-center mx-6 gap-4">
            <div className = "flex items-center gap-2 bg-slate-100/30 p-2 w-fit rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white/60">
                <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                </svg>
                <div className = "flex flex-col gap-1">
                <h1 className = "text-white/60 text-sm font-semibold">Folder 1</h1>
                <p className = "text-white/60 text-xs">2 Notes</p>
                </div>
            </div>
            <div className = "flex items-center gap-2 bg-slate-100/30 p-2 w-fit rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white/60">
                <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                </svg>
                <div className = "flex flex-col gap-1">
                <h1 className = "text-white/60 text-sm font-semibold">Folder 2</h1>
                <p className = "text-white/60 text-xs">3 Notes</p>
                </div>
            </div>
            <div className = "flex items-center gap-2 bg-slate-100/30 p-2 w-fit rounded-md  ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white/60">
                <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                </svg>
                <div className = "flex flex-col gap-1">
                <h1 className = "text-white/60 text-sm font-semibold">Folder 3</h1>
                <p className = "text-white/60 text-xs">7 Notes</p>
                </div>
            </div>
            </div> */}


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
                    {/* <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/notes/new"}>Create a note</button>     */}
                    <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/notes/new"}>Create a note</button> 
                </div>
            )}
        <div className = "w-auto bg-slate-100/30 p-2 h-fit mx-6 rounded-md">

            <div className = "flex flex-row sm:w-1/4 bg-transparent rounded-md p-2">
                <button onClick = {(e) => setCurrentTab('starredNotes')} className = {currentTab === 'starredNotes' ? "bg-slate-100/10 rounded-md p-2 w-1/2 hover:bg-slate-100/20" : "bg-transparent rounded-md p-2 w-1/2 hover:bg-slate-100/20"}>
                    <h1 className = "text-white/70 font-semibold">Starred Notes</h1>
                </button>
                <button onClick = {(e) => setCurrentTab('recentNotes')} className = {currentTab === 'recentNotes' ? "bg-slate-100/10 rounded-md p-2 w-1/2 hover:bg-slate-100/20" : "bg-transparent rounded-md p-2 w-1/2 hover:bg-slate-100/20"}>
                    <h1 className = "text-white/70 font-semibold">Recent Notes</h1>
                </button>
                </div>

            {currentTab === 'starredNotes' ? (
                <>
            {userData.starredNotes.length > 0 ? (
                <div className="bg-transparent py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-5 xl:grid-cols-5">
                {starredNotes.map(note => (
                    <Note key={note.id} note={note} showDeleteNotification={showDeleteNotification} fetchNotes={fetchNotes} />
                ))}
                </div>
            ) : (
                <div>
                    <h2 className = "text-xs text-center text-white/60 py-4">No starred notes.</h2>
                </div>
            )}
            </>
            ): (
                <>
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
        </>
            )}
        </div>
        </div>
        </>
    );
};

export default Dashboard;