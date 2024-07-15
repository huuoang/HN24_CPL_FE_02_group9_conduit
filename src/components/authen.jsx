import React, { useState } from 'react';
import axios from 'axios';

const Authen = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State để lưu thông báo lỗi

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(''); // Xóa lỗi cũ trước khi gửi yêu cầu mới

        try {
            const response = await axios.post('https://api.realworld.io/api/users/login', {
                user: {
                    email,
                    password
                }
            });

            // Lưu token vào localStorage và gọi hàm onLoginSuccess
            localStorage.setItem('token', response.data.user.token);
            onLoginSuccess();
        } catch (err) {
            // Xử lý lỗi và cập nhật thông báo lỗi
            if (err.response && err.response.data && err.response.data.errors) {
                setError('Invalid email or password');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
            </form>
            {error && <div className="error-message">{error}</div>} {/* Hiển thị thông báo lỗi */}
        </div>
    );
};

export default Authen;
