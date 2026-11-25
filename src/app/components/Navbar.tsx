import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ShoppingCart, Menu, X, Coffee, Star, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/menu', label: 'Menu' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/loyalti', label: 'Loyalti' },
  { href: '/kontak', label: 'Kontak' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { cartCount, loyaltyPoints } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  if (isAdminPage) return null;

  const isHeroPage = location.pathname === '/';
  const navBg = isScrolled || !isHeroPage
    ? 'bg-[#1A0F0A]/95 backdrop-blur-xl shadow-lg shadow-black/20'
    : 'bg-transparent';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-[#C4843E] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Coffee className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <span className="text-white font-bold tracking-[0.15em] text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  KOPIRA
                </span>
                <p className="text-[#C4A882] text-[9px] tracking-[0.2em] uppercase leading-none -mt-0.5">Premium Coffee</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm tracking-wide transition-colors duration-200 relative group ${
                    location.pathname === link.href
                      ? 'text-[#C4843E]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#C4843E] transition-all duration-300 ${
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Loyalty Points */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C4843E]/20 border border-[#C4843E]/30">
                <Star className="w-3.5 h-3.5 text-[#C4843E]" fill="currentColor" />
                <span className="text-[#C4A882] text-xs font-medium">{loyaltyPoints.toLocaleString('id')} pts</span>
              </div>

              {/* Cart */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2.5 rounded-full bg-[#C4843E]/20 hover:bg-[#C4843E]/30 border border-[#C4843E]/30 transition-all text-white"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C4843E] rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-2 text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-72 bg-[#1A0F0A] shadow-2xl transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 pt-24 flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === link.href
                    ? 'bg-[#C4843E]/20 text-[#C4843E]'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 px-4 py-3">
                <Star className="w-4 h-4 text-[#C4843E]" fill="currentColor" />
                <span className="text-[#C4A882] text-sm">{loyaltyPoints.toLocaleString('id')} poin loyalti</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
