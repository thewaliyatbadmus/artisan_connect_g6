import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import { artisans } from './data/artisans';

export default function App() {
  const [currentPage, setCurrentPage]     = useState('home');
  const [profileId, setProfileId]         = useState(null);
  const [bookingArtisan, setBookingArtisan] = useState(null);
  const [searchQuery, setSearchQuery]     = useState('');
  const [toastMsg, setToastMsg]           = useState('');
  const [toastVisible, setToastVisible]   = useState(false);
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

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={navigate} />

      {/* Pages */}
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

      {/* Booking Modal */}
      {bookingArtisan && (
        <BookingModal
          artisan={bookingArtisan}
          onClose={() => setBookingArtisan(null)}
        />
      )}

      {/* Toast */}
      <div className={`toast ${toastVisible ? 'show' : ''}`}>{toastMsg}</div>
    </div>
  );
}
