import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios
import Header from "../components/Header";


function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: ''
        // Add other fields as necessary
    });

    const { username, email, password, firstName, lastName } = formData;

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
            const body = JSON.stringify({ username, email, password, firstName, lastName});
            const response = await axios.post('/register', body, config);
            console.log(response.data);
            //if the response is successful, redirect to login page
            window.location = "/login";
        } catch (error) {
            console.error(error.response.data);
            // Handle errors, e.g., displaying error messages
        }
    }

    return (
        <>
        <Header/>
        <div className="bg-gradient-to-bl from-purple-900 to-blue-900 min-h-screen flex flex-col sm:md:lg:flex-row sm:px-32 items-center justify-center">
    <div className="w-4/5 justify-between flex-row pt-32 sm:pt-0">
        <div>
            <div className="flex flex-row gap-2 pt-10 justify-between w-fit">
                <h2 className="text-4xl font-bold text-gradient bg-gradient-to-r py-4 from-purple-300 to-blue-300 text-transparent bg-clip-text">Create an Account</h2>
            </div>
            <form className="flex flex-col gap-3" onSubmit={e => onSubmit(e)}>
                
            <div>
                    <input className = "rounded-md p-3 text-sm w-full sm:w-96 bg-slate-100/10 focus:outline-none text-white" 
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input className = "rounded-md p-3 text-sm w-full sm:w-96 bg-slate-100/10 focus:outline-none text-white" 
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                
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
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
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
                <div className="flex items-center gap-2 mt-1">
                    <input 
                        type="checkbox" 
                        id="termsAndConditions" 
                        name="termsAndConditions"
                        className="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                        required 
                    />
                    <label htmlFor="termsAndConditions" className="text-sm text-slate-300">
                        I agree to the <a href="/terms-and-conditions" className="font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Terms and Conditions</a>
                    </label>
                </div>


                <button className="bg-black/20 hover:bg-white-700 sm:w-96 text-white font-bold py-2 px-4 rounded" type="submit">Register</button>
            </form>
            <p className="text-sm text-slate-300 font-light py-4">Already have an account? <a href="/login"><span className="font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Login here.</span></a></p>
        </div>
    </div>

    <div className="bg-transparent w-4/5 sm:w-[1/3] rounded-md p-3 text-sm">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-100/60">
  <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
  <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z" clipRule="evenodd" />
</svg>

    <h1 className="text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text text-2xl font-bold">
        What Can I Do with Noteify?
    </h1>
    <p className="text-slate-100/70 pt-2 pb-8">
        Discover the endless possibilities of advanced note-taking. Organize, collaborate, and innovate with our state-of-the-art features.
    </p>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-100/60">
  <path fillRule="evenodd" d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z" clipRule="evenodd" />
</svg>

    <h1 className="text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text text-2xl font-bold">
        How Does AI Enhance My Notes?
    </h1>
    <p className="text-slate-100/70 pt-2 pb-8">
        Leverage AI to summarize, analyze, and generate creative insights from your notes, revolutionizing how you process information.
    </p>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-100/60">
  <path fillRule="evenodd" d="M11.622 1.602a.75.75 0 01.756 0l2.25 1.313a.75.75 0 01-.756 1.295L12 3.118 10.128 4.21a.75.75 0 11-.756-1.295l2.25-1.313zM5.898 5.81a.75.75 0 01-.27 1.025l-1.14.665 1.14.665a.75.75 0 11-.756 1.295L3.75 8.806v.944a.75.75 0 01-1.5 0V7.5a.75.75 0 01.372-.648l2.25-1.312a.75.75 0 011.026.27zm12.204 0a.75.75 0 011.026-.27l2.25 1.312a.75.75 0 01.372.648v2.25a.75.75 0 01-1.5 0v-.944l-1.122.654a.75.75 0 11-.756-1.295l1.14-.665-1.14-.665a.75.75 0 01-.27-1.025zm-9 5.25a.75.75 0 011.026-.27L12 11.882l1.872-1.092a.75.75 0 11.756 1.295l-1.878 1.096V15a.75.75 0 01-1.5 0v-1.82l-1.878-1.095a.75.75 0 01-.27-1.025zM3 13.5a.75.75 0 01.75.75v1.82l1.878 1.095a.75.75 0 11-.756 1.295l-2.25-1.312a.75.75 0 01-.372-.648v-2.25A.75.75 0 013 13.5zm18 0a.75.75 0 01.75.75v2.25a.75.75 0 01-.372.648l-2.25 1.312a.75.75 0 11-.756-1.295l1.878-1.096V14.25a.75.75 0 01.75-.75zm-9 5.25a.75.75 0 01.75.75v.944l1.122-.654a.75.75 0 11.756 1.295l-2.25 1.313a.75.75 0 01-.756 0l-2.25-1.313a.75.75 0 11.756-1.295l1.122.654V19.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
</svg>

    <h1 className="text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text text-2xl font-bold">
        How Easy is It to Organize My Notes?
    </h1>
    <p className="text-slate-100/70 pt-2 pb-8">
        Effortlessly categorize, tag, and search your notes. Our intuitive interface is designed for maximum efficiency and ease of use.
    </p>
</div>

        </div>
        </>
    );
}

export default Register