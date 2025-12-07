import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
    const [step, setStep] = useState('login');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [university, setUniversity] = useState('');
    const [career, setCareer] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/student/login', { email });
            if (response.data.needsRegistration) {
                setStep('register');
            } else {
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/home');
            }
        } catch (error) {
            console.error('Login failed', error);
            alert('Error al ingresar');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('name', name);
            formData.append('age', age);
            formData.append('university', university);
            formData.append('career', career);
            if (photoUrl) {
                formData.append('photo', photoUrl);
            }

            const response = await axios.post('http://localhost:3000/auth/student/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/home');
        } catch (error) {
            console.error('Registration failed', error);
            alert('Error ao registrar');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="card" style={{ width: '400px' }}>
                <h2 style={{ textAlign: 'center', color: 'var(--green)' }}>Virtual Network</h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    {step === 'login' ? 'Ingreso de Estudiantes' : 'Completa tu Perfil'}
                </p>

                {step === 'login' ? (
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Correo Institucional"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Siguiente</button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Nombre Completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Universidad"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Carrera"
                            value={career}
                            onChange={(e) => setCareer(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Edad"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8892b0' }}>Foto de Perfil (Opcional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhotoUrl(e.target.files[0])}
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Correo Institucional"
                            value={email}
                            disabled
                            style={{ opacity: 0.7 }}
                        />
                        <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Comenzar</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default StudentLogin;
