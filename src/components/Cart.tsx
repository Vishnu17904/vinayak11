import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  const formatPrice = (price: number) => `₹${price.toLocaleString()}`;

  return (
    <>
      {/* Cart Icon Button */}
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
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

      {/* Cart Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-card border-l-2 border-primary shadow-floating overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/20 bg-gradient-primary">
              <h2 className="text-2xl font-cinzel font-bold text-primary-foreground">Your Cart</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Cart Content */}
            <div className="flex flex-col h-full">
              {state.items.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-6">
                  <div className="text-center">
                    <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground">Add some delicious items to get started!</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {state.items.map((item) => (
                      <div 
                        key={item.id} 
                        className="bg-card/50 rounded-lg p-4 border border-primary/20 backdrop-blur-sm hover:bg-card/70 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{item.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{formatPrice(item.price)}/kg</p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8 ml-2"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Footer */}
                  <div className="p-6 border-t border-primary/20 bg-gradient-card">
                    <div className="space-y-4">
                      {/* Total */}
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="font-cinzel">Total:</span>
                        <span className="text-primary">{formatPrice(state.total)}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <Button 
                          variant="hero" 
                          className="w-full"
                          onClick={() => {
                            // Handle checkout
                            alert(`Order Total: ${formatPrice(state.total)}\nThank you for choosing Vinayak Sweets!`);
                            clearCart();
                            setIsOpen(false);
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};