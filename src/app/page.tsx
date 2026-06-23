import Link from 'next/link';
import { API_URL } from '@/lib/api';
import { ApiResponse, Category, Product } from '@/types/product';

export const dynamic = 'force-dynamic';

function getCategoryId(product: Product) {
  return product.categoryId ?? product.CategoryId ?? product.category?.id ?? product.Category?.id;
}

function getCategoryName(category: Category) {
  return category.nombre || category.name || `Categoría ${category.id}`;
}

function getProductImage(product: Product) {
  return product.imageUrl || product.ImageUrl;
}

async function getProducts(categoryId?: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, {
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const data: ApiResponse<Product[]> = await res.json();
    const products = data.success ? data.data : [];

    if (!categoryId) return products;

    return products.filter((product) => String(getCategoryId(product)) === categoryId);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const data: ApiResponse<Category[]> = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string }>;
}) {
  const { categoryId } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(categoryId),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="mt-2 text-gray-600">Explora el catálogo disponible.</p>
        </div>

        {categories.length > 0 && (
          <form className="flex flex-col gap-2 sm:min-w-64">
            <label htmlFor="categoryId" className="text-sm font-medium text-gray-700">
              Filtrar por categoría
            </label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={categoryId || ''}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {getCategoryName(category)}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Aplicar filtro
            </button>
          </form>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const image = getProductImage(product);

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={product.nombre}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.nombre}
                  </h2>
                  <p className="text-2xl font-bold text-gray-900 mb-3">
                    S/ {product.precio}
                  </p>
                  {product.descripcion && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {product.descripcion}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
