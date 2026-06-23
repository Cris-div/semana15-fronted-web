export interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  categoryId?: number;
  CategoryId?: number;
  imageUrl?: string;
  ImageUrl?: string;
  category?: Category;
  Category?: Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  nombre?: string;
  name?: string;
  descripcion?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
