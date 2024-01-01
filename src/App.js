import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './App.css';
import CreateBooking from './components/BookingComponents';
import AllBookings from './components/AllBookings';

function App() {
  return (
    <BrowserRouter>
    <div>
      <nav
       data-testid="navbar"
       className="navbar navbar-expand-lg navbar-light bg-custom"
      >
        <span className="navbar-brand">MY CAR CARE</span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link"
            data-testid="bookingComponent-link"
            to="/">
              Book Service
            </Link>
          </li>
          <li className="nav-item">
            <Link
             className="nav-link"
             data-testid="allBookings-link"
             to="/allBooking">
              View Bookings
             </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<CreateBooking/>}></Route>
        <Route path="/allBooking" element={<AllBookings/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
