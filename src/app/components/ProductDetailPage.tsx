import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Star, Heart, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { menuItems } from '../data/menu';
import { useApp } from '../context/AppContext';

const sugarLevels = ['Tanpa Gula', '25%', '50%', '75%', '100%'];
const iceLevels = ['Tanpa Es', 'Sedikit Es', 'Normal', 'Extra Es'];
const sizes = [
  { label: 'Small', desc: '250ml', multiplier: 0.85 },
  { label: 'Regular', desc: '350ml', multiplier: 1 },
  { label: 'Large', desc: '500ml', multiplier: 1.3 },
];
const toppingOptions = [
  { label: 'Jelly Cokelat', price: 5000 },
  { label: 'Bubble Pearl', price: 6000 },
  { label: 'Whipped Cream', price: 5000 },
  { label: 'Oat Milk', price: 8000 },
  { label: 'Vanilla Shot', price: 7000 },
  { label: 'Caramel Drizzle', price: 5000 },
];

const dummyReviews = [
  { name: 'Rina K.', rating: 5, text: 'Rasa yang konsisten dan selalu memuaskan!', date: '3 hari lalu', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { name: 'Dimas P.', rating: 5, text: 'Terbaik yang pernah saya coba. Wajib coba!', date: '1 minggu lalu', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { name: 'Sari W.', rating: 4, text: 'Enak banget, tapi kadang sedikit terlalu manis.', date: '2 minggu lalu', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop' },
];

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, favorites, toggleFavorite } = useApp();

  const item = menuItems.find(m => m.id === id);
  const [sugar, setSugar] = useState('50%');
  const [ice, setIce] = useState('Normal');
  const [size, setSize] = useState('Regular');
  const [toppings, setToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  if (!item) return (
    <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Produk tidak ditemukan</p>
        <button onClick={() => navigate('/menu')} className="text-[#C4843E] font-medium hover:underline">Kembali ke Menu</button>
      </div>
    </div>
  );

  const selectedSize = sizes.find(s => s.label === size)!;
  const toppingTotal = toppings.reduce((sum, t) => sum + (toppingOptions.find(o => o.label === t)?.price || 0), 0);
  const unitPrice = Math.round(item.price * selectedSize.multiplier) + toppingTotal;
  const total = unitPrice * quantity;

  const toggleTopping = (t: string) => {
    setToppings(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const handleAddToCart = () => {
    addToCart({ menuItem: item, quantity, sugarLevel: sugar, iceLevel: ice, size, toppings, notes, subtotal: total });
    setAdded(true);
    setTimeout(() => { setAdded(false); navigate('/cart'); }, 1200);
  };

  const isFav = favorites.includes(item.id);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Back */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <div className="relative rounded-3xl overflow-hidden aspect-square bg-muted shadow-2xl">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              {item.isBestSeller && (
                <div className="absolute top-5 left-5 bg-[#C4843E] text-white text-xs font-bold px-3 py-1.5 rounded-full">TERLARIS</div>
              )}
              <button
                onClick={() => toggleFavorite(item.id)}
                className={`absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${isFav ? 'bg-[#C4843E] text-white' : 'bg-white text-gray-400 hover:text-[#C4843E]'}`}
              >
                <Heart className="w-5 h-5" fill={isFav ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-foreground font-semibold">Ulasan Pelanggan</h3>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#C4843E]" fill="currentColor" />
                  <span className="font-bold text-foreground">{item.rating}</span>
                  <span className="text-muted-foreground text-sm">({item.reviews} ulasan)</span>
                </div>
              </div>
              <div className="space-y-4">
                {dummyReviews.map((r, i) => (
                  <div key={i} className="p-4 bg-card rounded-2xl border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(r.rating)].map((_, j) => <Star key={j} className="w-3 h-3 text-[#C4843E]" fill="currentColor" />)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details & Customization */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-[#C4843E] text-xs font-medium tracking-widest uppercase mb-1">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' ')}
                  </p>
                  <h1 className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', lineHeight: 1.2 }}>{item.name}</h1>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[#C4843E] text-2xl font-bold">Rp {item.price.toLocaleString('id')}</p>
                  {item.originalPrice && <p className="text-muted-foreground text-sm line-through">Rp {item.originalPrice.toLocaleString('id')}</p>}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            {/* Ingredients */}
            <div className="mb-6 p-4 bg-muted/50 rounded-2xl">
              <p className="text-foreground font-medium text-sm mb-2">Bahan Utama:</p>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map(ing => (
                  <span key={ing} className="text-xs px-3 py-1 bg-card border border-border rounded-full text-muted-foreground">{ing}</span>
                ))}
              </div>
            </div>

            {/* ── Customization ── */}
            <div className="space-y-6">
              {/* Sugar */}
              <div>
                <p className="text-foreground font-semibold text-sm mb-3">Level Gula</p>
                <div className="flex flex-wrap gap-2">
                  {sugarLevels.map(s => (
                    <button
                      key={s}
                      onClick={() => setSugar(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${sugar === s ? 'bg-[#C4843E] border-[#C4843E] text-white' : 'bg-card border-border text-muted-foreground hover:border-[#C4843E]/50'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ice */}
              <div>
                <p className="text-foreground font-semibold text-sm mb-3">Level Es</p>
                <div className="flex flex-wrap gap-2">
                  {iceLevels.map(s => (
                    <button
                      key={s}
                      onClick={() => setIce(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${ice === s ? 'bg-[#C4843E] border-[#C4843E] text-white' : 'bg-card border-border text-muted-foreground hover:border-[#C4843E]/50'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-foreground font-semibold text-sm mb-3">Ukuran</p>
                <div className="flex gap-3">
                  {sizes.map(s => (
                    <button
                      key={s.label}
                      onClick={() => setSize(s.label)}
                      className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all flex flex-col items-center gap-0.5 ${size === s.label ? 'bg-[#C4843E]/10 border-[#C4843E] text-[#C4843E]' : 'bg-card border-border text-muted-foreground hover:border-[#C4843E]/50'}`}
                    >
                      <span className="font-bold">{s.label}</span>
                      <span className="text-xs opacity-70">{s.desc}</span>
                      {s.multiplier !== 1 && (
                        <span className="text-[10px] opacity-60">
                          {s.multiplier < 1 ? `-${Math.round((1 - s.multiplier) * 100)}%` : `+${Math.round((s.multiplier - 1) * 100)}%`}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toppings */}
              <div>
                <p className="text-foreground font-semibold text-sm mb-3">Extra Topping <span className="text-muted-foreground font-normal">(opsional)</span></p>
                <div className="grid grid-cols-2 gap-2">
                  {toppingOptions.map(t => (
                    <button
                      key={t.label}
                      onClick={() => toggleTopping(t.label)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs border transition-all ${toppings.includes(t.label) ? 'bg-[#C4843E]/10 border-[#C4843E] text-foreground' : 'bg-card border-border text-muted-foreground hover:border-[#C4843E]/50'}`}
                    >
                      <span>{t.label}</span>
                      <span className="font-medium">+Rp {t.price.toLocaleString('id')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-foreground font-semibold text-sm mb-3">Catatan</p>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Contoh: jangan terlalu panas, tanpa foam..."
                  rows={2}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50 focus:border-[#C4843E] resize-none transition-all"
                />
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-full border-2 border-border hover:border-[#C4843E] flex items-center justify-center text-foreground transition-all">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-foreground text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-9 h-9 rounded-full border-2 border-[#C4843E] bg-[#C4843E] flex items-center justify-center text-white transition-all hover:bg-[#B8742E]">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-xs mb-0.5">Total</p>
                  <p className="text-[#C4843E] font-bold text-xl">Rp {total.toLocaleString('id')}</p>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  added ? 'bg-green-600' : 'bg-[#C4843E] hover:bg-[#B8742E] hover:shadow-lg hover:shadow-[#C4843E]/30'
                }`}
              >
                {added ? <><Check className="w-5 h-5" /> Ditambahkan!</> : <><ShoppingCart className="w-5 h-5" /> Tambah ke Keranjang</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
