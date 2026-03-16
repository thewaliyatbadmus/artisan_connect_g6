import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';

import { ArtisanCardH } from '../components/ArtisanCard';
import { artisans } from '../data/artisans';
import './Search.css';

export default function Search({ initialQuery, onViewProfile, onBook }) {
  const [query, setQuery]       = useState(initialQuery || '');
  const [skill, setSkill]       = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvail] = useState('');
  const [minRating, setRating]  = useState('');
  const [results, setResults]   = useState(artisans);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
     
      const found = artisans.find(a => a.skill.toLowerCase() === initialQuery.toLowerCase());
      if (found) setSkill(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    let res = artisans.filter(a => {
      const q = query.toLowerCase();
      if (q && !a.name.toLowerCase().includes(q) && !a.skill.toLowerCase().includes(q) && !a.location.toLowerCase().includes(q)) return false;
      if (skill && a.skill !== skill) return false;
      if (location && a.location !== location) return false;
      if (availability === 'available' && !a.available) return false;
      if (availability === 'busy' && a.available)       return false;
      if (minRating && a.rating < parseFloat(minRating)) return false;
      return true;
    });
    setResults(res);
  }, [query, skill, location, availability, minRating]);

  const clearFilters = () => {
    setQuery(''); setSkill(''); setLocation(''); setAvail(''); setRating('');
  };
  const hasFilters = query || skill || location || availability || minRating;

  return (
    <div className="search-page">

      {}
      <div className="search-topbar">
        <div className="container">
          <h1 className="search-topbar-title">Find Artisans</h1>
          <SearchBar value={query} onChange={setQuery} onSearch={setQuery} placeholder="Search by name, skill, or location…" />
        </div>
      </div>

      {}
      <div className="filters-bar">
        <div className="container filters-inner">
          <select value={skill} onChange={e => setSkill(e.target.value)} className="filter-select">
            <option value="">All Skills</option>
            {['Plumbing','Electrical','Carpentry','Tailoring','Welding','Painting','Masonry','Mechanics'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select value={location} onChange={e => setLocation(e.target.value)} className="filter-select">
            <option value="">All Locations</option>
            {['Kigali','Huye','Musanze','Rubavu','Nyagatare'].map(l => <option key={l}>{l}</option>)}
          </select>
          <select value={availability} onChange={e => setAvail(e.target.value)} className="filter-select">
            <option value="">Any Availability</option>
            <option value="available">Available Now</option>
            <option value="busy">Busy</option>
          </select>
          <select value={minRating} onChange={e => setRating(e.target.value)} className="filter-select">
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
          {hasFilters && (
            <button className="filter-clear" onClick={clearFilters}>✕ Clear Filters</button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container search-results-area">
        <div className="results-meta">
          <span className="results-count">
            <strong>{results.length}</strong> artisan{results.length !== 1 ? 's' : ''} found
            {hasFilters && <span className="filter-tag">Filtered</span>}
          </span>
          <span className="results-sort">Sorted by: Best Match</span>
        </div>

        {results.length > 0 ? (
          <div>
            {results.map(a => (
              <ArtisanCardH
                key={a.id}
                artisan={a}
                onViewProfile={onViewProfile}
                onBook={onBook}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No artisans found</h3>
            <p>Try changing your search term or clearing the filters.</p>
            <button className="btn btn-primary" onClick={clearFilters}>Clear All Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
