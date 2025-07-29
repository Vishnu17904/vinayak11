import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ProductsGrid } from '@/components/ProductsGrid';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <ProductsGrid />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
