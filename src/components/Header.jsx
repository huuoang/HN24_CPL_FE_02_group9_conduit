import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Header.css';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="row w-100 align-items-center">
                    <div className="col-4">
                        <NavLink exact to="/" className="navbar-brand">conduit</NavLink>
                    </div>
                    <div className="col-8 d-flex justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link" activeClassName="active">Sign in</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link" activeClassName="active">Sign up</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
