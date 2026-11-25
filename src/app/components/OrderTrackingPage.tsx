import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, Circle, Clock, Coffee, Package, Truck, Star, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

const statuses = [
  { key: 'diterima', label: 'Pesanan Diterima', desc: 'Pesanan Anda telah masuk ke sistem kami', icon: CheckCircle2 },
  { key: 'diproses', label: 'Sedang Diproses', desc: 'Kasir sedang memverifikasi pesanan Anda', icon: Package },
  { key: 'disiapkan', label: 'Sedang Disiapkan', desc: 'Barista kami sedang meracik minuman Anda', icon: Coffee },
  { key: 'diantar', label: 'Siap Diantar', desc: 'Pesanan dalam perjalanan ke meja Anda', icon: Truck },
  { key: 'selesai', label: 'Selesai', desc: 'Selamat menikmati! Terima kasih sudah berkunjung', icon: Star },
];

export function OrderTrackingPage() {
  const navigate = useNavigate();
  const { currentOrder, setCurrentOrder } = useApp();
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!currentOrder) return;
    const idx = statuses.findIndex(s => s.key === currentOrder.status);
    setStatusIndex(Math.max(0, idx));

    if (currentOrder.status !== 'selesai') {
      const timer = setInterval(() => {
        setStatusIndex(prev => {
          const next = prev + 1;
          if (next >= statuses.length) {
            clearInterval(timer);
            setCurrentOrder({ ...currentOrder, status: 'selesai' });
            return statuses.length - 1;
          }
          const newStatus = statuses[next].key as any;
          setCurrentOrder({ ...currentOrder, status: newStatus });
          return next;
        });
      }, 5000);
      return () => clearInterval(timer);
    }
  }, []);

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-foreground text-xl font-semibold mb-2">Tidak Ada Pesanan Aktif</h2>
          <p className="text-muted-foreground text-sm mb-8">Buat pesanan terlebih dahulu untuk melacak statusnya</p>
          <button onClick={() => navigate('/menu')} className="bg-[#C4843E] hover:bg-[#B8742E] text-white px-8 py-3.5 rounded-full font-medium transition-all">
            Mulai Pesan
          </button>
        </div>
      </div>
    );
  }

  const currentStatus = statuses[statusIndex];
  const isComplete = statusIndex === statuses.length - 1;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Order Header */}
        <div className="bg-card border border-border rounded-3xl p-6 mb-8 shadow-sm">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[#C4843E] text-xs font-medium tracking-widest uppercase mb-1">Nomor Pesanan</p>
              <h2 className="text-foreground font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {currentOrder.id}
              </h2>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${isComplete ? 'bg-green-100 text-green-700' : 'bg-[#C4843E]/10 text-[#C4843E]'}`}>
              {isComplete ? '✓ Selesai' : '⏳ Sedang Diproses'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Nomor Meja</p>
              <p className="text-foreground font-semibold">Meja {currentOrder.customer.nomorMeja}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Metode Bayar</p>
              <p className="text-foreground font-semibold capitalize">{currentOrder.paymentMethod.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Waktu Pesan</p>
              <p className="text-foreground font-semibold">{new Date(currentOrder.createdAt).toLocaleTimeString('id', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Total</p>
              <p className="text-[#C4843E] font-bold">Rp {currentOrder.total.toLocaleString('id')}</p>
            </div>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="bg-card border border-border rounded-3xl p-6 mb-8 shadow-sm">
          <h3 className="text-foreground font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Status Pesanan
          </h3>

          <div className="space-y-0">
            {statuses.map((status, i) => {
              const isActive = i === statusIndex;
              const isDone = i < statusIndex;
              const Icon = status.icon;

              return (
                <div key={status.key} className="flex gap-4">
                  {/* Line + Icon */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isDone ? 'bg-green-500' : isActive ? 'bg-[#C4843E]' : 'bg-muted border-2 border-border'
                    }`}>
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : isActive ? (
                        <Icon className="w-5 h-5 text-white animate-pulse" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    {i < statuses.length - 1 && (
                      <div className={`w-0.5 h-10 my-1 transition-all duration-500 ${isDone ? 'bg-green-500' : 'bg-border'}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-2 pt-2 flex-1 ${i === statuses.length - 1 ? '' : 'mb-2'}`}>
                    <p className={`font-semibold text-sm transition-colors ${isActive ? 'text-[#C4843E]' : isDone ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {status.label}
                    </p>
                    <p className={`text-xs mt-0.5 ${isActive || isDone ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                      {status.desc}
                    </p>
                    {isActive && !isComplete && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <Clock className="w-3 h-3 text-[#C4843E]" />
                        <span className="text-[#C4843E] text-xs">Estimasi 2-3 menit</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card border border-border rounded-3xl p-6 mb-8">
          <h3 className="text-foreground font-semibold mb-4">Detail Pesanan</h3>
          <div className="space-y-3">
            {currentOrder.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
                  <img src={item.menuItem.image} alt={item.menuItem.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.menuItem.name}</p>
                  <p className="text-xs text-muted-foreground">{item.size} · {item.sugarLevel} · x{item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">Rp {item.subtotal.toLocaleString('id')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={() => navigate('/')} className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-border rounded-2xl text-muted-foreground hover:text-foreground text-sm transition-all">
            <Home className="w-4 h-4" /> Beranda
          </button>
          {isComplete && (
            <button onClick={() => navigate('/menu')} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#C4843E] hover:bg-[#B8742E] text-white rounded-2xl font-semibold text-sm transition-all">
              <Coffee className="w-4 h-4" /> Pesan Lagi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
