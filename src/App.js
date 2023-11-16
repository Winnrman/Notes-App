import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute'; // Adjust the path as needed
import NewNote from './pages/NewNote';
import Welcome from './pages/Welcome';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/notes/new" element={
                    <ProtectedRoute>
                        <NewNote />
                    </ProtectedRoute>
                } />
                <Route path="/" element={<Welcome />} />
                {/* Define other protected routes similarly */}
            </Routes>
        </Router>
    );
}

export default App;
