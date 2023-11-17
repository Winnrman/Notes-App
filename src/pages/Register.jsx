import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios

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
        <div>
            <h2 className = "text-2xl font-bold">Register</h2>
            <form className = "flex flex-col gap-2" onSubmit={e => onSubmit(e)}>
                
            <div>
                    <input className = "ring-2 w-96 ring-blue-600 rounded-md p-2 text-sm" 
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input className = "ring-2 w-96 ring-blue-600 rounded-md p-2 text-sm" 
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input className = "ring-2 w-96 ring-blue-600 rounded-md p-2 text-sm" 
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input className = "ring-2 w-96 ring-blue-600 rounded-md p-2 text-sm" 
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input className = "ring-2 w-96 ring-blue-600 rounded-md p-2 text-sm" 
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button type="submit" className = "bg-blue-600 w-96 text-white rounded-md p-2 text-sm">Register</button>
            </form>
        </div>
    );
}

export default Register