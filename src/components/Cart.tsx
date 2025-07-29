import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { state } = useCart();
  const navigate = useNavigate();

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate('/cart')}
        className="relative hover:scale-110 transition-transform duration-300"
      >
        <ShoppingCart className="h-5 w-5" />
        {state.itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground p-0 flex items-center justify-center text-xs font-bold animate-pulse">
            {state.itemCount}
          </Badge>
        )}
      </Button>
    </div>
  );
};