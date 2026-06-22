import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Product, ApiResponse } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data: ApiResponse<Product> = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 inline-flex items-center gap-2 transition-colors"
      >
        &larr; Volver a productos
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {product.nombre}
        </h1>
        <p className="text-3xl font-bold text-gray-900 mb-6">
          $/ {product.precio}
        </p>

        <div className="prose max-w-none text-gray-600">
          <p className="whitespace-pre-line">
            {product.descripcion || 'Sin descripción disponible.'}
          </p>
        </div>
      </div>
    </div>
  );
}