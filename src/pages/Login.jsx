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

        <div className = "bg-gradient-to-bl from-purple-900 to-blue-900 h-screen flex flex-col items-center justify-center">
            <div className = "flex flex-row gap-2 pt-10 justify-between w-96">
            <h2 className ="text-4xl font-bold text-gradient bg-gradient-to-r py-4 from-purple-300 to-blue-300 text-transparent bg-clip-text">Login</h2>
            <span></span>
            </div>
            <form className = "flex flex-col gap-2" onSubmit={e => onSubmit(e)}>
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
                <p className = "text-sm text-slate-300 font-light">Forgot your password? <a href="/forgot-password"><span className ="font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Reset it here.</span></a></p>

                <button className = "bg-black/20 hover:bg-white-700 text-white font-bold py-2 px-4 rounded" type="submit">Login</button>
            </form>
            {errorMessage && <p className = "text-red-500 text-sm pt-4">{errorMessage}</p>}


            <p className = "text-sm text-slate-300 font-light py-4">Don't have an account? <a href="/register"><span className ="font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Register here.</span></a></p>
        </div>
        </>
    );
}


export default Login