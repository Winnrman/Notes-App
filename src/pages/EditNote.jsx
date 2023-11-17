import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getNote, updateNote } from './notesService'; // Assuming you've created a notesService file

const EditNote = () => {
    const [noteData, setNoteData] = useState({ title: '', content: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const noteId = window.location.pathname.split('/')[3]; // Assuming the ID is in the URL
    // console.log(noteId);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getNote(noteId);
                setNoteData(data);
            } catch (error) {
                setErrorMessage('Error fetching note data.');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        // console.log(noteId);
        fetchData();
    }, [noteId]); // Dependency array to ensure it only runs once or when noteId changes

    const onChange = e => {
        setNoteData({ ...noteData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            let response = await updateNote(noteId, noteData); // Assuming this function is defined in notesService
            setSuccessMessage('Note updated successfully.');
        } catch (error) {
            setErrorMessage('Error updating note.');
            console.error(error);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Edit Note</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            {noteData && <form className="flex flex-col" onSubmit={onSubmit}>
                <div className="flex flex-col gap-2">
                    <label>Title</label>
                    <input
                        className="ring-2 ring-blue-500 rounded-md p-2 w-96 text-sm"
                        type="text"
                        name="title"
                        value={noteData.title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Content</label>
                    <textarea
                        className="ring-2 ring-blue-500 rounded-md p-2 w-96 text-sm"
                        name="content"
                        value={noteData.content}
                        onChange={onChange}
                        required
                    />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Update
                </button>
            </form>}
        </div>
    );
};

export default EditNote;
