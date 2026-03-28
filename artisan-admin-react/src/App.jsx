import React, { useState, useRef } from 'react';
import Sidebar      from './components/Sidebar';
import Topbar       from './components/Topbar';
import ConfirmModal from './components/ConfirmModal';
import Overview  from './pages/Overview';
import Users     from './pages/Users';
import Artisans  from './pages/Artisans';
import Bookings  from './pages/Bookings';
import Reviews   from './pages/Reviews';
import Login     from './pages/Login';
import { USERS, ARTISANS, BOOKINGS, INITIAL_REVIEWS } from './data/adminData';

export default function App() {
  
  const [adminUser,    setAdminUser]    = useState(null); // null = not logged in
  const [currentPage,  setCurrentPage]  = useState('overview');
  const [users,        setUsers]        = useState(USERS);
  const [artisans,     setArtisans]     = useState(ARTISANS);
  const [bookings]                      = useState(BOOKINGS);
  const [reviews,      setReviews]      = useState(INITIAL_REVIEWS);


  const [toastMsg,     setToastMsg]     = useState('');
  const [toastType,    setToastType]    = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef(null);

  const [confirmOpen,  setConfirmOpen]  = useState(false);
  const [confirmMsg,   setConfirmMsg]   = useState('');
  const confirmCallback = useRef(null);

  const showToast = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3000);
  };

  const handleLogin = (adminData) => {
    setAdminUser(adminData);
    setCurrentPage('overview');
    showToast(`Welcome back, ${adminData.name.split(' ')[0]}! 👋`);
  };

  const handleLogout = () => {
    setAdminUser(null);
    setCurrentPage('overview');
  };

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (type, id, name) => {
    setConfirmMsg(`Are you sure you want to permanently delete "${name}"? This action cannot be undone.`);
    confirmCallback.current = () => {
      if (type === 'user') {
        setUsers(prev => prev.filter(u => u.id !== id));
        showToast(`User "${name}" deleted.`, 'danger');
      } else if (type === 'artisan') {
        setArtisans(prev => prev.filter(a => a.id !== id));
        showToast(`Artisan "${name}" deleted.`, 'danger');
      }
      setConfirmOpen(false);
    };
    setConfirmOpen(true);
  };

  const handleApprove = (id) => {
    setArtisans(prev => prev.map(a =>
      a.id === id ? { ...a, status: 'approved', available: true } : a
    ));
    const name = artisans.find(a => a.id === id)?.name;
    showToast(`${name} has been approved! ✓`, 'success');
  };

  const handleReject = (id) => {
    setArtisans(prev => prev.map(a =>
      a.id === id ? { ...a, status: 'rejected' } : a
    ));
    const name = artisans.find(a => a.id === id)?.name;
    showToast(`${name} has been rejected.`, 'danger');
  };

  const handleSubmitReview = ({ artisanId, author, rating, comment }) => {
    const newReview = {
      id: 'r' + Date.now(),
      artisanId, author, rating, comment,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [newReview, ...prev]);
    showToast('Review submitted and awaiting approval.', 'success');
  };

  const handleApproveReview = (id) => {
    setReviews(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, status: 'approved' } : r);
    
      const review      = updated.find(r => r.id === id);
      const artisanRevs = updated.filter(r => r.artisanId === review.artisanId && r.status === 'approved');
      const avg         = artisanRevs.reduce((sum, r) => sum + r.rating, 0) / artisanRevs.length;
      setArtisans(prev => prev.map(a =>
        a.id === review.artisanId
          ? { ...a, rating: Math.round(avg * 10) / 10, reviews: artisanRevs.length }
          : a
      ));
      return updated;
    });
    showToast('Review approved and published! ✓', 'success');
  };

  const handleRejectReview = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    showToast('Review rejected.', 'danger');
  };

  const handleDeleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast('Review deleted.', 'danger');
  };

  const handleEditReview = (id, { comment, rating }) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, comment, rating } : r));
    showToast('Review updated successfully.', 'success');
  };

  const pendingCount = artisans.filter(a => a.status === 'pending').length;


  if (!adminUser) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <div className={`toast ${toastType} ${toastVisible ? 'show' : ''}`}>{toastMsg}</div>
      </>
    );
  }

  return (
    <div className="admin-shell">
      <Sidebar
        currentPage={currentPage}
        onNavigate={navigate}
        pendingCount={pendingCount}
        userCount={users.length}
        bookingCount={bookings.length}
        adminUser={adminUser}
        onLogout={handleLogout}
      />

      <main className="main">
        <Topbar currentPage={currentPage} onShowToast={showToast} />

        {currentPage === 'overview' && (
          <Overview
            users={users}
            artisans={artisans}
            bookings={bookings}
            onNavigate={navigate}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
        {currentPage === 'users' && (
          <Users
            users={users}
            onDelete={handleDelete}
          />
        )}
        {currentPage === 'artisans' && (
          <Artisans
            artisans={artisans}
            onDelete={handleDelete}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
        {currentPage === 'bookings' && (
          <Bookings
            bookings={bookings}
            users={users}
            artisans={artisans}
          />
        )}
        {currentPage === 'reviews' && (
          <Reviews
            reviews={reviews}
            artisans={artisans}
            onSubmitReview={handleSubmitReview}
            onApproveReview={handleApproveReview}
            onRejectReview={handleRejectReview}
            onDeleteReview={handleDeleteReview}
            onEditReview={handleEditReview}
          />
        )}
      </main>

      {confirmOpen && (
        <ConfirmModal
          message={confirmMsg}
          onConfirm={confirmCallback.current}
          onClose={() => setConfirmOpen(false)}
        />
      )}

      <div className={`toast ${toastType} ${toastVisible ? 'show' : ''}`}>
        {toastMsg}
      </div>
    </div>
  );
}