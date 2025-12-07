import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('students');
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [simulations, setSimulations] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3000/student').then(res => setStudents(res.data)).catch(console.error);
        axios.get('http://localhost:3000/courses').then(res => setCourses(res.data)).catch(console.error);
        axios.get('http://localhost:3000/simulations').then(res => setSimulations(res.data)).catch(console.error);
        axios.get('http://localhost:3000/quiz').then(res => setQuizzes(res.data)).catch(console.error);
    };

    const handleDeleteStudent = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este estudiante?')) {
            axios.delete(`http://localhost:3000/student/${id}`).then(fetchData).catch(() => alert('Error al eliminar'));
        }
    };
    const handleDeleteCourse = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este curso?')) {
            axios.delete(`http://localhost:3000/courses/${id}`).then(fetchData).catch(() => alert('Error al eliminar'));
        }
    };
    const handleDeleteSimulation = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este registro?')) {
            axios.delete(`http://localhost:3000/simulations/${id}`).then(fetchData).catch(() => alert('Error al eliminar'));
        }
    };
    const handleDeleteQuiz = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta simulación?')) {
            axios.delete(`http://localhost:3000/quiz/${id}`).then(fetchData).catch(() => alert('Error al eliminar'));
        }
    };

    const openModal = (type, item = null) => {
        setModalType(type);
        setEditingItem(item);
        setFormData(item ? { ...item } : {});
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        let url = 'http://localhost:3000';
        if (modalType === 'course') url += '/courses';
        else if (modalType === 'simulation') url += '/simulations';
        else if (modalType === 'quiz') url += '/quiz';

        try {
            if (editingItem) {
                await axios.patch(`${url}/${editingItem.id}`, formData);
            } else {
                await axios.post(url, formData);
            }
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error(error);
            alert('Error al guardar.');
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

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('students')}
                    style={{ borderColor: activeTab === 'students' ? 'var(--green)' : 'var(--light-slate)' }}
                >
                    Estudiantes
                </button>
                <button
                    onClick={() => setActiveTab('courses')}
                    style={{ borderColor: activeTab === 'courses' ? 'var(--green)' : 'var(--light-slate)' }}
                >
                    Cursos
                </button>
                <button
                    onClick={() => setActiveTab('quizzes')}
                    style={{ borderColor: activeTab === 'quizzes' ? 'var(--green)' : 'var(--light-slate)' }}
                >
                    Editor de Simulaciones
                </button>
                <button
                    onClick={() => setActiveTab('simulations')}
                    style={{ borderColor: activeTab === 'simulations' ? 'var(--green)' : 'var(--light-slate)' }}
                >
                    Resultados Alumnos
                </button>
            </div>

            <div className="card">
                {activeTab === 'students' && (
                    <>
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
                                            <button onClick={() => handleDeleteStudent(student.id)} style={{ padding: '5px 10px', fontSize: '12px', borderColor: 'red', color: 'red' }}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {activeTab === 'courses' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>Gestión de Cursos</h3>
                            <button onClick={() => openModal('course')}>Crear Nuevo Curso</button>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            {courses.map(course => (
                                <div key={course.id} style={{ border: '1px solid var(--lightest-navy)', padding: '1rem', marginBottom: '1rem', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4 style={{ color: 'var(--white)' }}>{course.title}</h4>
                                        <p style={{ fontSize: '0.9rem' }}>{course.description}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => openModal('course', course)} style={{ fontSize: '12px' }}>Editar</button>
                                        <button onClick={() => handleDeleteCourse(course.id)} style={{ padding: '5px 10px', fontSize: '12px', borderColor: 'red', color: 'red' }}>Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'quizzes' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>Editor de Simulaciones (Quizzes)</h3>
                            <button onClick={() => openModal('quiz')}>Crear Nueva Simulación</button>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            {quizzes.map(quiz => (
                                <div key={quiz.id} style={{ border: '1px solid var(--lightest-navy)', padding: '1rem', marginBottom: '1rem', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4 style={{ color: 'var(--white)' }}>{quiz.title}</h4>
                                        <p style={{ fontSize: '0.9rem' }}>{quiz.description}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => openModal('quiz', quiz)} style={{ fontSize: '12px' }}>Editar</button>
                                        <button onClick={() => handleDeleteQuiz(quiz.id)} style={{ padding: '5px 10px', fontSize: '12px', borderColor: 'red', color: 'red' }}>Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'simulations' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>Resultados de Alumnos</h3>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            {simulations.map(sim => (
                                <div key={sim.id} style={{ border: '1px solid var(--lightest-navy)', padding: '1rem', marginBottom: '1rem', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4 style={{ color: 'var(--white)' }}>{sim.title}</h4>
                                        <p style={{ fontSize: '0.9rem' }}>
                                            Puntaje: {sim.score} | Estado: {sim.status} |
                                            Estudiante: {sim.student ? `${sim.student.name} (ID: ${sim.student.id})` : 'N/A'}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleDeleteSimulation(sim.id)} style={{ padding: '5px 10px', fontSize: '12px', borderColor: 'red', color: 'red' }}>Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div className="card" style={{ width: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ color: 'var(--green)', marginBottom: '1rem' }}>
                            {editingItem ? 'Editar' : 'Crear'} {modalType === 'course' ? 'Curso' : (modalType === 'quiz' ? 'Simulación' : 'Registro')}
                        </h2>
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {modalType === 'quiz' && (
                                <>
                                    <input
                                        placeholder="Título de la Simulación"
                                        value={formData.title || ''}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                    <textarea
                                        placeholder="Descripción"
                                        value={formData.description || ''}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        style={{ minHeight: '60px', backgroundColor: 'transparent', color: 'var(--slate)', border: '1px solid var(--green)', padding: '10px', borderRadius: '4px' }}
                                        required
                                    />
                                    <div style={{ border: '1px solid var(--lightest-navy)', padding: '10px', borderRadius: '4px' }}>
                                        <h4 style={{ color: 'var(--lightest-slate)', marginBottom: '10px' }}>Preguntas</h4>
                                        {(formData.questions || []).map((q, qIndex) => (
                                            <div key={qIndex} style={{ marginBottom: '15px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                                <input
                                                    placeholder={`Pregunta ${qIndex + 1}`}
                                                    value={q.q}
                                                    onChange={e => {
                                                        const newQuestions = [...(formData.questions || [])];
                                                        newQuestions[qIndex].q = e.target.value;
                                                        setFormData({ ...formData, questions: newQuestions });
                                                    }}
                                                    style={{ marginBottom: '5px', width: '100%', padding: '10px', backgroundColor: 'transparent', color: 'var(--white)', border: '1px solid var(--green)', borderRadius: '4px' }}
                                                />
                                                <div style={{ marginLeft: '10px' }}>
                                                    {q.options.map((opt, oIndex) => (
                                                        <div key={oIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', width: '100%' }}>
                                                            <input
                                                                type="radio"
                                                                name={`correct-${qIndex}`}
                                                                checked={q.correct === oIndex}
                                                                onChange={() => {
                                                                    const newQuestions = [...(formData.questions || [])];
                                                                    newQuestions[qIndex].correct = oIndex;
                                                                    setFormData({ ...formData, questions: newQuestions });
                                                                }}
                                                                style={{ marginRight: '10px', cursor: 'pointer' }}
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder={`Opción ${oIndex + 1}`}
                                                                value={opt}
                                                                onChange={e => {
                                                                    const newQuestions = [...(formData.questions || [])];
                                                                    newQuestions[qIndex].options[oIndex] = e.target.value;
                                                                    setFormData({ ...formData, questions: newQuestions });
                                                                }}
                                                                style={{
                                                                    flex: 1,
                                                                    minWidth: '200px',
                                                                    padding: '10px',
                                                                    fontSize: '14px',
                                                                    backgroundColor: '#ffffff',
                                                                    color: '#000000',
                                                                    border: '1px solid #ccc',
                                                                    borderRadius: '4px',
                                                                    marginRight: '10px',
                                                                    cursor: 'text'
                                                                }}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newQuestions = [...(formData.questions || [])];
                                                                    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, i) => i !== oIndex);
                                                                    setFormData({ ...formData, questions: newQuestions });
                                                                }}
                                                                style={{
                                                                    color: 'red',
                                                                    background: 'transparent',
                                                                    border: '1px solid red',
                                                                    borderRadius: '4px',
                                                                    padding: '4px 8px',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >X</button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newQuestions = [...(formData.questions || [])];
                                                            newQuestions[qIndex].options.push('');
                                                            setFormData({ ...formData, questions: newQuestions });
                                                        }}
                                                        style={{ fontSize: '11px', padding: '5px 10px', marginTop: '5px', backgroundColor: 'var(--green)', color: 'var(--navy)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                                    >+ Agregar Opción</button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newQuestions = (formData.questions || []).filter((_, i) => i !== qIndex);
                                                        setFormData({ ...formData, questions: newQuestions });
                                                    }}
                                                    style={{ color: 'red', borderColor: 'red', fontSize: '11px', padding: '5px 10px', marginTop: '10px', width: '100%' }}
                                                >Eliminar Pregunta</button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, questions: [...(formData.questions || []), { q: '', options: [''], correct: 0 }] })}
                                            style={{ width: '100%', border: '1px dashed var(--green)', color: 'var(--green)', padding: '10px' }}
                                        >
                                            + Agregar Pregunta
                                        </button>
                                    </div>
                                </>
                            )}

                            {modalType === 'course' && (
                                <>
                                    <input
                                        placeholder="Título del Curso"
                                        value={formData.title || ''}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                    <textarea
                                        placeholder="Descripción"
                                        value={formData.description || ''}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        style={{ minHeight: '100px', backgroundColor: 'transparent', color: 'var(--slate)', border: '1px solid var(--green)', padding: '10px', borderRadius: '4px' }}
                                        required
                                    />
                                    <div style={{ border: '1px solid var(--lightest-navy)', padding: '10px', borderRadius: '4px' }}>
                                        <h4 style={{ color: 'var(--lightest-slate)', marginBottom: '10px' }}>Módulos</h4>
                                        {(formData.modules || []).map((mod, index) => (
                                            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                                <input
                                                    value={mod}
                                                    onChange={e => {
                                                        const newModules = [...(formData.modules || [])];
                                                        newModules[index] = e.target.value;
                                                        setFormData({ ...formData, modules: newModules });
                                                    }}
                                                    placeholder={`Módulo ${index + 1}`}
                                                    style={{ flex: 1 }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newModules = (formData.modules || []).filter((_, i) => i !== index);
                                                        setFormData({ ...formData, modules: newModules });
                                                    }}
                                                    style={{ color: 'red', borderColor: 'red' }}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, modules: [...(formData.modules || []), ''] })}
                                            style={{ width: '100%', border: '1px dashed var(--green)', color: 'var(--green)' }}
                                        >
                                            + Agregar Módulo
                                        </button>
                                    </div>
                                </>
                            )}

                            {modalType === 'simulation' && (
                                <>
                                    <input
                                        placeholder="Título de Simulación"
                                        value={formData.title || ''}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Puntaje (0-100)"
                                        value={formData.score || 0}
                                        onChange={e => setFormData({ ...formData, score: parseInt(e.target.value) })}
                                    />
                                    <select
                                        value={formData.status || 'Completado'}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        style={{ backgroundColor: 'transparent', color: 'var(--slate)', border: '1px solid var(--green)', padding: '10px', borderRadius: '4px' }}
                                    >
                                        <option value="Completado">Completado</option>
                                        <option value="Pendiente">Pendiente</option>
                                    </select>
                                </>
                            )}
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" style={{ flex: 1 }}>Guardar</button>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, borderColor: 'red', color: 'red' }}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default AdminDashboard;
