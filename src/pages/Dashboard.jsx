import '../index.css'

import Header from "../components/Header"

function Dashboard() {
    return (
        <div className = "bg-slate-100">
            <Header />
            <div className = "pt-20 w-full sm:w-2/3  mx-auto flex flex-col w-screen h-screen bg-slate-100 p-4">
                <div className = "flex flex-row justify-between">
                    <div className = "flex flex-col">
                        <h1 className = "font-semibold text-2xl text-slate-900">Dashboard</h1>
                        <p>Notes should be laid out in a grid format, with white backgrounds and slight borders.</p>
                    </div>
                        <div>
                            <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Note</button>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className = "flex flex-col w-1fr lg:max-w-xs sm:max-w-lg sm:w-full my-4 flex-wrap bg-white border-2 border-blue-300 w-fit rounded-md justify-between">
                            <div className = "p-2">
                                <h1 className = "font-semibold text-2xl text-slate-900">Note 1</h1>
                                <p className = "font-light">Notes should be laid out in a grid format, with white backgrounds and sl laid out in a grid format, with white backgrounds and sl laid out in a grid format, with white backgrounds and sl laid out in a grid format, with white backgrounds and sl laid out in a grid format, with white backgrounds and slight borders.</p>
                            </div>
                            <div className = "bg-slate-100 p-2 rounded-b-md">
                                <p className = "font-light text-slate-900 text-xs">Created: 2021-09-01</p>
                            </div>
                        </div>
                        <div className = "flex flex-col w-1fr lg:max-w-xs sm:max-w-lg sm:w-full my-4 flex-wrap bg-white border-2 border-blue-300 w-fit rounded-md justify-between">
                            <div className = "p-2">
                                <h1 className = "font-semibold text-2xl text-slate-900">Note 2</h1>
                                <p className = "font-light">Notes should be laid out in a grid format, with white backgrounds and slight borders.</p>
                            </div>
                            <div className = "bg-slate-100 p-2 rounded-b-md">
                                <p className = "font-light text-slate-900 text-xs">Created: 2021-09-01</p>
                            </div>
                        </div>
                        <div className = "flex flex-col w-1fr lg:max-w-xs sm:max-w-lg sm:w-full my-4 flex-wrap bg-white border-2 border-blue-300 w-fit rounded-md justify-between">
                            <div className = "p-2">
                                <h1 className = "font-semibold text-2xl text-slate-900">Figma Schematic Reminder</h1>
                                <div className="flex flex-row gap-2">
                                    <img className = "rounded-md mt-4" src = "https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1279662/figma-design-tool-e09b94850458e37b90442beb2a9192cc.png" />
                                    {/* <img className = "rounded-md mt-4 w-1/2" src = "https://images.pexels.com/photos/1974521/pexels-photo-1974521.jpeg?cs=srgb&dl=pexels-julia-kuzenkov-1974521.jpg&fm=jpg" /> */}
                                </div>
                                <p className = "font-light">Figma can be used to create wireframes and mockups for web and mobile applications. It is a great tool for creating a visual representation of your application.</p>
                            </div>
                            <div className = "bg-slate-100 p-2 rounded-b-md">
                                <p className = "font-light text-slate-900 text-xs">Created: 2021-09-01</p>
                            </div>
                        </div>
                        

                        
                        </div>
                        
                </div>
        </div>
    )
}

export default Dashboard