'use client';

import Link from 'next/link';

export default function Navbar() {

  const logout = () => {
    localStorage.clear();

    document.cookie =
      'role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    window.location.href = '/login';
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16 items-center">

          <Link
            href="/"
            className="text-2xl font-bold text-gray-900"
          >
            ProductStore
          </Link>

          <div className="flex items-center gap-6">

            <Link
              href="/"
              className="text-gray-700 hover:text-black"
            >
              Productos
            </Link>

            <Link
              href="/login"
              className="text-gray-700 hover:text-black"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="text-gray-700 hover:text-black"
            >
              Registro
            </Link>

            <Link
              href="/admin"
              className="text-gray-700 hover:text-black"
            >
              Admin
            </Link>

            <button
              onClick={logout}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Salir
            </button>

          </div>

        </div>

      </div>
    </nav>
  );
}