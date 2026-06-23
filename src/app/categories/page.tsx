import Link from 'next/link';
import { API_URL } from '@/lib/api';
import { ApiResponse, Category } from '@/types/product';

export const dynamic = 'force-dynamic';

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const data: ApiResponse<Category[]> = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categorías</h1>

      {categories.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
          No hay categorías disponibles.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/?categoryId=${category.id}`}
              className="rounded-lg border border-gray-200 bg-white p-5 text-gray-900 hover:shadow-md"
            >
              {category.nombre || category.name || `Categoría ${category.id}`}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
