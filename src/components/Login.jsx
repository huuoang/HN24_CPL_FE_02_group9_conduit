import React from 'react';
import { useNavigate } from 'react-router-dom';
import Authen from './authen'; // Import Authen component

const Login = () => {
    const navigate = useNavigate(); // Hook để điều hướng

    const handleLoginSuccess = () => {
        // Chuyển hướng về trang home sau khi đăng nhập thành công
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <a href="/register">Need an account?</a>
                        </p>
                        <Authen onLoginSuccess={handleLoginSuccess} /> {/* Use Authen component here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
