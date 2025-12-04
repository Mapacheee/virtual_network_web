import React from 'react';

const Contact = () => {
    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <div className="card">
                <h1 style={{ color: 'var(--green)', marginBottom: '2rem' }}>Contacto</h1>
                <p>¿Tienes dudas o sugerencias? Contáctanos a través de nuestros canales oficiales.</p>

                <div style={{ marginTop: '2rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <h3 style={{ color: 'var(--white)' }}>Email</h3>
                        <a href="mailto:contacto@virtualnetwork.com">contacto@virtualnetwork.com</a>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <h3 style={{ color: 'var(--white)' }}>Redes Sociales</h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#">Instagram</a>
                            <a href="#">LinkedIn</a>
                            <a href="#">Twitter</a>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <h3 style={{ color: 'var(--white)' }}>Ubicación</h3>
                        <p>Santiago, Chile</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
