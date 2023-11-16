import React, { useState } from 'react';
import axios from 'axios';

function NewNote() {
    const [noteData, setNoteData] = useState({
        title: '',
        content: ''
        // Add other fields as necessary
    });

    const { title, content } = noteData;

    const onChange = e => {
        setNoteData({ ...noteData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            const body = JSON.stringify(noteData);
            const response = await axios.post('/api/freeNotes', body, config);
            // Handle successful creation (e.g., redirecting to dashboard or a specific note page)
            // console.log(response.data);
            window.location = "/dashboard";
        } catch (error) {
            console.error(error);
            // Handle errors, e.g., displaying error messages
        }
    }

    return (
        <div>
            <h2>Create New Note</h2>
            <form className = "flex flex-col" onSubmit={onSubmit}>
                <div className = "flex flex-col gap-2">
                    <label>Title</label>
                    <input className = "ring-2 ring-blue-500 rounded-md p-2 w-96 text-sm"
                        type="text"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className = "flex flex-col gap-2"> 
                    <label>Content</label>
                    <textarea className = "ring-2 ring-blue-500 rounded-md p-2 w-96 text-sm"
                        name="content"
                        value={content}
                        onChange={onChange}
                        required
                    />
                </div>
                <button className = "bg-blue-500 w-96 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Create</button>
            </form>
        </div>
    );
}

export default NewNote;
