import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import type { Product } from '@/types/product.types';
import { formatPrice } from '@/utils/format-price';
import { Button } from '@/components/ui/button';

type ProductCardProps = HTMLAttributes<HTMLDivElement> & {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (id: number) => void;
};

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, onAddToCart, onViewDetails, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col rounded-lg border border-border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group ${className}`}
        {...rest}
      >
        <div
          className="relative aspect-square w-full bg-secondary/50 cursor-pointer overflow-hidden p-6 flex items-center justify-center transition-colors group-hover:bg-secondary/30"
          onClick={() => onViewDetails?.(product.id)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 will-change-transform"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col flex-1 p-5">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-black text-muted uppercase tracking-widest bg-secondary/80 px-2 py-0.5 rounded">
                {product.category}
              </p>
              <div className="flex items-center gap-1 bg-success/10 px-2 py-1 rounded-full border border-success/20">
                <span className="text-[11px] font-black text-success">★ {product.rating.rate}</span>
              </div>
            </div>
            <h3
              className="text-sm font-bold text-secondary-foreground line-clamp-2 hover:text-primary cursor-pointer mb-4 h-10 transition-colors leading-tight"
              onClick={() => onViewDetails?.(product.id)}
            >
              {product.title}
            </h3>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between gap-4 border-t border-secondary/50">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted font-bold uppercase tracking-tighter leading-none mb-1">
                Price
              </span>
              <span className="text-xl font-black text-primary leading-none">
                {formatPrice(product.price)}
              </span>
            </div>
            <Button
              onClick={() => onAddToCart?.(product)}
              size="sm"
              className="shadow-md shadow-primary/20 h-9 px-4 active:scale-95 transition-transform"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';
