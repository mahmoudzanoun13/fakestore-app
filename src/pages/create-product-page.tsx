import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { createProduct, getCategories } from '@/api/products.api';
import type { ProductFormValues } from '@/schemas/product.schema';
import { Spinner } from '@/components/ui/spinner';
import { CreateProductForm } from '@/components/products/create-product-form';

export const CreateProductPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        toast.error('Failed to load categories');
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateProduct = async (data: ProductFormValues) => {
    try {
      await createProduct(data);
      toast.success('Product created successfully!');
      navigate('/');
    } catch {
      toast.error('Failed to create product');
    }
  };

  if (isPageLoading) {
    return (
      <div className="flex justify-center p-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-secondary-foreground mb-8 text-center">
        Create New Product
      </h1>

      <CreateProductForm categories={categories} onSubmitHandler={handleCreateProduct} />
    </div>
  );
};
