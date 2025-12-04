import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) return null;

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/home" className="logo">Virtual Network</Link>
                <div className="nav-links">
                    <Link to="/home">Nosotros</Link>
                    <Link to="/profile">Perfil</Link>
                    <Link to="/courses">Cursos</Link>
                    <Link to="/simulations">Simulaciones</Link>
                    <Link to="/contact">Contactos</Link>
                    <button onClick={handleLogout}>Salir</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
