import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Simulations = () => {
    const [simulations, setSimulations] = useState([]);
    const [activeQuiz, setActiveQuiz] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user && user.id) {
            axios.get(`http://localhost:3000/student/${user.id}`)
                .then(res => setSimulations(res.data.simulations || []))
                .catch(err => console.error(err));
        }
    }, [activeQuiz]);

    const startQuiz = (type) => {
        setActiveQuiz({
            type,
            questions: [
                { q: "¿Cuál es el objetivo principal de una entrevista?", options: ["Conseguir el trabajo", "Hacer amigos", "Pasar el tiempo"], correct: 0 },
                { q: "¿Qué debes hacer antes de una reunión importante?", options: ["Dormir", "Preparar los temas", "Comer mucho"], correct: 1 },
                { q: "¿Cómo manejar un conflicto laboral?", options: ["Gritar", "Ignorar", "Dialogar asertivamente"], correct: 2 }
            ],
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
                title: `Simulación ${activeQuiz.type}`,
                score: finalScore,
                status: 'completed',
                student: user.id
            }).then(() => {
                alert(`Simulación terminada. Puntaje: ${finalScore}`);
                setActiveQuiz(null);
            });
        }
    };

    if (activeQuiz) {
        const q = activeQuiz.questions[activeQuiz.current];
        return (
            <div className="container" style={{ paddingTop: '100px' }}>
                <div className="card">
                    <h2>Pregunta {activeQuiz.current + 1}/{activeQuiz.questions.length}</h2>
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
                <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                    <button onClick={() => startQuiz('Entrevista')}>Entrevista Laboral</button>
                    <button onClick={() => startQuiz('Reunión')}>Reunión de Equipo</button>
                    <button onClick={() => startQuiz('Conflicto')}>Resolución de Conflictos</button>
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
        </div>
    );
};

export default Simulations;
