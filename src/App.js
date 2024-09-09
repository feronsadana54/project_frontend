import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LoginPage from './Components/Auth/LoginPage';
import PrivateRoute from './Components/Auth/PrivateRoute';
import DashboardPage from './Components/Dashboard/DashboardPage';
import UserManagementPage from './Components/UserManagement/UserManagementPage';
import SetoranPage from './Components/Setoran/SetoranPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UserManagementPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/setoran"
        element={
          <PrivateRoute>
            <SetoranPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
