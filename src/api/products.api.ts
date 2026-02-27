import api from './axios';
import type { Product } from '@/types/product.types';

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>('/products');
  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}

export async function getCategories(): Promise<string[]> {
  const response = await api.get<string[]>('/products/categories');
  return response.data;
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
  const response = await api.post<Product>('/products', data);
  return response.data;
}
