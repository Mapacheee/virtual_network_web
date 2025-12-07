import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Simulations = () => {
    const [simulations, setSimulations] = useState([]);
    const [availableQuizzes, setAvailableQuizzes] = useState([]);
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ score: 0, message: '' });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user && user.id) {
            axios.get(`http://localhost:3000/student/${user.id}`)
                .then(res => setSimulations(res.data.simulations || []))
                .catch(err => console.error(err));
        }
        axios.get('http://localhost:3000/quiz')
            .then(res => setAvailableQuizzes(res.data || []))
            .catch(err => console.error(err));
    }, [activeQuiz]);

    const startQuiz = (quiz) => {
        let questions = quiz.questions;
        if (typeof questions === 'string') {
            try {
                questions = JSON.parse(questions);
            } catch (e) {
                console.error("Error parsing questions JSON", e);
                questions = [];
            }
        }

        setActiveQuiz({
            ...quiz,
            questions: questions || [],
            current: 0,
            score: 0
        });
    };

    const handleAnswer = (index) => {
        const isCorrect = index === activeQuiz.questions[activeQuiz.current].correct;
        const newScore = isCorrect ? activeQuiz.score + 1 : activeQuiz.score;

        if (activeQuiz.current + 1 < activeQuiz.questions.length) {
            setActiveQuiz({ ...activeQuiz, current: activeQuiz.current + 1, score: newScore });
        } else {
            const finalScore = Math.round((newScore / activeQuiz.questions.length) * 100);
            axios.post('http://localhost:3000/simulations', {
                title: `Simulación: ${activeQuiz.title}`,
                score: finalScore,
                status: 'Completado',
                student: user.id
            }).then(() => {
                setModalData({
                    score: finalScore,
                    message: finalScore >= 50 ? '¡Excelente trabajo! Has demostrado buenas habilidades.' : 'Buen intento, pero puedes mejorar. ¡Sigue practicando!'
                });
                setShowModal(true);
                setActiveQuiz(null);
            });
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (activeQuiz) {
        if (!activeQuiz.questions || activeQuiz.questions.length === 0) {
            return <div className="container" style={{ paddingTop: '100px' }}><div className="card">Error: No questions found for this quiz.</div></div>;
        }
        const q = activeQuiz.questions[activeQuiz.current];
        return (
            <div className="container" style={{ paddingTop: '100px' }}>
                <div className="card">
                    <h2>{activeQuiz.title} - Pregunta {activeQuiz.current + 1}/{activeQuiz.questions.length}</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>{q.q}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {q.options.map((opt, i) => (
                            <button key={i} onClick={() => handleAnswer(i)}>{opt}</button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <h1 style={{ color: 'var(--green)' }}>Simulaciones</h1>

            <div className="card">
                <h3>Disponibles</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '1rem' }}>
                    {availableQuizzes.length > 0 ? availableQuizzes.map(quiz => (
                        <div key={quiz.id} style={{ border: '1px solid var(--lightest-navy)', padding: '1rem', borderRadius: '4px' }}>
                            <h4 style={{ color: 'var(--white)' }}>{quiz.title}</h4>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{quiz.description}</p>
                            <button onClick={() => startQuiz(quiz)} style={{ width: '100%' }}>Iniciar</button>
                        </div>
                    )) : (
                        <p>No hay simulaciones disponibles.</p>
                    )}
                </div>
            </div>

            <div className="card">
                <h3>Completadas</h3>
                {simulations.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {simulations.map(sim => (
                            <li key={sim.id} style={{ padding: '10px', borderBottom: '1px solid var(--lightest-navy)', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{sim.title}</span>
                                <span style={{ color: sim.score >= 50 ? 'var(--green)' : 'red' }}>{sim.score} pts</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No has completado ninguna simulación.</p>
                )}
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div className="card" style={{ width: '400px', textAlign: 'center', animation: 'fadeIn 0.3s ease-in-out' }}>
                        <h2 style={{ color: 'var(--green)', marginBottom: '1rem' }}>Simulación Finalizada</h2>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--white)', margin: '1rem 0' }}>
                            {modalData.score}%
                        </div>
                        <p style={{ marginBottom: '2rem' }}>{modalData.message}</p>
                        <button onClick={closeModal} style={{ width: '100%' }}>Continuar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Simulations;
