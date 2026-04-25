import React, { useState } from 'react';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const ANONYM_PASSWORD = 'secret'; // Replace 'secret' with your anonymous password logic

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ANONYM_PASSWORD) {
            alert('Login successful!');
            // Redirect to admin dashboard or perform admin actions
        } else {
            alert('Incorrect password, please try again.');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
