

import starNote from '../pages/StarNote'; //this is temporary, it will be changed to a function that stars a note
const EditNote = (id) => {
    window.location = `/notes/edit/${id}`;
}
const note = (props) => {
    return (
        <div key={note._id} className = "w-auto sm:w-96 m-4 bg-white rounded-md p-2 text-sm hover:bg-white/90 hover:cursor-pointer hover:ring-2 hover:ring-slate-600 shadow-md">
            <h3 className = "font-semibold text-xl">{props.note.title}</h3>
            <p className = "text-sm font-light text-gray-500 pt-4">{props.note.content}</p>
            <div className = "bg-transparent p-2 flex items-center justify-between">
                {/* <p className = "text-xs">{props.note.dateCreated}</p> */}
                <span></span>
                <div className = "flex flex-row gap-2 items-center">
                
                <button onClick = {(e) => starNote(note._id)} className = "bg-transparent hover:bg-slate-200 text-white font-bold p-2 rounded"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="fill-transparent text-blue-500 w-6 h-6 hover:text-transparent hover:fill-yellow-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                </button>
                <button onClick = {(e) => EditNote(note._id)} className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
            </div>
            </div>
        </div>
    )
}

export default note

