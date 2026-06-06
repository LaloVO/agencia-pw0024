import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { site } = useSiteUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (hash: string) => {
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${hash}`);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const navLinks = [
    { label: 'Inicio', action: () => handleNavClick('inicio') },
    { label: 'Servicios', action: () => handleNavClick('servicios') },
    { label: 'Destacado', action: () => handleNavClick('insignia') },
    { label: 'Propiedades', action: () => handleNavClick('propiedades') },
    { label: 'Sobre Mí', action: () => handleNavClick('perfil') },
  ];

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-800/40 shadow-elegant py-3 px-6 md:px-8'
            : 'top-0 left-0 w-full py-6 px-6 md:px-12 bg-transparent'
        } flex justify-between items-center`}
      >
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif font-extrabold text-xl md:text-2xl tracking-tight text-primary dark:text-white transition-colors"
        >
          {site?.site_name || 'Asesor Demo'}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm uppercase tracking-widest font-sans font-semibold">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="text-primary/80 dark:text-white/80 hover:text-accent dark:hover:text-accent transition-colors duration-300 font-sans"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/mapa"
            className="text-primary/80 dark:text-white/80 hover:text-accent dark:hover:text-accent transition-colors duration-300 font-sans"
          >
            Mapa
          </Link>
          <Link
            to="/solicita-inmueble"
            className="bg-accent text-white font-sans text-xs uppercase tracking-widest font-bold py-2.5 px-5 rounded-full hover:bg-accent/90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Búsqueda Inteligente
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-primary dark:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-background/98 dark:bg-slate-950/98 backdrop-blur-md z-40 md:hidden flex flex-col items-center justify-center gap-6 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={link.action}
            className="font-serif text-2xl font-bold text-primary dark:text-white hover:text-accent transition-colors"
          >
            {link.label}
          </button>
        ))}
        <Link
          to="/mapa"
          onClick={() => setIsMobileMenuOpen(false)}
          className="font-serif text-2xl font-bold text-primary dark:text-white hover:text-accent transition-colors"
        >
          Mapa
        </Link>
        <Link
          to="/solicita-inmueble"
          onClick={() => setIsMobileMenuOpen(false)}
          className="mt-4 bg-accent text-white font-sans text-sm uppercase tracking-widest font-bold py-3.5 px-8 rounded-full hover:bg-accent/90 transition-all duration-300 shadow-md"
        >
          Búsqueda Inteligente
        </Link>
      </div>
    </>
  );
};

export default Navbar;
