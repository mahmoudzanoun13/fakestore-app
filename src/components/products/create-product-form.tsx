import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductFormValues } from '@/schemas/product.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';

type CreateProductFormProps = {
  categories: string[];
  onSubmitHandler: (data: ProductFormValues) => Promise<void>;
};

export const CreateProductForm = ({ categories, onSubmitHandler }: CreateProductFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    await onSubmitHandler(data);
  };

  return (
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
  );
};
