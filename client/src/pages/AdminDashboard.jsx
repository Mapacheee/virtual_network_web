import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        axios.get('http://localhost:3000/student')
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este estudiante?')) {
            axios.delete(`http://localhost:3000/student/${id}`)
                .then(() => fetchStudents())
                .catch(err => alert('Error al eliminar'));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    return (
        <div className="container" style={{ paddingTop: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--green)' }}>Panel de Administración</h1>
                <button onClick={handleLogout}>Salir</button>
            </div>

            <div className="card">
                <h3>Estudiantes Inscritos</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: 'var(--light-slate)' }}>
                            <th style={{ padding: '10px' }}>ID</th>
                            <th style={{ padding: '10px' }}>Nombre</th>
                            <th style={{ padding: '10px' }}>Email</th>
                            <th style={{ padding: '10px' }}>Universidad</th>
                            <th style={{ padding: '10px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id} style={{ borderTop: '1px solid var(--lightest-navy)' }}>
                                <td style={{ padding: '10px' }}>{student.id}</td>
                                <td style={{ padding: '10px' }}>{student.name}</td>
                                <td style={{ padding: '10px' }}>{student.email}</td>
                                <td style={{ padding: '10px' }}>{student.university}</td>
                                <td style={{ padding: '10px' }}>
                                    <button onClick={() => handleDelete(student.id)} style={{ padding: '5px 10px', fontSize: '12px', borderColor: 'red', color: 'red' }}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
