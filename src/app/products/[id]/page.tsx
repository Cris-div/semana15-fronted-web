import Link from 'next/link';
import { notFound } from 'next/navigation';
import { API_URL } from '@/lib/api';
import { ApiResponse, Product } from '@/types/product';

export const dynamic = 'force-dynamic';

function getProductImage(product: Product) {
  return product.imageUrl || product.ImageUrl;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data: ApiResponse<Product> = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const image = getProductImage(product);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/" className="text-gray-600 hover:text-black">
        ← Volver a productos
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-8 mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{product.nombre}</h1>

        <p className="text-3xl font-bold mt-4 text-gray-900">
          S/ {product.precio}
        </p>

        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={product.nombre}
            className="mt-6 rounded-lg max-h-96 w-full object-cover"
          />
        )}

        <div className="mt-6 text-gray-600">
          {product.descripcion || 'Sin descripción disponible.'}
        </div>
      </div>
    </div>
  );
}
