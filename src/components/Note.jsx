

import starNote from '../pages/StarNote'; //this is temporary, it will be changed to a function that stars a note
import axios from 'axios';

const note = (props) => {
    const EditNote = (id) => {
        window.location = `/notes/edit/${id}`;
    }

    const showDeleteNotification = props.showDeleteNotification; //function is passed down from Dashboard.jsx
    const fetchNotes = props.fetchNotes; //function is passed down from Dashboard.jsx

    function NoteDisplay({ content }) {
        return (
          <div
            className="note-content text-slate-500"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      }

    function deleteNote (id) {
        let token = localStorage.getItem('token');
        const config = {
            'Authorization': `Bearer ${token}`
        };
        axios.delete(`/api/notes/${id}`, config)
        .then(res => console.log(res.data));
        showDeleteNotification("Note deleted successfully.");
        fetchNotes(); //this is a function that fetches the notes again

    }

    return (
            <div key={note._id} className="bg-white flex flex-col justify-between rounded-md p-2 text-sm hover:bg-white/90 hover:cursor-pointer hover:ring-2 hover:ring-slate-600 shadow-md m-4">
                <span>
            <h3 className = "font-semibold text-xl">{props.note.title}</h3>
            <div className = "post_content">
                <NoteDisplay content={props.note.content} />
            </div>
            </span>
            <div className = "bg-transparent p-2 flex items-center justify-between">
                {/* <p className = "text-xs">{props.note.dateCreated}</p> */}
                <span></span>
                <div className = "flex flex-row gap-2 items-center">
                
                <button onClick = {(e) => starNote(props.note._id)} className = "bg-transparent hover:bg-slate-200 text-white font-bold p-2 rounded"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="fill-transparent text-purple-500 w-5 h-5 hover:text-transparent hover:fill-yellow-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                </button>
                <button onClick = {(e) => deleteNote(props.note._id)} className = "hover:bg-slate-200 text-white font-bold p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-500 hover:text-red-500">
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                </svg>
                </button>
                <button onClick = {(e) => EditNote(props.note._id)} className = "bg-transparent hover:bg-slate-200 text-white font-bold py-2 px-2 rounded"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-500">
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
</button>
            </div>
            </div>
        </div>
    )
}

export default note

