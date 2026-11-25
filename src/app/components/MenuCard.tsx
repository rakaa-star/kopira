import { Heart, Star, ShoppingCart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { MenuItem } from '../data/menu';
import { useApp } from '../context/AppContext';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
}

export function MenuCard({ item, onAddToCart }: MenuCardProps) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(item.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item);
    } else {
      navigate(`/menu/${item.id}`);
    }
  };

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-border hover:border-[#C4843E]/30 hover:-translate-y-1"
      onClick={() => navigate(`/menu/${item.id}`)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.isBestSeller && (
            <span className="bg-[#C4843E] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide shadow-md">
              TERLARIS
            </span>
          )}
          {item.isNew && (
            <span className="bg-[#3D1A08] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide shadow-md">
              BARU
            </span>
          )}
          {item.originalPrice && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide shadow-md">
              PROMO
            </span>
          )}
        </div>
        {/* Favorite */}
        <button
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
            isFav ? 'bg-[#C4843E] text-white' : 'bg-white/90 text-gray-400 hover:text-[#C4843E]'
          }`}
          onClick={e => { e.stopPropagation(); toggleFavorite(item.id); }}
        >
          <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-foreground text-sm leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
            {item.name}
          </h3>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <Star className="w-3.5 h-3.5 text-[#C4843E]" fill="currentColor" />
          <span className="text-xs font-medium text-foreground">{item.rating}</span>
          <span className="text-xs text-muted-foreground">({item.reviews})</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#C4843E] font-bold text-base">
              Rp {item.price.toLocaleString('id')}
            </span>
            {item.originalPrice && (
              <span className="text-muted-foreground text-xs line-through ml-1.5">
                Rp {item.originalPrice.toLocaleString('id')}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="w-8 h-8 rounded-full bg-[#C4843E] hover:bg-[#B8742E] text-white flex items-center justify-center shadow-md transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
