import React from 'react';
import '../Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <a href="/" className="logo-font" style={{ color: '#5cb85c', fontWeight: 'bold', marginRight: '10px' }}>conduit</a>
                <span className="attribution">
                    An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code & design licensed under MIT.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
