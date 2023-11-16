import React, { useState } from 'react';
import axios from 'axios';


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
        <div>
            <h2>Login</h2>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <input className = "ring-2 ring-blue-500 rounded-md p-2 text-sm w-96" 
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input className = "ring-2 ring-blue-500 rounded-md p-2 w-96 text-sm" 
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}


            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
}


export default Login