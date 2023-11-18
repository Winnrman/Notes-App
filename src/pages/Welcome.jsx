import React from "react";
import Header from "../components/Header";
const Welcome = () => {
    return (
        <div>
            <Header/>
            {/* add a background gradient from white to blue */}
            <div className = "flex h-screen flex-col justify-center items-center bg-gradient-to-bl from-purple-900 to-blue-900">
            
            <h1 className = "text-6xl font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Welcome to Notes App!</h1>
            <h1 className = "text-2xl font-bold text-slate-300 pb-4">Creating the future of note-taking with AI.</h1>
            <p className = "text-md font-base text-slate-400">Organize, <span className = "bg-slate-300 p-1 text-black">annotate</span>, and search your notes with ease.</p>
            
            {/* <h1 className = "text-2xl font-bold">Welcome to Notes App!</h1>
            <p className = "text-sm">This app is going to be a simple note-taking app, but with complex features such as AI-assisted note creation, metrics, to-do connections, SaaS integrations, and more.</p>
            <p className = "text-sm pt-4">This app is currently in development, but you can still register and login to see the progress.</p>
    */}
            <div className = "flex flex-row gap-2 pt-10">
                <button className = "bg-black/20 hover:bg-white-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/login"}>Login</button>
                <button className = "bg-transparent hover:bg-black/10 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/register"}>Create an Account</button>
                </div>
        </div> 
        </div>
    );
}

export default Welcome;