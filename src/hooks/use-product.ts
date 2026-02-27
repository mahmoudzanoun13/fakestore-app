import { useState, useEffect } from 'react';
import { getProductById } from '@/api/products.api';
import type { Product } from '@/types/product.types';

export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await getProductById(Number(id));
        setProduct(data);
        setError(null);
      } catch {
        setError('Failed to load product details. It might not exist.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, isLoading, error };
};
