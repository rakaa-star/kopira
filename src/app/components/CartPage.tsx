import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingCart, Plus, Minus, Trash2, Tag, ArrowRight, Coffee } from 'lucide-react';
import { useApp } from '../context/AppContext';

const promoCodes: Record<string, number> = {
  KOPIRA30: 0.30,
  DUO2GET1: 0.15,
  NEWMEMBER: 0.10,
};

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const discount = promoCodes[promoCode] ? Math.round(cartTotal * promoCodes[promoCode]) : 0;
  const tax = Math.round((cartTotal - discount) * 0.1);
  const finalTotal = cartTotal - discount + tax;

  const applyPromo = () => {
    if (promoCodes[promoInput.toUpperCase()]) {
      setPromoCode(promoInput.toUpperCase());
      setPromoError('');
    } else {
      setPromoError('Kode promo tidak valid');
      setPromoCode('');
    }
  };

  if (cart.length === 0) return (
    <div className="min-h-screen bg-background pt-20 flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-foreground text-xl font-semibold mb-2">Keranjang Kosong</h2>
        <p className="text-muted-foreground text-sm mb-8">Belum ada pesanan yang ditambahkan. Yuk pilih menu favorit Anda!</p>
        <button onClick={() => navigate('/menu')} className="bg-[#C4843E] hover:bg-[#B8742E] text-white px-8 py-3.5 rounded-full font-medium transition-all">
          Jelajahi Menu
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-foreground mb-8" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem' }}>
          Keranjang Pesanan
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((cartItem, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-4 flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                  <img src={cartItem.menuItem.image} alt={cartItem.menuItem.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-foreground font-semibold text-sm truncate">{cartItem.menuItem.name}</h3>
                    <button onClick={() => removeFromCart(i)} className="text-muted-foreground hover:text-red-500 transition-colors shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {[cartItem.size, cartItem.sugarLevel, cartItem.iceLevel].filter(Boolean).map((opt, j) => (
                      <span key={j} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{opt}</span>
                    ))}
                    {cartItem.toppings.map(t => (
                      <span key={t} className="text-[10px] bg-[#C4843E]/10 text-[#C4843E] px-2 py-0.5 rounded-full">+{t}</span>
                    ))}
                  </div>
                  {cartItem.notes && <p className="text-xs text-muted-foreground italic mb-2">"{cartItem.notes}"</p>}
                  <div className="flex items-center justify-between">
                    <span className="text-[#C4843E] font-bold text-sm">Rp {cartItem.subtotal.toLocaleString('id')}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(i, cartItem.quantity - 1)} className="w-7 h-7 rounded-full border border-border hover:border-[#C4843E] flex items-center justify-center text-foreground transition-all">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-bold text-sm text-foreground">{cartItem.quantity}</span>
                      <button onClick={() => updateQuantity(i, cartItem.quantity + 1)} className="w-7 h-7 rounded-full bg-[#C4843E] flex items-center justify-center text-white">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h2 className="text-foreground font-semibold mb-5">Ringkasan Pesanan</h2>

              {/* Promo Code */}
              <div className="mb-5">
                <label className="text-sm text-muted-foreground mb-2 block">Kode Promo</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Masukkan kode"
                      className="w-full pl-8 pr-3 py-2.5 text-sm bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50"
                    />
                  </div>
                  <button onClick={applyPromo} className="px-4 py-2.5 bg-[#C4843E] text-white text-sm rounded-xl hover:bg-[#B8742E] transition-colors font-medium">
                    Pakai
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-xs mt-1.5">{promoError}</p>}
                {promoCode && <p className="text-green-600 text-xs mt-1.5">✓ Promo {promoCode} berhasil diterapkan!</p>}
                <p className="text-muted-foreground text-xs mt-2">Coba: KOPIRA30, DUO2GET1</p>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({cart.reduce((s, c) => s + c.quantity, 0)} item)</span>
                  <span className="text-foreground">Rp {cartTotal.toLocaleString('id')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Diskon ({promoCode})</span>
                    <span className="text-green-600">-Rp {discount.toLocaleString('id')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pajak (10%)</span>
                  <span className="text-foreground">Rp {tax.toLocaleString('id')}</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between">
                  <span className="text-foreground font-bold">Total</span>
                  <span className="text-[#C4843E] font-bold text-lg">Rp {finalTotal.toLocaleString('id')}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout/info')}
                className="w-full py-4 bg-[#C4843E] hover:bg-[#B8742E] text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#C4843E]/30"
              >
                Lanjut ke Pemesanan <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/menu')} className="w-full mt-3 py-3 border border-border rounded-2xl text-muted-foreground hover:text-foreground text-sm transition-all flex items-center justify-center gap-2">
                <Coffee className="w-4 h-4" /> Tambah Menu Lain
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
