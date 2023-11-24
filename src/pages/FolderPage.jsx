import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from '../components/Note';
import Header from '../components/Header';
import {handleNewNote} from './notesService';
import { fetchUserData } from '../components/userService';

const userData = fetchUserData();




const fetchNoteDetails = async (noteId) => {
  try {
    const response = await axios.get(`/api/notes/${noteId}`);
    return response.data; // The full note data
  } catch (error) {
    console.error(`Error fetching details for note ${noteId}:`, error);
    // Handle error (return null or an error object, depending on your preference)
    return null;
  }
};


const FolderPage = () => {
  const [folder, setFolder] = useState(null);
  const [notes, setNotes] = useState([]);
  const folderId = window.location.pathname.split('/')[2]; // Assuming the ID is in the URL
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showRightClickMenu, setShowRightClickMenu] = useState(false);
  const [rightClickMenuX, setRightClickMenuX] = useState(0);
  const [rightClickMenuY, setRightClickMenuY] = useState(0);
  const [viewingUpgradeNotification, setViewingUpgradeNotification] = useState(false); // Whether the user is viewing the upgrade notification

  const [noteId, setNoteId] = useState(''); // The ID of the note that was right-clicked on

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
      const response = await axios.get(`/api/folder/${folderId}`, config);
      //the response in an array full of objects
      setNotes(response.data);
      // console.log(response.data); //these are objects in an array
  } catch (error) {
      console.error(error);
      // Handle errors, e.g., redirect to login if token is invalid or expired
  }
};

  useEffect(() => {
    const fetchFolderData = async () => {
      try {
        const folderResponse = await axios.get(`/api/folders/${folderId}`);
        setFolder(folderResponse.data);
        
        // Assuming folderResponse.data contains an array of note IDs
        const noteDetailsPromises = folderResponse.data.notes.map(fetchNoteDetails);
        const notesDetails = await Promise.all(noteDetailsPromises);
        
        // Filter out any null responses if a fetch failed
        setNotes(notesDetails.filter(note => note !== null));
      } catch (error) {
        console.error('Error fetching folder data:', error);
        // Handle error
      }
    };

    fetchFolderData();
  }, [folderId]);


  // Render the folder page
  return (
    <>
    {showRightClickMenu && (
      <div
          //set the location to the rightClickMenuX and rightClickMenuY
          style = {{left: rightClickMenuX, top: rightClickMenuY}}
          className="w-fit h-fit absolute flex flex-col justify-center shadow-lg ring-1 ring-slate-200 rounded-sm"
          onClick={() => setShowRightClickMenu(false)}
      >
          <div
              className="bg-white w-full sm:w-fit rounded-sm gap-2 flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={{ left: rightClickMenuX, top: rightClickMenuY }}
          >
              <button
                  className="bg-slate-100/10 w-full hover:bg-slate-200/60 text-black text-start px-3 font-light text-sm"
                  onClick={() => {
                      window.location = `/notes/edit/${noteId}`;
                  }}
              >
                  Edit
              </button>
              {/* <button
                  className="bg-slate-100/10 w-full hover:bg-slate-200/60 text-black text-start px-3 font-light text-sm"
                  onClick={() => {
                      window.location = `/notes/${noteId}/edit`;
                  }}
              >
                  Star
              </button>
              <button
                  className="bg-slate-100/10 w-full flex gap-2 hover:bg-slate-200/60 text-start px-3 text-black font-light text-sm"
                  onClick={() => {
                      window.location = `/notes/${noteId}/delete`;
                  }}
              >
                  Delete
              </button> */}

          {/* <button
              className="bg-slate-100/10 w-full hover:bg-slate-200/60 text-black text-start px-3 font-light text-sm"
              onClick={() => {
                  // Trigger the add to folder functionality
                  // For now, we will use a static folderId for illustration
                  const folderId = 'your-folder-id'; // This would be dynamically set based on user's choice
                  addToFolder(); // Show the folder selection menu
              }}
          >
              Add to Folder
          </button> */}

          </div>
      </div>
  )}
      <Header/>
      {showNotification && (
                //have the div animate in from the top
                <div className="fixed top-0 left-0 right-0 mx-auto mt-2 rounded-md w-fit bg-white ring-2 ring-slate-300 text-purple-900 p-2 text-center animate-fade-in-down animate-fade-out-up transition-all duration-500">
                    {notificationMessage}
                </div>
            )}
      <div className = "bg-gradient-to-bl from-purple-900 to-blue-900 min-h-screen py-2 px-6">
        <div className = "pt-16 flex flex-row items-center justify-between">
          <div className = "flex items-center gap-1">
      <button onClick = {() => window.location = "/dashboard"} className = "bg-transparent hover:bg-slate-100/10 text-white font-bold p-2 mx-2 rounded"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
</button>
      <h1 className = "text-white text-5xl font-bold py-4">{folder ? folder.title : 'Loading...'}</h1>
      </div>
      <button className = "flex items-center bg-slate-100/10 hover:bg-slate-100/20 text-white font-light py-2 px-3 rounded" onClick={() => handleNewNote(userData, setViewingUpgradeNotification, folderId)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
    New</button>
      </div>
      {folder?.notes ? (
        <>
        <p className = "text-white text-xl font-base px-16">{folder ? "Total: "+folder.notes.length +" Note(s)" : 'Loading...'}</p>
        <div className="notes-container px-12 bg-transparent py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {notes.length ? (
            notes.map(note => (
              <Note 
                  key={note.id} 
                  note={note} 
                  showDeleteNotification={showDeleteNotification} 
                  fetchNotes={fetchNotes} 
                  setNoteId={setNoteId} 
                  setShowRightClickMenu={setShowRightClickMenu} 
                  setRightClickMenuX={setRightClickMenuX} 
                  setRightClickMenuY={setRightClickMenuY} 
              />
          ))

          ) : (
            <p className = "text-sm text-white pl-16 w-full">No notes in this folder or loading notes...</p>
          )}
        </div>
        </>
      ) : (
        <p className = "">Folder contains no notes.</p>
      )}

    </div>
    </>
  );
};

export default FolderPage;
