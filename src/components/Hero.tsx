import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slideUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Ambient Light Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-10 text-center max-w-5xl mx-auto px-6 opacity-0">
        <div className="space-y-8">
          {/* Main Title */}
          <h1 className="font-cinzel text-4xl md:text-6xl lg:text-8xl font-black leading-tight">
            <span className="block bg-gradient-primary bg-clip-text text-transparent animate-glow">
              Vinayak Sweets
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-light text-foreground/80 mt-2">
              & Namkeens
            </span>
          </h1>

          {/* Tagline */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-primary font-semibold tracking-widest uppercase">
              Premium Collection
            </p>
            <p className="text-base md:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Experience the finest traditional sweets and namkeens crafted with love, 
              premium ingredients, and generations of expertise. Every bite tells a story 
              of authentic flavors and uncompromising quality.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              variant="hero" 
              size="hero"
              onClick={() => scrollToSection('featured')}
              className="group"
            >
              Explore Collection
              <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">25+</div>
              <div className="text-sm text-foreground/60">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-foreground/60">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-foreground/60">Varieties</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown 
          className="h-8 w-8 text-primary cursor-pointer hover:scale-110 transition-transform"
          onClick={() => scrollToSection('featured')}
        />
      </div>
    </section>
  );
};