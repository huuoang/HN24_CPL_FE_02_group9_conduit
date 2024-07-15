import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Login from './components/Login';

function App() {
    return (
        <Router>
            <div id="app-container" className="App">
                <Header />
                <div id="content">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        {/* Thêm các route khác nếu cần */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
