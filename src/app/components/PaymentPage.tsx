import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, QrCode, Smartphone, Building2, Wallet, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Order } from '../context/AppContext';

const paymentMethods = [
  {
    category: 'QRIS & E-Wallet',
    options: [
      { id: 'qris', label: 'QRIS', desc: 'Scan QR untuk bayar', icon: QrCode, color: '#E91E63' },
      { id: 'gopay', label: 'GoPay', desc: 'Dompet digital Gojek', icon: Smartphone, color: '#00AED6' },
      { id: 'ovo', label: 'OVO', desc: 'Bayar dengan OVO', icon: Wallet, color: '#4C2B90' },
      { id: 'dana', label: 'DANA', desc: 'Dompet digital DANA', icon: Smartphone, color: '#118EEA' },
      { id: 'shopeepay', label: 'ShopeePay', desc: 'Bayar dengan ShopeePay', icon: Wallet, color: '#EE4D2D' },
    ],
  },
  {
    category: 'Transfer & Tunai',
    options: [
      { id: 'transfer', label: 'Transfer Bank', desc: 'BCA, Mandiri, BNI, BRI', icon: Building2, color: '#0066CC' },
      { id: 'tunai', label: 'Bayar Tunai', desc: 'Bayar saat pesanan tiba', icon: CreditCard, color: '#4CAF50' },
    ],
  },
];

export function PaymentPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, setCurrentOrder, tableNumber, addLoyaltyPoints } = useApp();
  const [selected, setSelected] = useState('qris');
  const [processing, setProcessing] = useState(false);

  const tax = Math.round(cartTotal * 0.1);
  const total = cartTotal + tax;
  const pointsEarned = Math.floor(total / 1000) * 10;

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));

    const order: Order = {
      id: `KOP-${Date.now().toString(36).toUpperCase()}`,
      items: [...cart],
      customer: { nama: 'Pelanggan', telepon: '081234567890', nomorMeja: tableNumber, catatan: '' },
      total,
      paymentMethod: selected,
      status: 'diterima',
      createdAt: new Date(),
      discount: 0,
    };
    setCurrentOrder(order);
    addLoyaltyPoints(pointsEarned);
    clearCart();
    navigate('/order/tracking');
  };

  if (cart.length === 0) { navigate('/cart'); return null; }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {['Keranjang', 'Informasi', 'Pembayaran', 'Selesai'].map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${i === 2 ? 'bg-[#C4843E] text-white' : i < 2 ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                {i < 2 ? '✓' : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === 2 ? 'text-[#C4843E] font-medium' : 'text-muted-foreground'}`}>{step}</span>
              {i < 3 && <div className={`h-px w-8 ${i < 2 ? 'bg-green-500' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <h1 className="text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem' }}>
          Metode Pembayaran
        </h1>

        <div className="space-y-6">
          {paymentMethods.map(group => (
            <div key={group.category}>
              <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">{group.category}</p>
              <div className="space-y-2">
                {group.options.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setSelected(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                      selected === method.id
                        ? 'border-[#C4843E] bg-[#C4843E]/5 shadow-md'
                        : 'border-border bg-card hover:border-[#C4843E]/40'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${method.color}20` }}>
                      <method.icon className="w-5 h-5" style={{ color: method.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-semibold text-sm">{method.label}</p>
                      <p className="text-muted-foreground text-xs">{method.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selected === method.id ? 'border-[#C4843E] bg-[#C4843E]' : 'border-border'}`}>
                      {selected === method.id && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* QRIS Mock */}
          {selected === 'qris' && (
            <div className="p-6 bg-card border border-border rounded-2xl text-center">
              <p className="text-sm font-medium text-foreground mb-4">Scan QR untuk membayar</p>
              <div className="w-40 h-40 mx-auto bg-muted rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-border">
                <QrCode className="w-16 h-16 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">QR berlaku selama 15 menit</p>
            </div>
          )}

          {/* Summary */}
          <div className="bg-[#C4843E]/10 border border-[#C4843E]/20 rounded-2xl p-5">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">Rp {cartTotal.toLocaleString('id')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pajak (10%)</span>
                <span className="text-foreground">Rp {tax.toLocaleString('id')}</span>
              </div>
              <div className="pt-2 border-t border-[#C4843E]/20 flex justify-between">
                <span className="text-foreground font-bold">Total Pembayaran</span>
                <span className="text-[#C4843E] font-bold text-lg">Rp {total.toLocaleString('id')}</span>
              </div>
            </div>
            <p className="text-xs text-[#C4843E] text-center">✨ Anda akan mendapat +{pointsEarned} poin loyalti</p>
          </div>

          <button
            onClick={handlePayment}
            disabled={processing}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              processing ? 'bg-muted-foreground cursor-not-allowed' : 'bg-[#C4843E] hover:bg-[#B8742E] hover:shadow-lg hover:shadow-[#C4843E]/30'
            }`}
          >
            {processing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Memproses Pembayaran...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Konfirmasi Pembayaran
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
