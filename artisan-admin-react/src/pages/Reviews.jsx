import React, { useState } from 'react';

const STAR_OPTIONS = ['All Stars', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

export default function Reviews({ reviews, artisans, onSubmitReview, onApproveReview, onRejectReview, onDeleteReview, onEditReview }) {
  
  const [artisanId, setArtisanId] = useState('');
  const [author,    setAuthor]    = useState('');
  const [comment,   setComment]   = useState('');
  const [rating,    setRating]    = useState(0);
  const [hovered,   setHovered]   = useState(0);

  const [searchQuery,      setSearchQuery]      = useState('');
  const [starFilter,       setStarFilter]       = useState('All Stars');
  const [professionFilter, setProfessionFilter] = useState('all');
  const [statusFilter,     setStatusFilter]     = useState('all');

  const [editingId,   setEditingId]   = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editRating,  setEditRating]  = useState(0);
  const [editHovered, setEditHovered] = useState(0);

  const approvedArtisans = artisans.filter(a => a.status === 'approved');
  const professions = [...new Set(approvedArtisans.map(a => a.skill))].sort();


  const filteredReviews = reviews.filter(r => {
    const artisan = artisans.find(a => a.id === r.artisanId);

    const matchesSearch = searchQuery.trim() === '' ||
      r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan?.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStars = starFilter === 'All Stars' ||
      r.rating === parseInt(starFilter.charAt(0));

    const matchesProfession = professionFilter === 'all' ||
      artisan?.skill === professionFilter;

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;

    return matchesSearch && matchesStars && matchesProfession && matchesStatus;
  });

  const pendingCount  = reviews.filter(r => r.status === 'pending').length;
  const approvedCount = reviews.filter(r => r.status === 'approved').length;

  const handleSubmit = () => {
    if (!artisanId)      return alert('Please select an artisan.');
    if (!author.trim())  return alert('Please enter a reviewer name.');
    if (rating < 1)      return alert('Please pick a star rating.');
    if (!comment.trim()) return alert('Please write a comment.');
    onSubmitReview({ artisanId, author, rating, comment });
    setArtisanId(''); setAuthor(''); setComment('');
    setRating(0); setHovered(0);
  };

  const startEdit = (r) => {
    setEditingId(r.id);
    setEditComment(r.comment);
    setEditRating(r.rating);
    setEditHovered(0);
  };

  const cancelEdit = () => { setEditingId(null); setEditComment(''); setEditRating(0); };

  const saveEdit = (id) => {
    if (!editComment.trim()) return alert('Comment cannot be empty.');
    if (editRating < 1)      return alert('Please pick a rating.');
    onEditReview(id, { comment: editComment, rating: editRating });
    cancelEdit();
  };

  return (
    <div className="page-content">
      <div className="reviews-layout">

        {/* ── Left: Submission Form ── */}
        <div className="panel review-form-panel fade-up">
          <div className="panel-head">
            <h2 className="panel-title">Submit a Review</h2>
          </div>

          <div className="form-group">
            <label>Select Artisan</label>
            <select value={artisanId} onChange={e => setArtisanId(e.target.value)}>
              <option value="">-- Choose artisan --</option>
              {approvedArtisans.map(a => (
                <option key={a.id} value={a.id}>{a.name} ({a.skill})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Reviewer Name</label>
            <input
              type="text"
              placeholder="e.g. Amina K."
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <div className="star-picker">
              {[1, 2, 3, 4, 5].map(val => (
                <span
                  key={val}
                  className={`star-pick ${val <= (hovered || rating) ? 'lit' : ''}`}
                  onMouseEnter={() => setHovered(val)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(val)}
                >★</span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Review Comment</label>
            <textarea
              placeholder="Write an honest review…"
              rows={4}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-full" onClick={handleSubmit}>
            Submit Review
          </button>

          {pendingCount > 0 && (
            <div className="review-pending-notice">
              ⏳ {pendingCount} review{pendingCount > 1 ? 's' : ''} waiting for your approval
            </div>
          )}
        </div>

        {/* ── Right: Reviews List ── */}
        <div className="panel fade-up" style={{ flex: 1 }}>
          <div className="panel-head">
            <h2 className="panel-title">
              Reviews <span className="count-chip">{filteredReviews.length}</span>
            </h2>
          </div>

          {/* Status Tabs */}
          <div className="review-tabs">
            {['all', 'pending', 'approved', 'rejected'].map(s => (
              <button
                key={s}
                className={`review-tab ${statusFilter === s ? 'active' : ''}`}
                onClick={() => setStatusFilter(s)}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                {s === 'pending'  && pendingCount  > 0 && <span className="tab-badge">{pendingCount}</span>}
                {s === 'approved' && approvedCount > 0 && <span className="tab-badge approved">{approvedCount}</span>}
              </button>
            ))}
          </div>

          {/* Filters Row */}
          <div className="review-filters">
            <input
              type="text"
              placeholder="Search by name, comment…"
              className="filter-input"
              style={{ flex: 1 }}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <select className="filter-select" value={starFilter} onChange={e => setStarFilter(e.target.value)}>
              {STAR_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <select className="filter-select" value={professionFilter} onChange={e => setProfessionFilter(e.target.value)}>
              <option value="all">All Professions</option>
              {professions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Review Cards */}
          {filteredReviews.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">★</div>
              <div className="empty-state-text">No reviews match your filters.</div>
            </div>
          ) : (
            filteredReviews.map(r => {
              const artisan   = artisans.find(a => a.id === r.artisanId);
              const isEditing = editingId === r.id;

              return (
                <div key={r.id} className={`review-card ${r.status}`}>
                  <div className="review-card-head">
                    <div>
                      <div className="review-card-author">{r.author}</div>
                      <div className="review-card-artisan">
                        → {artisan?.name} · <span style={{ color: 'var(--info)', fontWeight: 600 }}>{artisan?.skill}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                      {isEditing ? (
                        <div className="star-picker">
                          {[1,2,3,4,5].map(val => (
                            <span
                              key={val}
                              className={`star-pick ${val <= (editHovered || editRating) ? 'lit' : ''}`}
                              onMouseEnter={() => setEditHovered(val)}
                              onMouseLeave={() => setEditHovered(0)}
                              onClick={() => setEditRating(val)}
                            >★</span>
                          ))}
                        </div>
                      ) : (
                        <div className="review-stars">
                          {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                        </div>
                      )}
                      <span className={`badge ${
                        r.status === 'approved' ? 'badge-green' :
                        r.status === 'rejected' ? 'badge-red'   : 'badge-amber'
                      }`}>
                        {r.status === 'approved' ? '✓ Approved' :
                         r.status === 'rejected' ? '✗ Rejected' : '⏳ Pending'}
                      </span>
                    </div>
                  </div>

                  {isEditing ? (
                    <textarea
                      className="review-edit-textarea"
                      value={editComment}
                      onChange={e => setEditComment(e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <div className="review-card-text">{r.comment}</div>
                  )}

                  <div className="review-card-actions">
                    {isEditing ? (
                      <>
                        <button className="btn btn-primary" onClick={() => saveEdit(r.id)}>Save</button>
                        <button className="btn-cancel" style={{ padding: '0.45rem 0.9rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }} onClick={cancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        {r.status === 'pending' && (
                          <>
                            <button className="btn btn-approve" onClick={() => onApproveReview(r.id)}>✓ Approve</button>
                            <button className="btn btn-reject"  onClick={() => onRejectReview(r.id)}>✗ Reject</button>
                          </>
                        )}
                        <button className="btn btn-edit" onClick={() => startEdit(r)}>✎ Edit</button>
                        <button className="btn btn-danger" onClick={() => onDeleteReview(r.id)}>Delete</button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}