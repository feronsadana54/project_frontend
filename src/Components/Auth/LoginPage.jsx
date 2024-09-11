import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from "../../Api/AuthApi";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response && response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        navigate('/dashboard');
      } else {
        alert('Login failed: Invalid response format');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed: ' + (error.message || 'Unknown network error'));
    }
  };    

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="col-md-4">
        <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
          <div className="card-body p-5 text-center">
            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="form-outline form-white mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="form-label">Username</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label">Password</label>
              </div>

              <button className="btn btn-outline-light btn-lg px-5" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
