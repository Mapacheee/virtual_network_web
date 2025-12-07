import React from 'react';
import imagen1 from '../assets/images/web/imagen1.webp';
import imagen2 from '../assets/images/web/imagen2.webp';
import imagen3 from '../assets/images/web/imagen3.webp';

const Home = () => {
    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <div className="card">
                <h1 style={{ color: 'var(--green)', marginBottom: '2rem' }}>Nosotros</h1>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <img
                            src={imagen1}
                            alt="Virtual Network Concept"
                            style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--lightest-navy)' }}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
                            Los estudiantes y recién egresados no cuentan con espacios reales y seguros donde puedan practicar habilidades profesionales antes de entrar al mundo laboral. Esta falta de experiencia genera inseguridad, miedo al error y baja confianza al enfrentar entrevistas, reuniones o decisiones importantes.
                        </p>
                        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
                            Desarrollamos Virtual Network, una plataforma que permite practicar situaciones laborales reales sin consecuencias. Los usuarios pueden enfrentar entrevistas, conflictos y decisiones profesionales en escenarios simulados, recibir retroalimentación inmediata y repetir tantas veces como necesiten.
                        </p>
                        <p style={{ lineHeight: '1.6' }}>
                            Virtual Network entrega un espacio de práctica accesible, seguro y realista, mejorando la confianza y preparación profesional.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div>
                        <img
                            src={imagen2}
                            alt="Simulation Feature"
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--lightest-navy)' }}
                        />
                        <p style={{ marginTop: '0.5rem', textAlign: 'center', color: 'var(--light-slate)' }}>Simulaciones Interactivas</p>
                    </div>
                    <div>
                        <img
                            src={imagen3}
                            alt="Professional Growth"
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--lightest-navy)' }}
                        />
                        <p style={{ marginTop: '0.5rem', textAlign: 'center', color: 'var(--light-slate)' }}>Crecimiento Profesional</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
