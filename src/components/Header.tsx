import React, { useState, useEffect } from 'react';
import { Menu, X, Cookie, LogIn, UserPlus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Cart } from '@/components/Cart';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignupForm';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';


export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [user, setUser] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

 const scrollToSection = (sectionId: string) => {
  if (location.pathname !== '/') {
    // Navigate to home first, then scroll
    navigate('/', { state: { scrollTo: sectionId } });
  } else {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }
};

  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-primary/30 shadow-glow py-4' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Cookie className="h-12 w-12 text-primary animate-glow" fill="currentColor" />
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

          {/* Right side: Auth / Cart / Mobile menu */}
          <div className="flex items-center gap-3">
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/profile">
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLoginForm(true)}
                    className="flex items-center gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSignupForm(true)}
                    className="flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Cart Icon */}
            <Cart />

            {/* Mobile Menu Toggle */}
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

              {/* Mobile Auth Buttons */}
              <div className="flex gap-3 pt-4">
                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 flex-1"
                      asChild
                    >
                      <Link to="/profile">
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 flex-1"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowLoginForm(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 flex-1"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowSignupForm(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 flex-1"
                    >
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginForm && (
        <LoginForm onClose={() => setShowLoginForm(false)} />
      )}

      {/* Signup Modal */}
      {showSignupForm && (
        <SignupForm onClose={() => setShowSignupForm(false)} />
      )}

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



// import React, { useState, useEffect } from 'react';
// import { Menu, X, Cookie } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Cart } from '@/components/Cart';


// export const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <header 
//         className={`fixed top-0 w-full z-40 transition-all duration-500 ${
//           isScrolled 
//             ? 'bg-background/95 backdrop-blur-xl border-b border-primary/30 shadow-glow py-4' 
//             : 'bg-transparent py-6'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Cookie 
//                 className="h-12 w-12 text-primary animate-glow" 
//                 fill="currentColor"
//               />
//               <div className="absolute inset-0 h-12 w-12 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
//             </div>
//             <div>
//               <h1 className="font-cinzel text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//                 Vinayak Sweets
//               </h1>
//               <p className="text-xs text-muted-foreground font-medium tracking-widest">
//                 & NAMKEENS
//               </p>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-8">
//             {['home', 'featured', 'products', 'about', 'contact'].map((section) => (
//               <button
//                 key={section}
//                 onClick={() => scrollToSection(section)}
//                 className="relative text-foreground/80 hover:text-primary font-medium transition-all duration-300 hover:scale-105 capitalize group"
//               >
//                 {section}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
//               </button>
//             ))}
//           </nav>

//           {/* Cart & Mobile Menu */}
//           <div className="flex items-center gap-4">
//             <Cart />
            
//             {/* Mobile Menu Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden text-primary"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-glow">
//             <nav className="flex flex-col p-6 space-y-4">
//               {['home', 'featured', 'products', 'about', 'contact'].map((section) => (
//                 <button
//                   key={section}
//                   onClick={() => scrollToSection(section)}
//                   className="text-left text-foreground/80 hover:text-primary font-medium transition-colors capitalize py-2"
//                 >
//                   {section}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         )}
//       </header>

//       {/* Background Effects */}
//       <div className="background-overlay"></div>
//       <div className="floating-orbs">
//         <div className="orb"></div>
//         <div className="orb"></div>
//         <div className="orb"></div>
//       </div>
//     </>
//   );
// };

