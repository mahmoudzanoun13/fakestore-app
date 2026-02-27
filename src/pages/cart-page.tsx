import { useNavigate } from 'react-router';
import { useCartStore } from '@/store/cart.store';
import { formatPrice } from '@/utils/format-price';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, totalItems, updateQuantity, removeFromCart, clearCart } =
    useCartStore();

  const handleQuantityChange = (id: number, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty > 0) {
      updateQuantity(id, newQty);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <EmptyState message="Your cart is currently empty.">
          <ShoppingBag size={64} className="mb-4 text-secondary/50" />
          <Button onClick={() => navigate('/')} className="mt-4">
            Start Shopping
          </Button>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-foreground">Shopping Cart</h1>
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 w-fit"
        >
          <ArrowLeft size={16} /> Continue Shopping
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-lg border border-border shadow-sm"
            >
              <div
                className="w-24 h-24 bg-secondary rounded flex items-center justify-center p-2 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0 text-center sm:text-left w-full sm:w-auto px-4 sm:px-0">
                <h3
                  className="font-semibold text-secondary-foreground hover:text-primary cursor-pointer line-clamp-2 sm:line-clamp-1"
                  onClick={() => navigate(`/product/${item.id}`)}
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
                  onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
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
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={16} className="mr-1" /> Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <Button
              variant="secondary"
              className="text-muted hover:text-danger"
              onClick={() => clearCart()}
            >
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-border shadow-md sticky top-24">
            <h2 className="text-xl font-bold text-secondary-foreground mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-muted">
                <span>Items ({totalItems})</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className="text-success font-medium">Free</span>
              </div>
              <div className="pt-4 border-t border-secondary flex justify-between text-lg font-bold text-secondary-foreground">
                <span>Total</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            <Button className="w-full mt-8 py-4 text-lg font-bold shadow-lg shadow-primary/20">
              Proceed to Checkout
            </Button>
            <p className="mt-4 text-xs text-center text-muted italic">
              Checkout is currently disabled for this demo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
