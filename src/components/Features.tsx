import React, { useRef, useEffect, useState } from 'react';
import { Award, Heart, Truck, Users } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We use only the finest ingredients sourced from trusted suppliers to ensure every product meets our high standards of quality and taste.'
  },
  {
    icon: Heart,
    title: 'Traditional Recipes',
    description: 'Our recipes have been passed down through generations, preserving the authentic flavors and time-tested methods of preparation.'
  },
  {
    icon: Truck,
    title: 'Fresh Delivery',
    description: 'We ensure that our products reach you fresh and in perfect condition with our efficient delivery network and proper packaging.'
  },
  {
    icon: Users,
    title: 'Customer Service',
    description: 'Our dedicated team is always ready to help you with your orders and ensure you have the best experience with our products.'
  }
];

export const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-primary/5"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-cinzel text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            Why Choose Us
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Experience the difference that quality, tradition, and passion make
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.title}
                className={`group relative p-8 bg-gradient-card rounded-3xl border border-primary/20 backdrop-blur-xl hover:border-primary/50 transition-all duration-700 hover:shadow-floating hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-primary rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="font-cinzel text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">100%</div>
            <div className="text-foreground/60">Natural Ingredients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">25+</div>
            <div className="text-foreground/60">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">500+</div>
            <div className="text-foreground/60">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">50+</div>
            <div className="text-foreground/60">Product Varieties</div>
          </div>
        </div>
      </div>
    </section>
  );
};