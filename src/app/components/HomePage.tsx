import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { ChevronRight, ArrowRight, Star, Users, Coffee, Award, Quote, QrCode, Leaf, Zap } from 'lucide-react';
import { menuItems, testimonials, promos } from '../data/menu';
import { MenuCard } from './MenuCard';

const heroImages = [
  'https://images.unsplash.com/photo-1533630757306-cbadb934bcb1?w=1920&h=1080&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1645677020082-721a854c24f2?w=1920&h=1080&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1469631423273-6995642a6a40?w=1920&h=1080&fit=crop&auto=format',
];

const stats = [
  { value: '50+', label: 'Menu Premium', icon: Coffee },
  { value: '12K+', label: 'Pelanggan Setia', icon: Users },
  { value: '4.9', label: 'Rating Rata-rata', icon: Star },
  { value: '5 Thn', label: 'Pengalaman', icon: Award },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1593543294918-ca3634e04cdb?w=600&h=600&fit=crop&auto=format', alt: 'Latte Art' },
  { src: 'https://images.unsplash.com/photo-1563311977-d285756282dc?w=600&h=800&fit=crop&auto=format', alt: 'Cappuccino' },
  { src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop&auto=format', alt: 'Coffee Beans' },
  { src: 'https://images.unsplash.com/photo-1649652127-2e5e59e86a7a?w=600&h=600&fit=crop&auto=format', alt: 'Iced Coffee' },
  { src: 'https://images.unsplash.com/photo-1558122104-355edad709f6?w=600&h=400&fit=crop&auto=format', alt: 'Cold Brew' },
  { src: 'https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=600&h=600&fit=crop&auto=format', alt: 'Coffee Story' },
];

export function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [promoIndex, setPromoIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredItems = menuItems.filter(i => i.isBestSeller).slice(0, 4);

  return (
    <div className="overflow-x-hidden">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* Background slides */}
        {heroImages.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === heroIndex ? 1 : 0 }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0703]/90 via-[#0D0703]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0703]/80 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-[#C4843E]/20 border border-[#C4843E]/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C4843E] animate-pulse" />
              <span className="text-[#C4A882] text-xs font-medium tracking-widest uppercase">Kini Hadir di Jakarta</span>
            </div>

            {/* Headline */}
            <h1 className="text-white leading-[1.1] mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700 }}>
              Secangkir Cerita<br />
              <span className="text-[#C4843E] italic">di Setiap Tegukan</span>
            </h1>

            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Kopi premium single origin Indonesia, diracik dengan cinta oleh barista berpengalaman. Nikmati pengalaman café yang tak terlupakan.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/menu')}
                className="flex items-center gap-2 bg-[#C4843E] hover:bg-[#B8742E] text-white px-8 py-3.5 rounded-full font-medium transition-all hover:shadow-xl hover:shadow-[#C4843E]/30 hover:-translate-y-0.5"
              >
                Jelajahi Menu
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/tentang')}
                className="flex items-center gap-2 text-white/80 hover:text-white px-6 py-3.5 rounded-full border border-white/20 hover:border-white/40 transition-all"
              >
                Cerita Kami
              </button>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`rounded-full transition-all duration-300 ${i === heroIndex ? 'w-8 h-2 bg-[#C4843E]' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>

        {/* Floating QR card */}
        <div className="hidden lg:block absolute right-10 bottom-20 z-10">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl max-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <QrCode className="w-5 h-5 text-[#C4843E]" />
              <span className="text-white text-xs font-semibold">Scan & Order</span>
            </div>
            <p className="text-white/60 text-[11px] leading-relaxed">Scan QR di meja Anda untuk memesan langsung tanpa antri</p>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="bg-[#1A0F0A] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#C4843E]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#C4843E]" />
                </div>
                <div>
                  <p className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</p>
                  <p className="text-white/50 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED MENU ═══════════════ */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-2">Menu Pilihan</p>
              <h2 className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                Favorit Pelanggan
              </h2>
            </div>
            <Link to="/menu" className="hidden sm:flex items-center gap-2 text-[#C4843E] hover:text-[#B8742E] text-sm font-medium transition-colors">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map(item => <MenuCard key={item.id} item={item} />)}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/menu" className="inline-flex items-center gap-2 text-[#C4843E] text-sm font-medium">
              Lihat Semua Menu <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROMO BANNER ═══════════════ */}
      <section className="py-16 px-6 bg-[#FAF0E6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {promos.map(promo => (
              <div
                key={promo.id}
                className="relative overflow-hidden rounded-3xl h-56 cursor-pointer group"
                onClick={() => navigate('/menu')}
              >
                <img src={promo.image} alt={promo.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0D0703]/80 to-[#0D0703]/20" />
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <span className="text-[#C4A882] text-xs font-semibold tracking-widest uppercase mb-1">{promo.subtitle}</span>
                  <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{promo.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{promo.description}</p>
                  <span className="inline-flex items-center gap-1 text-[#C4843E] text-xs font-medium">
                    Gunakan kode: <strong className="bg-[#C4843E]/20 px-2 py-0.5 rounded">{promo.code}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ COFFEE STORY ═══════════════ */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1579265898841-79c7890d69cf?w=800&h=1000&fit=crop&auto=format"
                  alt="Barista KOPIRA"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-5 shadow-2xl border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#C4843E]/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#C4843E]" />
                  </div>
                  <div>
                    <p className="text-foreground font-bold text-sm">Barista Champion</p>
                    <p className="text-muted-foreground text-xs">Indonesia 2024</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#C4843E]" fill="currentColor" />)}
                </div>
              </div>
            </div>

            <div>
              <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-3">Filosofi Kami</p>
              <h2 className="text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', lineHeight: 1.2 }}>
                Dari Kebun ke Cangkir,<br />
                <span className="text-[#C4843E] italic">Setiap Detail Bermakna</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                KOPIRA lahir dari kecintaan mendalam terhadap kopi Indonesia. Kami berjalan langsung ke kebun-kebun kopi terbaik di Aceh, Toraja, Flores, dan Bali untuk memilih biji dengan cermat.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Setiap cangkir yang kami sajikan adalah hasil dari perjalanan panjang — dari tangan petani yang merawat pohon kopi dengan penuh kasih, hingga tangan barista kami yang menyeduh dengan presisi.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Leaf, label: 'Single Origin', desc: 'Biji terpilih' },
                  { icon: Zap, label: 'Segar Setiap Hari', desc: 'Roast mingguan' },
                  { icon: Award, label: 'Berpenghargaan', desc: 'Top 10 Café Jakarta' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="text-center p-4 rounded-2xl bg-muted/50">
                    <div className="w-10 h-10 rounded-xl bg-[#C4843E]/20 flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-5 h-5 text-[#C4843E]" />
                    </div>
                    <p className="text-foreground font-semibold text-xs">{label}</p>
                    <p className="text-muted-foreground text-[11px]">{desc}</p>
                  </div>
                ))}
              </div>
              <Link to="/tentang" className="inline-flex items-center gap-2 bg-[#C4843E] hover:bg-[#B8742E] text-white px-8 py-3.5 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-[#C4843E]/30">
                Baca Cerita Lengkap <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-20 px-6 bg-[#1A0F0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-3">Kata Mereka</p>
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Ribuan Cerita Bahagia
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-[#C4843E]/30 transition-all">
                <Quote className="w-8 h-8 text-[#C4843E]/40 mb-4" fill="currentColor" />
                <p className="text-white/80 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#C4843E]" fill="currentColor" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-3">Galeri</p>
            <h2 className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Momen yang Kami Abadikan
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl bg-muted ${i === 1 ? 'row-span-2' : ''} aspect-square group`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#0D0703]/0 group-hover:bg-[#0D0703]/30 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="py-20 px-6 bg-[#C4843E]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Siap Memesan?
          </h2>
          <p className="text-white/80 text-lg mb-8">Scan QR di meja Anda atau pesan langsung melalui menu digital kami</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/menu')}
              className="bg-white text-[#C4843E] hover:bg-white/90 px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl"
            >
              Pesan Sekarang
            </button>
            <button
              onClick={() => navigate('/meja/07')}
              className="flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all"
            >
              <QrCode className="w-5 h-5" />
              Simulasi QR Order
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
