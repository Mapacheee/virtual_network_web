import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/courses')
            .then(res => setCourses(res.data || []))
            .catch(err => console.error(err));
    }, []);

    const handleViewDetails = (course) => {
        setSelectedCourse(course);
    };

    const closeModal = () => {
        setSelectedCourse(null);
    };

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <h1 style={{ color: 'var(--green)', marginBottom: '2rem' }}>Cursos Disponibles</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {courses.length > 0 ? courses.map(course => (
                    <div key={course.id} className="card">
                        <h3 style={{ color: 'var(--white)' }}>{course.title}</h3>
                        <p>{course.description}</p>
                        <button style={{ marginTop: '1rem' }} onClick={() => handleViewDetails(course)}>Ver Detalles</button>
                    </div>
                )) : (
                    <p>No hay cursos disponibles actualmente.</p>
                )}
            </div>

            {selectedCourse && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div className="card" style={{ width: '500px', animation: 'fadeIn 0.3s' }}>
                        <h2 style={{ color: 'var(--green)', marginBottom: '1rem' }}>{selectedCourse.title}</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{selectedCourse.description}</p>

                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ color: 'var(--lightest-slate)', marginBottom: '0.5rem' }}>Módulos del Curso:</h4>
                            {selectedCourse.modules && selectedCourse.modules.length > 0 ? (
                                <ul style={{ paddingLeft: '20px', color: 'var(--slate)' }}>
                                    {selectedCourse.modules.map((mod, i) => (
                                        <li key={i}>{mod}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: 'var(--slate)' }}>No hay módulos definidos aún.</p>
                            )}
                        </div>

                        <button onClick={closeModal} style={{ width: '100%' }}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
