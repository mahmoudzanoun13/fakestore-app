import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/format-price';
import type { CartItem as CartItemType } from '@/types/cart.types';

type CartItemProps = {
  item: CartItemType;
  onUpdateQuantity: (id: number, currentQty: number, delta: number) => void;
  onRemove: (id: number) => void;
  onNavigate: (id: number) => void;
};

export const CartItem = ({ item, onUpdateQuantity, onRemove, onNavigate }: CartItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-lg border border-border shadow-sm">
      <div
        className="w-24 h-24 bg-secondary rounded flex items-center justify-center p-2 cursor-pointer"
        onClick={() => onNavigate(item.id)}
      >
        <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
      </div>

      <div className="flex-1 min-w-0 text-center sm:text-left w-full sm:w-auto px-4 sm:px-0">
        <h3
          className="font-semibold text-secondary-foreground hover:text-primary cursor-pointer line-clamp-2 sm:line-clamp-1"
          onClick={() => onNavigate(item.id)}
        >
          {item.title}
        </h3>
        <p className="text-primary font-bold mt-1">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onUpdateQuantity(item.id, item.quantity, -1)}
          disabled={item.quantity <= 1}
        >
          <Minus size={14} />
        </Button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onUpdateQuantity(item.id, item.quantity, 1)}
        >
          <Plus size={14} />
        </Button>
      </div>

      <div className="flex flex-col items-center sm:items-end sm:min-w-[100px] gap-2 pt-2 sm:pt-0">
        <p className="font-bold text-secondary-foreground">
          {formatPrice(item.price * item.quantity)}
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="text-danger hover:text-danger hover:bg-danger/10 p-1 h-auto"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 size={16} className="mr-1" /> Remove
        </Button>
      </div>
    </div>
  );
};
