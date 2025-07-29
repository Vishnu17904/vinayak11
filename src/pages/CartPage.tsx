import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => `₹${price.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-background pt-24 pb-8">
      {/* Background Effects */}
      <div className="background-overlay"></div>
      <div className="floating-orbs">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Button>
          <h1 className="font-cinzel text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Shopping Cart
          </h1>
        </div>

        {state.items.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-card/50 rounded-3xl p-12 border border-primary/20 backdrop-blur-sm">
              <ShoppingCart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-3xl font-cinzel font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground text-lg mb-8">Add some delicious items to get started!</p>
              <Button 
                variant="hero" 
                onClick={() => navigate('/')}
                className="px-8 py-3"
              >
                Start Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-card/50 rounded-2xl p-6 border border-primary/20 backdrop-blur-sm hover:bg-card/70 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-cinzel text-xl font-bold text-foreground mb-2">{item.name}</h3>
                      <p className="text-muted-foreground mb-4">{formatPrice(item.price)}/kg</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-10 w-10 ml-4"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-2xl text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-card rounded-2xl p-6 border border-primary/20 backdrop-blur-sm sticky top-24">
                <h2 className="font-cinzel text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span>Items ({state.itemCount})</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Delivery</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="border-t border-primary/20 pt-4">
                    <div className="flex justify-between text-2xl font-bold">
                      <span className="font-cinzel">Total:</span>
                      <span className="text-primary">{formatPrice(state.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="hero" 
                    className="w-full text-lg py-3"
                    onClick={() => {
                      alert(`Order Total: ${formatPrice(state.total)}\nThank you for choosing Vinayak Sweets!`);
                      clearCart();
                      navigate('/');
                    }}
                  >
                    Checkout - {formatPrice(state.total)}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};