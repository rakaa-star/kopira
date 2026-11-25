import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { menuItems, categories } from '../data/menu';
import { MenuCard } from './MenuCard';
import type { MenuItem } from '../data/menu';

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let items = [...menuItems];
    if (activeCategory !== 'semua') items = items.filter(i => i.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    if (sortBy === 'price-asc') items.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') items.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') items.sort((a, b) => b.rating - a.rating);
    else items.sort((a, b) => b.reviews - a.reviews);
    return items;
  }, [activeCategory, searchQuery, sortBy]);

  const handleAddToCart = (item: MenuItem) => {
    navigate(`/menu/${item.id}`);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-[#1A0F0A] py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-3">Pilihan Terbaik</p>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Menu Digital KOPIRA
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Dari espresso kuat hingga minuman segar — temukan minuman sempurna untuk hari Anda
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search & Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari minuman atau makanan..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50 focus:border-[#C4843E] transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="py-3.5 px-4 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50 cursor-pointer"
            >
              <option value="popular">Terpopuler</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#C4843E] text-white shadow-md shadow-[#C4843E]/30'
                  : 'bg-card border border-border text-muted-foreground hover:border-[#C4843E]/50 hover:text-foreground'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-muted-foreground text-sm mb-6">
          {filtered.length} menu ditemukan
          {activeCategory !== 'semua' && ` dalam "${categories.find(c => c.id === activeCategory)?.label}"`}
          {searchQuery && ` untuk "${searchQuery}"`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(item => (
              <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-foreground font-semibold mb-2">Menu tidak ditemukan</h3>
            <p className="text-muted-foreground text-sm">Coba kata kunci lain atau pilih kategori yang berbeda</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('semua'); }}
              className="mt-4 text-[#C4843E] text-sm font-medium hover:underline"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
