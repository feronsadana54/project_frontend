import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const dummyUser = {
      username: '1234567890',
      password: '123',
    };

    if (username === dummyUser.username && password === dummyUser.password) {
      localStorage.setItem('user', JSON.stringify(dummyUser));
      navigate('/dashboard');
    } else {
      alert('Username atau Password salah');
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="col-md-4">
        <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
          <div className="card-body p-5 text-center">
            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-outline form-white mb-4">
                <input
                  type="text"
                  id="typeEmailX"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="form-label" htmlFor="typeEmailX">Username</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input
                  type="password"
                  id="typePasswordX"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="typePasswordX">Password</label>
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
