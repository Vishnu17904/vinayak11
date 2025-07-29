import React, { useState, useEffect } from 'react';
import { Menu, X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Cart } from '@/components/Cart';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-xl border-b border-primary/30 shadow-glow py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Cookie 
                className="h-12 w-12 text-primary animate-glow" 
                fill="currentColor"
              />
              <div className="absolute inset-0 h-12 w-12 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            <div>
              <h1 className="font-cinzel text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Vinayak Sweets
              </h1>
              <p className="text-xs text-muted-foreground font-medium tracking-widest">
                & NAMKEENS
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['home', 'featured', 'products', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="relative text-foreground/80 hover:text-primary font-medium transition-all duration-300 hover:scale-105 capitalize group"
              >
                {section}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Cart />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-glow">
            <nav className="flex flex-col p-6 space-y-4">
              {['home', 'featured', 'products', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-left text-foreground/80 hover:text-primary font-medium transition-colors capitalize py-2"
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Background Effects */}
      <div className="background-overlay"></div>
      <div className="floating-orbs">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>
    </>
  );
};