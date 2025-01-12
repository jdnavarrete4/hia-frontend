import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AppointmentProcces from './pages/PatientDashboard/AppointmentProcess';
import MedicalDashboard from './pages/MedicalDashboard/MedicalDashboard';
import MedicalConsultationProcess from './pages/MedicalDashboard/MedicalConsultationProcess';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import MenuPatient from './pages/PatientDashboard/MenuPatient';
import PatientHistory from './pages/PatientDashboard/PatientHistory';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './global.css';
import './index.css';

library.add(fas);

const AppLayout = ({ children }) => {
  const location = useLocation();

  // Rutas en las que se debe mostrar el menú
  const showMenu =
    location.pathname.startsWith('/pacientedashboard') ||
    location.pathname.startsWith('/historial-citas');

  return (
    <div className="flex">
      {/* Mostrar el menú solo en las rutas del Patient Dashboard */}
      {showMenu && <MenuPatient />}
      <div className="flex-1">{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pacientedashboard" element={<AppointmentProcces />} />
          <Route path="/historial-citas" element={<PatientHistory />} />
          <Route path="/medicodashboard" element={<MedicalDashboard />} />
          <Route
            path="/medicodashboard/consulta/:citaId"
            element={<MedicalConsultationProcess />}
          />
          <Route path="/administradordashboard" element={<AdminDashboard />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
