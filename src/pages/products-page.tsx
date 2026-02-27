import { useNavigate } from 'react-router';
import { ProductCard } from '@/components/products/product-card';
import { ProductGrid } from '@/components/products/product-grid';
import { SortControls } from '@/components/products/sort-controls';
import { CategoryFilter } from '@/components/products/category-filter';
import { Pagination } from '@/components/ui/pagination';
import { Spinner } from '@/components/ui/spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { useCartStore } from '@/store/cart.store';
import { useProducts } from '@/hooks/use-products';
import { toast } from 'sonner';
import type { Product } from '@/types/product.types';

export const ProductsPage = () => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const {
    products,
    allFilteredCount,
    categories,
    isLoading,
    error,
    category,
    sortBy,
    currentPage,
    totalPages,
    handleSortChange,
    handleCategoryChange,
    handlePageChange,
  } = useProducts();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.title} added to cart!`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner size="lg" />
        <p className="text-muted animate-pulse font-medium">Fetching amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 max-w-2xl mx-auto">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-8 border-b border-border">
        <div>
          <h1 className="text-4xl font-extrabold text-secondary-foreground mb-2 tracking-tight">
            Our Collection
          </h1>
          <p className="text-muted text-sm font-medium">
            Displaying {allFilteredCount} premium products
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto mt-4 lg:mt-0">
          <CategoryFilter
            value={category}
            onChange={handleCategoryChange}
            categories={categories}
          />
          <SortControls value={sortBy} onChange={handleSortChange} />
        </div>
      </div>

      <ProductGrid>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={(id) => navigate(`/product/${id}`)}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-muted text-lg">No products found in this category.</p>
          </div>
        )}
      </ProductGrid>

      {totalPages > 1 && (
        <div className="flex justify-center pt-12 pb-20 border-t border-border">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
