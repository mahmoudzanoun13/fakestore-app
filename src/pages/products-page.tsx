import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useQueryState, parseAsInteger, parseAsStringLiteral, parseAsString } from 'nuqs';
import { getProducts, getCategories } from '@/api/products.api';
import type { Product } from '@/types/product.types';
import { ProductCard } from '@/components/products/product-card';
import { ProductGrid } from '@/components/products/product-grid';
import { SortControls } from '@/components/products/sort-controls';
import { CategoryFilter } from '@/components/products/category-filter';
import { Pagination } from '@/components/ui/pagination';
import { Spinner } from '@/components/ui/spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { useCartStore } from '@/store/cart.store';
import { toast } from 'sonner';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';
const sortOptions: SortOption[] = ['default', 'price-asc', 'price-desc', 'rating-desc'];

const ITEMS_PER_PAGE = 8;

export const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // nuqs based state for filtering
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault('all').withOptions({ shallow: false })
  );
  const [sortBy, setSortBy] = useQueryState(
    'sort',
    parseAsStringLiteral(sortOptions).withDefault('default').withOptions({ shallow: false })
  );
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ shallow: false })
  );

  const [categories, setCategories] = useState<string[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()]);
        setProducts(productsData);
        setCategories(categoriesData);
        setError(null);
      } catch {
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return list.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

  const handleSortChange = (val: string) => {
    setSortBy(val as SortOption);
    setCurrentPage(1); // Reset to first page on sort
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            Displaying {sortedProducts.length} premium products
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
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
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
