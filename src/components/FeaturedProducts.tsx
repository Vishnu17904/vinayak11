import React, { useRef, useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/Product';

export const FeaturedProducts: React.FC = () => {
  const { products, loading } = useProducts();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Get last 5 featured products
  const featured: Product[] = products
    .filter((p) => p.isFeatured)
    .slice(-5)
    .reverse();

  // ✅ Run observer ONLY after data is ready
  useEffect(() => {
    if (loading || featured.length === 0) return;

    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(current);

    // ✅ Manual check in case already in view on refresh
    const rect = current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
    }

    return () => observer.disconnect();
  }, [loading, featured.length]); // ✅ Depend on loading and featured

  // ✅ Don't return early — render the section even if `!isVisible`
  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-cinzel text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            Featured Products
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Discover our most beloved creations, made with traditional recipes
            and the finest ingredients
          </p>
        </div>

        {/* Featured Product List */}
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-8 scroll-smooth scrollbar-hide">
            {featured.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-20'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <ProductCard product={product} variant="horizontal" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};













// import React, { useRef, useEffect, useState } from 'react';
// import { ProductCard } from '@/components/ProductCard';
// import { featuredProducts } from '@/data/products';

// export const FeaturedProducts = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section 
//       id="featured" 
//       ref={sectionRef}
//       className="relative py-20 overflow-hidden"
//     >
//       {/* Background Effects */}
//       <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      
//       {/* Ambient Glow */}
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50"></div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6">
//         {/* Section Header */}
//         <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <h2 className="font-cinzel text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
//             Featured Products
//           </h2>
//           <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
//             Discover our most beloved creations, made with traditional recipes and the finest ingredients
//           </p>
//         </div>

//         {/* Products Scroll Container */}
//         <div className="relative">
//           <div className="flex gap-8 overflow-x-auto pb-8 scroll-smooth scrollbar-hide">
//             {featuredProducts.map((product, index) => (
//               <div 
//                 key={product.id}
//                 className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
//                 style={{ transitionDelay: `${index * 200}ms` }}
//               >
//                 <ProductCard 
//                   product={product} 
//                   variant="horizontal"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Scroll Indicators */}
//           <div className="flex justify-center mt-8 gap-2">
//             {featuredProducts.map((_, index) => (
//               <div 
//                 key={index}
//                 className="w-2 h-2 rounded-full bg-primary/30 hover:bg-primary/60 transition-colors cursor-pointer"
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//     </section>
//   );
// };