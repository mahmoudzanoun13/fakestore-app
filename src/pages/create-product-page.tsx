import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { createProduct, getCategories } from '@/api/products.api';
import { productSchema, type ProductFormValues } from '@/schemas/product.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';

export const CreateProductPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

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

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-8 rounded-lg border border-secondary shadow-sm"
      >
        <Input
          label="Title"
          placeholder="Enter product title"
          {...register('title')}
          error={errors.title?.message}
        />

        <Input
          label="Description"
          placeholder="Enter product description"
          {...register('description')}
          error={errors.description?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Price"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                label="Category"
                error={errors.category?.message}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                options={[
                  { value: '', label: 'Select a category', disabled: true },
                  ...categories.map((cat) => ({ value: cat, label: cat })),
                ]}
              />
            )}
          />
        </div>

        <Input
          label="Image URL"
          placeholder="https://example.com/image.jpg"
          {...register('image')}
          error={errors.image?.message}
        />

        <div className="pt-4">
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" className="border-white" />
                <span>Creating...</span>
              </div>
            ) : (
              'Create Product'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
