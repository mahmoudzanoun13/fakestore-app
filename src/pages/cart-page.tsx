import { useNavigate } from 'react-router';
import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartItem } from '@/components/cart/cart-item';
import { OrderSummary } from '@/components/cart/order-summary';

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
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleQuantityChange}
              onRemove={removeFromCart}
              onNavigate={(id) => navigate(`/product/${id}`)}
            />
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
          <OrderSummary totalItems={totalItems} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};
