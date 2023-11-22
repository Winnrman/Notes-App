// notesService.js
import axios from 'axios';

// Function to get the auth config
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { 'Authorization': `Bearer ${token}` }
  };
};

export const getNote = async (noteId) => {
    try {
        const response = await axios.get(`/api/notes/${noteId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching note:", error);
        // Handle or throw error appropriately
    }
};

export const handleNewNote = (userData, setViewingUpgradeNotification, folderId) => {
    if (userData.accountType === 'Free' && userData.notes.length >= 50) {
        setViewingUpgradeNotification(true);
    } else {
        // Redirect to the new note creation page with the folderId as a query parameter
        if(folderId === undefined) {
            window.location = "/notes/new";
            return;
        }
        window.location = `/notes/new?folderId=${folderId}`;
    }
};



export const updateNote = async (noteId, noteData) => {
    try {
        const response = await axios.put(`/api/notes/${noteId}`, noteData, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error updating note:", error);
        // Handle or throw error appropriately
    }
};

// This function should be moved to a React component
export const fetchNotes = async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios.get('/api/user/notes', config);
        //the response in an array full of objects
        return response.data;
        // console.log(response.data); //these are objects in an array
    } catch (error) {
        console.error(error);
        // Handle errors, e.g., redirect to login if token is invalid or expired
    }
};
