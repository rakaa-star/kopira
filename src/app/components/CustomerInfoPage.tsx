import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, User, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function CustomerInfoPage() {
  const navigate = useNavigate();
  const { tableNumber, setTableNumber, cart } = useApp();
  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [catatan, setCatatan] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!nama.trim()) e.nama = 'Nama harus diisi';
    if (!telepon.trim()) e.telepon = 'Nomor telepon harus diisi';
    else if (!/^(\+62|08)[0-9]{8,11}$/.test(telepon)) e.telepon = 'Format nomor tidak valid';
    if (!tableNumber.trim()) e.meja = 'Nomor meja harus diisi';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    navigate('/checkout/payment');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {['Keranjang', 'Informasi', 'Pembayaran', 'Selesai'].map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${i === 1 ? 'bg-[#C4843E] text-white' : i < 1 ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                {i < 1 ? '✓' : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === 1 ? 'text-[#C4843E] font-medium' : 'text-muted-foreground'}`}>{step}</span>
              {i < 3 && <div className={`h-px w-8 ${i < 1 ? 'bg-green-500' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Keranjang
        </button>

        <h1 className="text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem' }}>
          Informasi Pemesan
        </h1>
        <p className="text-muted-foreground text-sm mb-8">Isi data diri Anda untuk melanjutkan pesanan</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Nama Lengkap *</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={nama}
                onChange={e => setNama(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className={`w-full pl-11 pr-4 py-3.5 bg-card border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50 transition-all ${errors.nama ? 'border-red-400' : 'border-border focus:border-[#C4843E]'}`}
              />
            </div>
            {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
          </div>

          {/* Telepon */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Nomor Telepon *</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={telepon}
                onChange={e => setTelepon(e.target.value)}
                placeholder="08xx-xxxx-xxxx"
                className={`w-full pl-11 pr-4 py-3.5 bg-card border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50 transition-all ${errors.telepon ? 'border-red-400' : 'border-border focus:border-[#C4843E]'}`}
              />
            </div>
            {errors.telepon && <p className="text-red-500 text-xs mt-1">{errors.telepon}</p>}
          </div>

          {/* Nomor Meja */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Nomor Meja *</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={tableNumber}
                onChange={e => setTableNumber(e.target.value)}
                placeholder="Contoh: 07"
                className={`w-full pl-11 pr-4 py-3.5 bg-card border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50 transition-all ${errors.meja ? 'border-red-400' : 'border-border focus:border-[#C4843E]'}`}
              />
            </div>
            {errors.meja && <p className="text-red-500 text-xs mt-1">{errors.meja}</p>}
            <p className="text-xs text-muted-foreground mt-1">Nomor meja tertera pada QR code di meja Anda</p>
          </div>

          {/* Catatan */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Catatan Tambahan <span className="text-muted-foreground font-normal">(opsional)</span></label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
              <textarea
                value={catatan}
                onChange={e => setCatatan(e.target.value)}
                placeholder="Contoh: alergi kacang, minta gelas besar..."
                rows={3}
                className="w-full pl-11 pr-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50 focus:border-[#C4843E] resize-none transition-all"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#C4843E]/10 border border-[#C4843E]/20 rounded-2xl p-4">
            <p className="text-sm text-foreground font-medium mb-2">Pesanan Anda ({cart.reduce((s,c)=>s+c.quantity,0)} item):</p>
            {cart.map((c, i) => (
              <div key={i} className="flex justify-between text-xs text-muted-foreground py-0.5">
                <span>{c.menuItem.name} x{c.quantity} ({c.size})</span>
                <span>Rp {c.subtotal.toLocaleString('id')}</span>
              </div>
            ))}
          </div>

          <button type="submit" className="w-full py-4 bg-[#C4843E] hover:bg-[#B8742E] text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#C4843E]/30">
            Lanjut ke Pembayaran <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
