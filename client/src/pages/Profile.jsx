import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [student, setStudent] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user && user.id) {
            axios.get(`http://localhost:3000/student/${user.id}`)
                .then(res => setStudent(res.data))
                .catch(err => console.error(err));
        }
    }, []);

    if (!student) return <div className="container" style={{ paddingTop: '100px' }}>Cargando...</div>;

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <div className="card">
                <h1 style={{ color: 'var(--green)' }}>Perfil del Estudiante</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
                    <img
                        src={student.photoUrl || "https://placehold.co/150x150/112240/64ffda?text=Foto"}
                        alt="Perfil"
                        style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--green)' }}
                    />
                    <div>
                        <h2 style={{ color: 'var(--white)' }}>{student.name}</h2>
                        <p style={{ color: 'var(--light-slate)' }}><strong>Edad:</strong> {student.age} años</p>
                        <p style={{ color: 'var(--light-slate)' }}><strong>Universidad:</strong> {student.university}</p>
                        <p style={{ color: 'var(--light-slate)' }}><strong>Correo:</strong> {student.email}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="card">
                    <h3>Mis Cursos</h3>
                    {student.courses && student.courses.length > 0 ? (
                        <ul>
                            {student.courses.map(course => (
                                <li key={course.id}>{course.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay cursos inscritos.</p>
                    )}
                </div>
                <div className="card">
                    <h3>Mis Simulaciones</h3>
                    {student.simulations && student.simulations.length > 0 ? (
                        <ul>
                            {student.simulations.map(sim => (
                                <li key={sim.id}>{sim.title} - {sim.score} pts ({sim.status})</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay simulaciones completadas.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
