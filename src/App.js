import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute'; // Adjust the path as needed
import NewNote from './pages/NewNote';
import Welcome from './pages/Welcome';
import EditNote from './pages/EditNote';
import LoginProtectedRoute from './components/LoginProtectedRoute';
import DemoPage from './pages/demoPage';
import Forum from './pages/Forum';
import FolderPage from './pages/FolderPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                    <LoginProtectedRoute>
                <Login />
                </LoginProtectedRoute>
                } />
                <Route path="/register" element={
                <LoginProtectedRoute>
                <Register />
                </LoginProtectedRoute>
                } />
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
                <Route path = "/notes/edit/:id" element={
                    <ProtectedRoute>
                        <EditNote />
                    </ProtectedRoute>
                } />
                <Route path = "/forum" element={
                    <ProtectedRoute>
                        <Forum/>
                    </ProtectedRoute>
                } />

                <Route path="/folders/:id" element={
                    <ProtectedRoute>
                    <FolderPage/>
                    </ProtectedRoute>
                } />

                    
                <Route path="/" element={<Welcome />} />
                {/* Define other protected routes similarly */}
            </Routes>
        </Router>
    );
}

export default App;
