import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/student/login', { email, name });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/home');
        } catch (error) {
            console.error('Login failed', error);
            alert('Error al ingresar');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="card" style={{ width: '400px' }}>
                <h2 style={{ textAlign: 'center', color: 'var(--green)' }}>Virtual Network</h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Ingreso de Estudiantes</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre Completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Correo Institucional"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default StudentLogin;
