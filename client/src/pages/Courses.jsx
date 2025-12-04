import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user && user.id) {
            axios.get(`http://localhost:3000/student/${user.id}`)
                .then(res => setCourses(res.data.courses || []))
                .catch(err => console.error(err));
        }
    }, []);

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <h1 style={{ color: 'var(--green)', marginBottom: '2rem' }}>Mis Cursos</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {courses.length > 0 ? courses.map(course => (
                    <div key={course.id} className="card">
                        <h3 style={{ color: 'var(--white)' }}>{course.title}</h3>
                        <p>{course.description}</p>
                        <button style={{ marginTop: '1rem' }}>Ver Detalles</button>
                    </div>
                )) : (
                    <p>No tienes cursos inscritos actualmente.</p>
                )}
            </div>
        </div>
    );
};

export default Courses;
