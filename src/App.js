import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AppointmentProcces from './pages/PatientDashboard/AppointmentProcess';
import MedicalDashboard from './pages/MedicalDashboard/MedicalDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './global.css';
import './index.css';



library.add(fas);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pacientedashboard" element={<AppointmentProcces />} />
        <Route path="/medicodashboard" element={<MedicalDashboard />} />
        <Route path="/administradordashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
