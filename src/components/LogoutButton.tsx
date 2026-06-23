'use client';

export default function LogoutButton() {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    window.location.href = '/login';
  };

  return (
    <button
      onClick={logout}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      Salir
    </button>
  );
}
