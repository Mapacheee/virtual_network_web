import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentLogin from './pages/StudentLogin';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import Simulations from './pages/Simulations';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavbarPaths = ['/', '/admin/login', '/admin/dashboard'];
    const showNavbar = !hideNavbarPaths.includes(location.pathname);

    return (
        <>
            {showNavbar && <Navbar />}
            {children}
        </>
    );
};

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<StudentLogin />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/simulations" element={<Simulations />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
