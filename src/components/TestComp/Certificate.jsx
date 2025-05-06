import React, { forwardRef } from 'react';
import './CertificateStyles.css';
import awardImg from '../../assets/award.png';
import logoImg from '../../assets/logo.png';
import qrCode from '../../assets/QR_code.png';

const Certificate = forwardRef(({ name, course }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                padding: '20px',
                border: '2px solid #000',
                width: '1000px',
                margin: '0 auto',
                textAlign: 'center',
            }}>
            <div className="certificate-border">
                <div className="header-row">
                    <img src={logoImg} alt="Logo" className="logo-img" />
                    <h1 className="certificate-title">CERTIFICATE </h1>
                </div>

                <p className="subtitle">We are proud to present Badge to,</p>

                <h2 className="recipient">{name || 'student name'}</h2>

                <p className="description">
                Has Successfully completed first stage of <strong>{course}</strong> <br />
                    By which you can decide your career and education path.
                </p>

                <div className="award-section">
                    <img src={awardImg} alt="Award" className="award-img" />
                </div>

                <p className="website">CareerJupiter.com</p>

                <div className="qr-section">
                    <div className="qr-code">
                    <img src={qrCode} alt="Award" className="award-img" />
                    </div>
                    <div className="qr-code">
                    <img src={qrCode} alt="Award" className="award-img" />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Certificate;
