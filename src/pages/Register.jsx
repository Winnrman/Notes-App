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
        <div className = "bg-gradient-to-bl from-purple-900 to-blue-900 h-screen flex flex-col items-center justify-center"> 
        <div className = "flex flex-col gap-2 pt-10 w-96">
            <h2 className ="text-4xl font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Create an Account</h2>
            <p className = "text-sm font-bold text-slate-300">Already have an account? <a href = "/login" className = "text-gradient bg-gradient-to-r py-4 from-purple-300 to-blue-300 text-transparent bg-clip-text">Login</a></p>
            <span></span>
            </div>         
            <form className = "flex flex-col gap-2" onSubmit={e => onSubmit(e)}>
                
            <div>
                    <input className = "rounded-md p-3 text-sm w-96 bg-slate-100/10 focus:outline-none text-white" 
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input className = "rounded-md p-3 text-sm w-96 bg-slate-100/10 focus:outline-none text-white" 
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input className = "rounded-md p-3 text-sm w-96 bg-slate-100/10 focus:outline-none text-white" 
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input className = "rounded-md p-3 text-sm w-96 bg-slate-100/10 focus:outline-none text-white" 
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input className = "rounded-md p-3 text-sm w-96 bg-slate-100/10 focus:outline-none text-white" 
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button type="submit" className = "bg-black/20 hover:bg-white-700 text-white font-bold py-2 px-4 rounded">Register</button>
            </form>
        </div>
        </>
    );
}

export default Register