import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { artisans } from './data/artisans';

export default function App() {
  const [currentPage, setCurrentPage]     = useState('home');
  const [profileId, setProfileId]         = useState(null);
  const [bookingArtisan, setBookingArtisan] = useState(null);
  const [searchQuery, setSearchQuery]     = useState('');
  const [toastMsg, setToastMsg]           = useState('');
  const [toastVisible, setToastVisible]   = useState(false);
  const [user, setUser]                   = useState(null);
  const [newBookings, setNewBookings]     = useState([]);
  const toastTimer = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3000);
  };

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProfile = (id) => {
    setProfileId(id);
    navigate('profile');
  };

  const openBooking = (artisan) => {
    if (!user) {
      showToast('Please log in or sign up to book an artisan.');
      navigate('login');
      return;
    }
    if (user.role === 'artisan') {
      showToast('Artisan accounts cannot place bookings.');
      return;
    }
    if (!artisan.available) {
      showToast(`${artisan.name} is currently busy. Try again later.`);
      return;
    }
    setBookingArtisan(artisan);
  };

  const handleFilterSearch = (query) => {
    setSearchQuery(query);
    navigate('search');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('dashboard');
    const greeting = userData.role === 'artisan'
      ? `Welcome, ${userData.name.split(' ')[0]}! Your artisan profile is ready.`
      : `Welcome, ${userData.name.split(' ')[0]}!`;
    showToast(greeting);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('home');
    showToast('You have been logged out.');
  };

  const handleBooked = (booking) => {
    setNewBookings(prev => [booking, ...prev]);
    showToast('Booking request sent successfully!');
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={navigate} user={user} onLogout={handleLogout} />

      {currentPage === 'home' && (
        <Home
          onNavigate={navigate}
          onFilterSearch={handleFilterSearch}
          onViewProfile={viewProfile}
          onBook={openBooking}
        />
      )}

      {currentPage === 'search' && (
        <Search
          initialQuery={searchQuery}
          onViewProfile={viewProfile}
          onBook={openBooking}
        />
      )}

      {currentPage === 'profile' && (
        <Profile
          artisanId={profileId}
          artisans={artisans}
          onBack={() => navigate('search')}
          onBook={openBooking}
        />
      )}

      {currentPage === 'login' && (
        <Login onNavigate={navigate} onLogin={handleLogin} />
      )}

      {currentPage === 'signup' && (
        <Signup onNavigate={navigate} onLogin={handleLogin} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard
          user={user}
          onNavigate={navigate}
          onLogout={handleLogout}
          newBookings={newBookings}
        />
      )}

      {bookingArtisan && (
        <BookingModal
          artisan={bookingArtisan}
          onClose={() => setBookingArtisan(null)}
          onBooked={handleBooked}
        />
      )}

      <div className={`toast ${toastVisible ? 'show' : ''}`}>{toastMsg}</div>
    </div>
  );
}
