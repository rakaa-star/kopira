import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Coffee, ArrowRight, QrCode, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { menuItems } from '../data/menu';
import { MenuCard } from './MenuCard';

export function QROrderPage() {
  const { tableNumber: tableParam } = useParams();
  const navigate = useNavigate();
  const { setTableNumber } = useApp();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (tableParam) {
      setTableNumber(tableParam.padStart(2, '0'));
    }
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, [tableParam]);

  const tableNo = (tableParam || '01').padStart(2, '0');
  const featuredItems = menuItems.filter(i => i.isBestSeller).slice(0, 4);

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-[#0D0703] flex items-center justify-center px-6">
        <div className="text-center">
          {/* Animated logo */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-[#C4843E]/20 animate-ping" />
            <div className="relative w-24 h-24 rounded-full bg-[#C4843E] flex items-center justify-center shadow-2xl shadow-[#C4843E]/40">
              <Coffee className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-[#C4843E]/20 border border-[#C4843E]/30 rounded-full px-4 py-1.5 mb-4">
              <QrCode className="w-4 h-4 text-[#C4843E]" />
              <span className="text-[#C4A882] text-sm">QR Code Terdeteksi</span>
            </div>
            <h1 className="text-white text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Selamat Datang di
            </h1>
            <h2 className="text-[#C4843E] text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              KOPIRA
            </h2>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#C4843E]/20 border border-[#C4843E]/40 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#C4843E]" />
            </div>
            <p className="text-white text-xl font-bold">Meja {tableNo}</p>
          </div>

          <p className="text-white/60 text-sm mb-8">
            "Secangkir Cerita di Setiap Tegukan"
          </p>

          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#C4843E]"
                style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* QR Header */}
      <div className="bg-[#1A0F0A] py-8 px-6 sticky top-0 z-30 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C4843E] flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold tracking-widest text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>KOPIRA</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#C4843E]/20 border border-[#C4843E]/30 rounded-full px-4 py-2">
            <MapPin className="w-4 h-4 text-[#C4843E]" />
            <span className="text-[#C4A882] text-sm font-semibold">Meja {tableNo}</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#3D1A08] to-[#1A0F0A] rounded-3xl p-6 mb-8 border border-[#C4843E]/20 shadow-lg">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 bg-[#C4843E]" style={{ transform: 'translate(30%, -40%)' }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#C4843E]" />
              <span className="text-[#C4A882] text-sm font-medium">Selamat Datang!</span>
            </div>
            <h2 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Anda di Meja {tableNo}
            </h2>
            <p className="text-white/60 text-sm mb-4">
              Pilih menu favorit Anda dan kami akan mengantarkannya langsung ke meja
            </p>
            <button
              onClick={() => navigate('/menu')}
              className="flex items-center gap-2 bg-[#C4843E] hover:bg-[#B8742E] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
            >
              Lihat Menu Lengkap <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-8">
          <p className="text-foreground font-semibold mb-4">Cara Memesan</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { step: '01', title: 'Pilih Menu', desc: 'Browse menu digital kami' },
              { step: '02', title: 'Kustomisasi', desc: 'Atur sesuai selera' },
              { step: '03', title: 'Bayar & Tunggu', desc: 'Kami antar ke meja' },
            ].map(s => (
              <div key={s.step} className="bg-card border border-border rounded-2xl p-4 text-center">
                <span className="text-[#C4843E] font-bold text-xs mb-1.5 block">{s.step}</span>
                <p className="text-foreground font-semibold text-xs mb-1">{s.title}</p>
                <p className="text-muted-foreground text-[11px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-foreground font-semibold">Menu Favorit</p>
            <button onClick={() => navigate('/menu')} className="text-[#C4843E] text-xs hover:underline">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featuredItems.map(item => <MenuCard key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
