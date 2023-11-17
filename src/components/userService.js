import axios from 'axios'

export const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('token'); // Assuming the token is stored with the key 'token'
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios.get('/api/user/data', config); // Adjust the endpoint as necessary
        return response.data;
    } catch (error) {
        console.error("Error fetching user data", error);
        // Handle errors, e.g., redirect to login if token is invalid or expired
    }
};