// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QRScanner from './QRScanner';
import AttendeeForm from './AttendeeForm';
import AttendeeList from './AttendeeList';
import UserRegistration from './RegisterUser';

const App = () => {
  const [scannedData, setScannedData] = useState(null);
  const [attendees, setAttendees] = useState([]);

  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setScannedData(parsedData);
      } catch {
        alert('Invalid QR Code format');
      }
    }
  };

  const handleRegister = (attendee) => {
    setAttendees((prev) => [...prev, { ...attendee, registeredAt: new Date() }]);
    setScannedData(null);
  };

  return (
    <Router>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Event Registration</h1>
        <nav className="mb-8">
          <ul className="flex justify-center gap-6">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register User</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={
            <div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                  <QRScanner onScan={handleScan} />
                </div>
                <div className="w-full md:w-1/2">
                  <AttendeeForm scannedData={scannedData} onRegister={handleRegister} />
                </div>
              </div>
              <AttendeeList attendees={attendees} />
            </div>
          } />
          <Route path="/register" element={<UserRegistration />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
