import Header from "../components/Header";

const Forum = () => {
    return (
        <>
        <Header/>
        <div className = "py-16 bg-gradient-to-bl from-purple-900 to-blue-900 h-screen py-6">
            <div className = "w-full h-screen bg-white">
            <div className = "flex flex-col gap-2">
                <div className = "w-auto mx-4 p-2">
                    <h1 className = "text-2xl font-semibold text-purple-900">Forum</h1>
                    <p className = "text-sm text-purple-900">Welcome to the forum! Here you can ask questions, share your experiences, and connect with other users.</p>
                </div>
                
            </div>
            <div className = "flex flex-row">
                <div className = "w-1/5 bg-white rounded-xl shadow-xl h-[500px] p-2 m-4">
                    <h1 className = "text-md text-purple-900">Categories</h1>
                </div>

                <div className = "w-4/5 bg-white rounded-xl shadow-xl h-[500px] p-2 m-4">
                    <h1 className = "text-md text-purple-900">FAQ</h1>
                    <h1 className = "text-md text-purple-900">Recent Posts</h1>
                    <h1 className = "text-md text-purple-900">Create a Post</h1>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Forum;
