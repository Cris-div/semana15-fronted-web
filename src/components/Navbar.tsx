import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default async function Navbar() {
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            ProductStore
          </Link>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/" className="text-gray-700 hover:text-black">
              Productos
            </Link>

            <Link href="/categories" className="text-gray-700 hover:text-black">
              Categorías
            </Link>

            {role === 'ADMIN' && (
              <Link href="/admin" className="text-gray-700 hover:text-black">
                Admin
              </Link>
            )}

            {!role ? (
              <>
                <Link href="/login" className="text-gray-700 hover:text-black">
                  Login
                </Link>

                <Link href="/register" className="text-gray-700 hover:text-black">
                  Registro
                </Link>
              </>
            ) : (
              <LogoutButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
