import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/format-price';

type OrderSummaryProps = {
  totalItems: number;
  totalPrice: number;
};

export const OrderSummary = ({ totalItems, totalPrice }: OrderSummaryProps) => {
  return (
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
  );
};
