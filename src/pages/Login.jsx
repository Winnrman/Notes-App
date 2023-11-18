import React, { useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const { email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({ email, password });
            const response = await axios.post('/login', body, config);
            // console.log(response.data);
            // Handle successful login here (e.g., redirect to dashboard)
            localStorage.setItem('token', response.data.token);
            window.location = "/dashboard";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("Incorrect email or password. Please try again.")
            } else {
                console.error(error.response.data);
                // Handle other kinds of errors
            }
        }
    }
    

    return (
        <>
        <Header/>

        <div className = "bg-gradient-to-bl from-purple-900 to-blue-900 min-h-screen flex flex-col sm:md:lg:flex-row sm:px-32 items-center justify-center">
            <div className = "w-4/5 justify-between flex-row pt-32 sm:pt-0">
                <div>
                <div className = "flex flex-row gap-2 pt-10 justify-between w-fit">
                <h2 className ="text-4xl font-bold text-gradient bg-gradient-to-r py-4 from-purple-300 to-blue-300 text-transparent bg-clip-text">Login</h2>
                <span></span>
                </div>
                <form className = "flex flex-col gap-2" onSubmit={e => onSubmit(e)}>
                    <div>
                        <input className = "rounded-md p-3 text-sm w-full sm:w-96 bg-slate-100/10 focus:outline-none text-white" 
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <input className = "rounded-md p-3 text-sm w-full sm:w-96 bg-slate-100/10 focus:outline-none text-white"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <p className = "text-sm text-slate-300 font-light">Forgot your password? <a href="/forgot-password"><span className ="font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Reset it here.</span></a></p>

                    <button className = "bg-black/20 hover:bg-white-700 sm:w-96 text-white font-bold py-2 px-4 rounded" type="submit">Login</button>
                </form>
                {errorMessage && <p className = "text-red-500 text-sm pt-4">{errorMessage}</p>}


                <p className = "text-sm text-slate-300 font-light py-4">Don't have an account? <a href="/register"><span className ="font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Register here.</span></a></p>
            </div>
            </div>

            <div className = "bg-transparent w-4/5 sm:w-[1/3] rounded-md p-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-100/40">
  <path d="M16.5 7.5h-9v9h9v-9z" />
  <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
</svg>


                <h1 className = "text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text text-2xl font-bold">
Welcome to the future of notes.</h1>
                <p className = "text-slate-100/70 pt-2 pb-8">we're transforming the way you capture and organize your thoughts. Embrace the power of cutting-edge technology to elevate your note-taking to new heights.</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-100/40">
  <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
</svg>

                <h1 className = "text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text text-2xl font-bold">AI Powered Insights</h1>
                <p className = "text-slate-100/70 pt-2 pb-8">Harness the intelligence of AI to summarize lengthy notes, highlight key points, and even generate new ideas based on your existing content. Our smart algorithms work tirelessly to enhance your productivity and creativity.</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-100/40">
  <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
</svg>

                <h1 className = "text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text text-2xl font-bold">Seamless Organization</h1>

                <p className = "text-slate-100/70 pt-2 pb-8">Bid farewell to cluttered, disorganized notes. Our intuitive interface allows you to categorize, tag, and search through your notes effortlessly. Whether it's for study, work, or personal projects, keeping track of your ideas has never been easier.</p>

                
            </div>
        </div>
        </>
    );
}


export default Login