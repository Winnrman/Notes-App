import React, { useState } from 'react';
import axios from 'axios';
import RichTextEditor from '../components/RichTextEditor';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function NewNote() {

    const navigate = useNavigate();

    //there is a ?folderId= in the url which is to be used to create a note in that folder
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let folderId = queryParams.get('folderId'); // Get folderId from URL

    //the folderId can be not in the url, so we need to check for undefined
        

    //check for undefined folderId
    // console.log(folderId);
    if(folderId === 'undefined') {
        console.log("undefined");
        folderId = "NONE" //if undefined, set folderId to NONE
    }

    const [noteData, setNoteData] = useState({
        title: '',
        content: ''
        // Add other fields as necessary
    });

    const { title, content } = noteData;

    const onChange = e => {
        setNoteData({ ...noteData, [e.target.name]: e.target.value });
    };

    const handleContentChange = content => {
        setNoteData({ ...noteData, content });
    };

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

            if(folderId === "NONE") {
                folderId = null;
            }

            const body = JSON.stringify({ 
                title, 
                content, 
                folderId
            });
            const response = await axios.post('/api/notes', body, config);
            // Handle successful creation (e.g., redirecting to dashboard or a specific note page)
            // console.log(response.data);
            
            //go back to previous page
            navigate(-1); //go back to previous page
        } catch (error) {
            console.error(error);
            // Handle errors, e.g., displaying error messages
        }
    }

    const handleCancel = () => {
        navigate('/dashboard');
    }

    return (
        <>
        <Header/>
        <div className = "pt-16 bg-gradient-to-bl from-purple-900 to-blue-900 min-h-screen py-2">               
                
                <form className = "flex flex-col gap-2" onSubmit={onSubmit}>
                <div className = "flex flex-col gap-2">
                    <div className = "flex flex-col sm:flex-row gap-2 justify-between px-2 w-full">
                    
                    <input className = "bg-slate-100/10 h-auto rounded-md p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 text-white focus:border-transparent"
                        type="text"
                        name="title"
                        value={title}
                        placeholder='Enter a title'
                        onChange={onChange}
                        required
                    />
                    <button className = "bg-slate-100/10 w-full sm:w-fit hover:bg-slate-100/20 text-white font-bold py-2 px-20 rounded" type="submit">Create</button>
                    <button onClick = {handleCancel} className = "bg-slate-100/10 w-fit sm:w-fit hover:bg-slate-100/20 text-white font-bold py-2 px-2 rounded" type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                    </button>
                 </div>
                 <div className = "flex flex-row gap-1 justify-between w-full flex-wrap">
                    <span className = "flex flex-row gap-1 flex-wrap">
                 <div className = "bg-slate-100/10 rounded-md p-2 w-auto m-2 text-sm">
                    <p className = "flex items-center text-slate-200 gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                    </svg>
                    Invite Collaborators</p>
                    </div>  
                    
                    <div className = "bg-slate-100/10 rounded-md p-2 w-auto m-2 text-sm">
                    <p className = "flex items-center text-slate-200 gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
                    <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                    </svg>
                    Export to PDF</p>
                    </div>  
                    <div className = "bg-slate-100/10 rounded-md p-2 w-auto m-2 text-sm">
                    <p className = "flex items-center text-slate-200 gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                    </svg>
                    Share</p>
                    </div>  
                    <div className = "bg-slate-100/10 rounded-md p-2 w-auto m-2 text-sm ring-2 ring-purple-600">
                    <p className = "flex items-center text-slate-200 gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
  <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
</svg>
                    AI Summarization<span className = "rounded-full bg-purple-100/30 px-2">Pro</span></p>
                    </div>

                    <div className = "bg-slate-100/10 rounded-md p-2 w-auto m-2 text-sm ring-2 ring-purple-600">
                    <p className = "flex items-center text-slate-200 gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
  <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
</svg>

                    Attach Documents<span className = "rounded-full bg-purple-100/30 px-2">Pro</span></p>
                    </div>

                    </span>
                    <div className = "rounded-md p-3 w-auto m-1 text-sm flex gap-2">
                    <p className = "text-slate-200">Last saved: <span className = "text-slate-400">Just now</span></p>
                    <p className = "text-slate-200 text-sm font-semibold">View Version History</p>
                    </div>  

                    </div>
                </div>
                <div className = "flex flex-col gap-2"> 
                    <RichTextEditor value={content} onChange={handleContentChange} className = "bg-transparent"/>

                </div>
            </form>
        </div>
        </>
    );
}

export default NewNote;
