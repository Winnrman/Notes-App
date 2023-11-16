import '../index.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored with the key 'token'
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.get('/api/user/data', config); // Adjust the endpoint as necessary
            return response.data;
        } catch (error) {
            console.error("Error fetching user data", error);
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
            {/* Render user data here */}
            <h1 className = "text-2xl font-bold">Welcome, {userData.firstName}!</h1>

            {userData.notes.length > 0 ? (
                <div>
                    <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/notes/new"}>Create a note</button>
                    <h2 className = "text-xl font-semibold">Your Notes</h2>
                    <ul>
                        {notes.map(note => (
                            <div key={note._id} className = "border-2 border-blue-500 rounded-md p-2 w-96 text-sm">
                                <h3 className = "font-semibold text-xl">{note.title}</h3>
                                <p className = "text-sm font-light text-gray-500">{note.content}</p>
                                <div className = "bg-slate-100 p-2">
                                    <p className = "text-xs">{note.dateCreated}</p>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>You have no notes yet!</h2>
                    <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/notes/new"}>Create a note</button>    
                </div>
            )}

        <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;