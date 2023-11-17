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

    const logout = () => {
        localStorage.removeItem('token');
        window.location = "/login";
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
            console.log(response.data); //these are objects in an array
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
        <div>
            <Header/>
            {/* Render user data here */}
            <div className = "pt-16 flex items-center justify-between m-4">
            <h1 className = "text-2xl font-bold">Welcome, {userData.firstName}!</h1>
            <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/notes/new"}>Create a note</button>
        </div>

            {userData.notes.length > 0 ? (
                <div className = "w-full bg-slate-200 p-2 m-4 rounded-md">
                    <h2 className = "text-xl font-semibold">Your Notes</h2>
                    <ul className = "bg-slate-200 p-2 flex gap-2">
                        {notes.map(note => (
                            <Note note = {note}></Note>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>You have no notes yet!</h2>
                    <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/notes/new"}>Create a note</button>    
                </div>
            )}
        <div className = "w-auto bg-slate-300 p-2 m-4 rounded-md">
            <h1 className = "text-xl font-semibold">Starred Notes</h1>
            {userData.starredNotes.length > 0 ? (
                <ul>
                    {userData.starredNotes.map(note => (
                        <Note note = {note}></Note>
                    ))}
                </ul>
            ) : (
                <div>
                    <h2 className = "text-xs text-center">No starred notes.</h2>
                </div>
            )}
        </div>

        <div className = "w-full bg-slate-200 p-2">
            <h1 className = "text-xl font-semibold">Recent Notes</h1>
            {/* show the 5 most recent notes */}
            {userData.notes.length > 0 ? (
                <ul className = "bg-slate-200 p-2 flex gap-2">
                    {notes.slice(0,5).map(note => (
                        <Note note = {note}></Note>
                    ))} 
                </ul>
            ) : (
                <div>
                    <h2 className = "text-xs text-center">No recent notes.</h2>
                </div>
            )}
        </div>

        <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;