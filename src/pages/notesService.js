// notesService.js
import axios from 'axios';

const token = localStorage.getItem('token');
const config = {
    headers: { 'Authorization': `Bearer ${token}` }
};

export const getNote = async (noteId) => {
    try {
        const response = await axios.get(`/api/notes/${noteId}`, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching note:", error);
        // Handle error appropriately
    }
}

export const updateNote = async (noteId, noteData) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    };

    try {
        const response = await axios.put(`/api/notes/${noteId}`, noteData, config);
        return response.data;
    } catch (error) {
        console.error("Error updating note:", error);
        // Handle error appropriately
    }
};

