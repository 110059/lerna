
// Dashboard.js
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Dashboard = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <Header />

            <div className="container-fluid mt-4 flex-grow-1">
                <div className="row">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Main Content */}
                    <div className="col-md-9">
                        <h3>Welcome to Your Dashboard</h3>
                        <p>This is a protected page, only accessible after login.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Dashboard;
