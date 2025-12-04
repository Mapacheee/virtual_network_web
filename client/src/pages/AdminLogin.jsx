import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/admin/login', { username, pass });
            localStorage.setItem('admin_token', response.data.access_token);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Login failed', error);
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="card" style={{ width: '400px', border: '1px solid var(--green)' }}>
                <h2 style={{ textAlign: 'center', color: 'var(--green)' }}>Admin Portal</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                    <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
