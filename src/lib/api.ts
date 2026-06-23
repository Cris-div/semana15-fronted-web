export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://semana15-backend-web.onrender.com/api';

export function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {};

  const token = localStorage.getItem('token');

  return token ? { Authorization: `Bearer ${token}` } : {};
}
