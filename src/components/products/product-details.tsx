import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import type { Product } from '@/types/product.types';
import { formatPrice } from '@/utils/format-price';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

type ProductDetailsProps = HTMLAttributes<HTMLDivElement> & {
  product?: Product;
  isLoading?: boolean;
  onAddToCart?: (product: Product) => void;
};

export const ProductDetails = forwardRef<HTMLDivElement, ProductDetailsProps>(
  ({ product, isLoading, onAddToCart, className = '', ...rest }, ref) => {
    if (isLoading) {
      return (
        <div className="flex justify-center p-20">
          <Spinner size="lg" />
        </div>
      );
    }

    if (!product) return null;

    return (
      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-lg border border-border shadow-sm ${className}`}
        {...rest}
      >
        <div className="bg-secondary rounded-lg p-8 flex items-center justify-center aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <p className="text-sm text-muted font-medium uppercase tracking-widest mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-secondary-foreground mb-4">{product.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
              <div className="flex items-center gap-1">
                <span className="text-success font-bold text-lg">★ {product.rating.rate}</span>
                <span className="text-muted">({product.rating.count} reviews)</span>
              </div>
            </div>
            <p className="text-secondary-foreground/80 leading-relaxed mb-8">
              {product.description}
            </p>
          </div>

          <div className="mt-auto space-y-4">
            <Button onClick={() => onAddToCart?.(product)} size="lg" className="w-full">
              Add to Shopping Cart
            </Button>
            <p className="text-xs text-center text-muted italic">
              Free shipping on orders over $50
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ProductDetails.displayName = 'ProductDetails';
