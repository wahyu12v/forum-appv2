export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 30) return formatDate(dateString);
  if (diffDay > 0) return `${diffDay} hari lalu`;
  if (diffHour > 0) return `${diffHour} jam lalu`;
  if (diffMin > 0) return `${diffMin} menit lalu`;
  return 'Baru saja';
};

export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const getTokenFromStorage = () => localStorage.getItem('token');
export const setTokenToStorage = (token) => localStorage.setItem('token', token);
export const removeTokenFromStorage = () => localStorage.removeItem('token');
