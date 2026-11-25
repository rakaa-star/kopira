import { Link, useLocation } from 'react-router';
import { Coffee, Instagram, Twitter, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  const location = useLocation();
  if (location.pathname === '/admin') return null;

  return (
    <footer className="bg-[#0D0703] text-white/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#C4843E] flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-xl tracking-[0.15em]" style={{ fontFamily: "'Playfair Display', serif" }}>KOPIRA</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Secangkir Cerita di Setiap Tegukan.<br />
              Merayakan cita rasa kopi Indonesia dengan sentuhan premium.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Facebook, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C4843E] hover:text-[#C4843E] transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Menu</h4>
            <ul className="space-y-3">
              {['Kopi', 'Non Kopi', 'Signature', 'Dessert', 'Snack', 'Promo Hari Ini'].map(item => (
                <li key={item}>
                  <Link to="/menu" className="text-sm text-white/50 hover:text-[#C4843E] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Informasi</h4>
            <ul className="space-y-3">
              {[
                { label: 'Tentang Kopira', href: '/tentang' },
                { label: 'Program Loyalti', href: '/loyalti' },
                { label: 'Lacak Pesanan', href: '/order/tracking' },
                { label: 'Kontak Kami', href: '/kontak' },
                { label: 'Karir', href: '#' },
                { label: 'Media Kit', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-white/50 hover:text-[#C4843E] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Hubungi Kami</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C4843E] mt-0.5 shrink-0" />
                <p className="text-sm text-white/50">Jl. Sudirman Kav. 52, Jakarta Selatan, 12190</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C4843E] shrink-0" />
                <p className="text-sm text-white/50">+62 21 5550 8899</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C4843E] shrink-0" />
                <p className="text-sm text-white/50">halo@kopira.id</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C4843E] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white/50">Sen–Jum: 07.00–22.00</p>
                  <p className="text-sm text-white/50">Sab–Min: 08.00–23.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">© 2026 KOPIRA. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Kebijakan Privasi', 'Syarat & Ketentuan', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
