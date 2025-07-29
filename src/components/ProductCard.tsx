import React, { useState, useRef, useEffect } from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Product } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  variant = 'vertical',
  className 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatPrice = (price: number) => `₹${price.toLocaleString()}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const baseClasses = cn(
    "group relative overflow-hidden rounded-3xl bg-gradient-card border border-primary/20 backdrop-blur-xl transition-all duration-700 hover:border-primary/50 hover:shadow-floating hover:scale-105",
    "opacity-0 translate-y-10",
    isVisible && "opacity-100 translate-y-0",
    className
  );

  if (variant === 'horizontal') {
    return (
      <div 
        ref={cardRef}
        className={cn(baseClasses, "flex min-w-[420px] h-72")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative w-1/2 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20"></div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between relative">
          <div>
            <h3 className="font-cinzel text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-foreground/70 text-sm leading-relaxed mb-4">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {formatPrice(product.price)}/kg
            </div>
            <Button
              variant="cart"
              size="icon"
              onClick={handleAddToCart}
              className={cn(
                "transition-all duration-300",
                isHovered ? "scale-110 shadow-glow" : ""
              )}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={cardRef}
      className={cn(baseClasses, "flex flex-col h-96")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Add to Cart Overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-300",
          isHovered ? "opacity-100 bg-black/30" : "opacity-0"
        )}>
          <Button
            variant="hero"
            onClick={handleAddToCart}
            className="transform scale-90 hover:scale-100"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-cinzel text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-foreground/70 text-sm leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {formatPrice(product.price)}/kg
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};