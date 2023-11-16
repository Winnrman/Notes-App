const Welcome = () => {
    return (
        <div>
            <h1 className = "text-2xl font-bold">Welcome!</h1>
            <p className = "text-xl">Please login or register to continue.</p>

            <div className = "flex flex-row gap-2">
                <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/login"}>Login</button>
                <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/register"}>Register</button>
                </div>
        </div>
    );
}

export default Welcome;