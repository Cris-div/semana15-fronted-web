export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {};

  const token = localStorage.getItem('token');

  return token ? { Authorization: `Bearer ${token}` } : {};
}
