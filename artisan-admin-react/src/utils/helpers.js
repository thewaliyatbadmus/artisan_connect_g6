export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ratingStars(rating) {
  if (!rating) return null;
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

export function statusBadgeClass(status) {
  return {
    completed: 'badge-green',
    approved:  'badge-green',
    confirmed: 'badge-blue',
    pending:   'badge-amber',
    cancelled: 'badge-red',
    rejected:  'badge-red',
    inactive:  'badge-gray',
    active:    'badge-green',
    customer:  'badge-blue',
    artisan:   'badge-teal',
  }[status] || 'badge-gray';
}
