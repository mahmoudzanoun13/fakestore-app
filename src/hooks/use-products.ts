import { useState, useEffect, useMemo } from 'react';
import { useQueryState, parseAsInteger, parseAsStringLiteral, parseAsString } from 'nuqs';
import { getProducts, getCategories } from '@/api/products.api';
import type { Product } from '@/types/product.types';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';
const sortOptions: SortOption[] = ['default', 'price-asc', 'price-desc', 'rating-desc'];

const ITEMS_PER_PAGE = 8;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleSortChange = (val: string) => {
    setSortBy(val as SortOption);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    products: paginatedProducts,
    allFilteredCount: sortedProducts.length,
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
  };
};
