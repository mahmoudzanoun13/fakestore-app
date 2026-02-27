import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getProductById } from '@/api/products.api';
import type { Product } from '@/types/product.types';
import { ProductDetails } from '@/components/products/product-details';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { useCartStore } from '@/store/cart.store';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

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

  const handleAddToCart = (p: Product) => {
    addToCart({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.image,
      quantity: 1,
    });
    toast.success(`${p.title} added to cart!`);
  };

  if (error) {
    return (
      <div className="py-10 space-y-4">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back
        </Button>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Button variant="secondary" onClick={() => navigate(-1)} className="flex items-center gap-2">
        <ArrowLeft size={16} /> Back to Products
      </Button>

      <ProductDetails
        product={product ?? undefined}
        isLoading={isLoading}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};
