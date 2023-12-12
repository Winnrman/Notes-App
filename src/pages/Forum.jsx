import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";

const Forum = () => {

    const [recentPosts, setRecentPosts] = useState([]);

    const getRecentPosts = async () => {
        const response = await axios.get("/api/forum/recent");
        setRecentPosts(response.data);
    }


    return (
        <>
        <Header/>
        <div className = "py-16 bg-gradient-to-bl from-purple-900 to-blue-900 h-screen overflow-y-auto">
            <div className = "w-full h-screen bg-transparent pt-12 px-6">
            <div className = "flex flex-col gap-2">
                <div className = "w-auto mx-4">
                    <div className = "flex flex-row gap-2 justify-between w-full">
                    <h1 className = "text-5xl font-bold text-white">Forum</h1>
                    <button className = "flex items-center gap-1 bg-slate-100/30 text-white font-semibold px-4 py-2 rounded-lg hover:bg-slate-100/40">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>

                        New</button>
                    </div>
                    <p className = "text-md text-white py-2">Have a question? Want a new feature? Want to share your experience? This is the place to do it!</p>
                </div>
                
            </div>
            <h1 className = "text-2xl font-semibold text-white mx-4 mt-4">Pinned Posts</h1>
            <div className = "flex flex flex-col sm:md:flex-row">
                <div className = "sm:md:w-1/3 w-auto bg-white rounded-xl shadow-xl h-auto p-4 m-4">
                    <h1 className = "flex items-center gap-1 text-sm font-semibold text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                    </svg>
                    CREATED BY ADMINS</h1>
                    <h1 className = "text-xl font-bold text-black">How Can I change my plan to Pro / Enterprise?</h1>
                    <p className = "text-sm text-black font-base py-2">You can upgrade your plan by clicking on your user icon in the top-right of the dashboard, and then clicking ‘change’ on the row with your current plan. Another way is to navigate to <span className = "font-bold">/upgrade</span> in your browser, which will take you to the plan selection screen.</p>
                </div>

                <div className = "sm:md:w-1/3 w-auto  bg-white rounded-xl shadow-xl h-auto p-4 m-4">
                    <h1 className = "flex items-center gap-1 text-sm font-semibold text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                    </svg>
                    CREATED BY ADMINS</h1>
                    <h1 className = "text-xl font-bold text-black">How often will I be billed?</h1>
                    <p className = "text-sm text-black font-base py-2">Depending on your plan, you will be billed either monthly or annually. You can change your plan at any time, and you will be billed on a pro-rata basis for the remainder of the billing period.</p>
                </div>

                <div className = "sm:md:w-1/3 w-auto  bg-white rounded-xl shadow-xl h-auto p-4 m-4">
                    <h1 className = "flex items-center gap-1 text-sm font-semibold text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                    </svg>
                    CREATED BY ADMINS</h1>
                    <h1 className = "text-xl font-bold text-black">How often are new features added?</h1>
                    <p className = "text-sm text-black font-base py-2">We are constantly working on new features and improvements to the dashboard. We aim to release new features every 2-3 weeks, and we will always let you know when we do!</p>
                </div>
            </div>

            <div className = "flex flex flex-col w-full sm:md:flex-row">
            <div className = "flex flex sm:md:w-1/2 w-auto flex-col sm:md:flex-col">
            <h1 className = "text-2xl font-semibold text-white mx-4 mt-4">Frequently Asked Questions</h1>
                <div className = "sm:md:w-auto w-auto bg-white rounded-xl shadow-xl h-auto p-4 m-4">
                    <h1 className = "flex items-center gap-1 text-sm font-semibold text-green-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                    GENERAL USAGE</h1>
                    <h1 className = "text-xl font-bold text-black">How Can I Remove My Account?</h1>
                    <p className = "text-sm text-black font-base py-2">You can remove your account by clicking on your user icon in the top-right of the dashboard, and then clicking ‘remove account’. You will be asked to confirm your password, and then your account will be removed.</p>
                </div>
                <div className = "sm:md:w-auto w-auto bg-white rounded-xl shadow-xl h-auto p-4 m-4">
                    <h1 className = "flex items-center gap-1 text-sm font-semibold text-green-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                    GENERAL USAGE</h1>
                    <h1 className = "text-xl font-bold text-black">How Can I Change My Password?</h1>
                    <p className = "text-sm text-black font-base py-2">You can change your password by clicking on your user icon in the top-right of the dashboard, and then clicking ‘change password’. You will be asked to confirm your current password, and then enter your new password.</p>
                </div>
                <div className = "sm:md:w-auto w-auto bg-white rounded-xl shadow-xl h-auto p-4 m-4">
                    <h1 className = "flex items-center gap-1 text-sm font-semibold text-green-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>
                    DEVELOPER</h1>
                    <h1 className = "text-xl font-bold text-black">Where Do I Find My API Key?</h1>
                    <p className = "text-sm text-black font-base py-2">You can find your API key by clicking on your user icon in the top-right of the dashboard, and then clicking ‘API Key’. You will be asked to confirm your password, and then your API key will be displayed.</p>
                </div>
            </div>

            <div className = "flex flex sm:md:w-1/2 w-auto flex-col sm:md:flex-col">
            <h1 className = "text-2xl font-semibold text-white mx-4 mt-4">Recent Posts</h1>
            {recentPosts.length === 0 ? (
                <>
                <div className = "sm:md:w-auto w-auto bg-white/50 rounded-xl shadow-xl sm:md:h-1/3 h-32 m-4 animate-pulse">
                </div>

                <div className = "sm:md:w-auto w-auto bg-white/50 rounded-xl shadow-xl sm:md:h-1/3 h-32 m-4 animate-pulse">
                </div>
                <div className = "sm:md:w-auto w-auto bg-white/50 rounded-xl shadow-xl sm:md:h-1/3 h-32 m-4 animate-pulse">
                </div>
            </>
            ) : (
                <></>
            )    
            }
                {recentPosts.map((post, index) => (
                    <div key={index} className = "sm:md:w-auto w-auto bg-white rounded-xl shadow-xl h-auto p-4 m-4">
                    <h1 className = "flex items-center gap-1 text-sm font-semibold text-green-600">{post.tag}</h1>
                    <h1 className = "text-xl font-bold text-black">{post.title}</h1>
                    <p className = "text-sm text-black font-base py-2">{post.content}</p>

                    <div className = "flex flex-row gap-2">
                    <button className = "flex items-center gap-1 bg-slate-100/30 text-white font-semibold px-4 py-2 rounded-lg hover:bg-slate-100/40">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M8.25 6.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V7.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                        
                            Reply</button>
                            <button className = "flex items-center gap-1 bg-slate-100/30 text-white font-semibold px-4 py-2 rounded-lg hover:bg-slate-100/40">  
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M8.25 6.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V7.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                            </svg>

                            Like</button>

                            <button className = "flex items-center gap-1 bg-slate-100/30 text-white font-semibold px-4 py-2 rounded-lg hover:bg-slate-100/40">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M8.25 6.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V7.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                            </svg>

                            Bookmark</button>

                            <button className = "flex items-center gap-1 bg-slate-100/30 text-white font-semibold px-4 py-2 rounded-lg hover:bg-slate-100/40">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M8.25 6.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V7.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                            </svg>

                            Report</button>

                            <button className = "flex items-center gap-1 bg-slate-100/30 text-white font-semibold px-4 py-2 rounded-lg hover:bg-slate-100/40">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M8.25 6.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V7.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                            </svg>

                            Share</button>

                            </div>
                            </div>
                ))}

                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Forum;
