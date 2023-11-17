import React from "react";
import Header from "../components/Header";
const Welcome = () => {
    return (
        <div>
            <Header/>
            <div className = "flex h-screen flex-col justify-center items-center m-4">
            
            <h1 className = "text-5xl font-bold">Notes App</h1>
            <p className = "text-sm">This app is going to be a simple note-taking app, but with complex features such as AI-assisted note creation, metrics, to-do connections, SaaS integrations, and more.</p>
            
            {/* <h1 className = "text-2xl font-bold">Welcome to Notes App!</h1>
            <p className = "text-sm">This app is going to be a simple note-taking app, but with complex features such as AI-assisted note creation, metrics, to-do connections, SaaS integrations, and more.</p>
            <p className = "text-sm pt-4">This app is currently in development, but you can still register and login to see the progress.</p>
    */}
            <div className = "flex flex-row gap-2">
                <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/login"}>Login</button>
                <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/register"}>Register</button>
                </div>
        </div> 
        </div>
    );
}

export default Welcome;