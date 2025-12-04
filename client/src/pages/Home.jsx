import React from 'react';

const Home = () => {
    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <div className="card">
                <h1 style={{ color: 'var(--green)', marginBottom: '2rem' }}>Nosotros</h1>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <img
                            src="https://placehold.co/600x400/112240/64ffda?text=Virtual+Network"
                            alt="Virtual Network Team"
                            style={{ width: '100%', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <p style={{ lineHeight: '1.6' }}>
                            Los estudiantes y recién egresados no cuentan con espacios reales y seguros donde puedan practicar habilidades profesionales antes de entrar al mundo laboral. Esta falta de experiencia genera inseguridad, miedo al error y baja confianza al enfrentar entrevistas, reuniones o decisiones importantes. Existe una brecha entre lo que aprenden en la universidad y lo que se exige en el ámbito laboral.
                        </p>
                        <p style={{ lineHeight: '1.6' }}>
                            Desarrollamos Virtual Network, una plataforma que permite practicar situaciones laborales reales sin consecuencias. Los usuarios pueden enfrentar entrevistas, conflictos y decisiones profesionales en escenarios simulados, recibir retroalimentación inmediata y repetir tantas veces como necesiten para mejorar. La experiencia es segura, controlada y centrada en el aprendizaje práctico.
                        </p>
                        <p style={{ lineHeight: '1.6' }}>
                            Virtual Network entrega un espacio de práctica accesible, seguro y realista, mejorando la confianza y preparación profesional. A diferencia de métodos tradicionales basados en teoría, ofrece experiencias prácticas, repetibles y disponibles 24/7. Esto permite desarrollar habilidades reales, reducir el miedo al error y aumentar la empleabilidad, convirtiendo a Virtual Network en una herramienta única para la formación profesional.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
