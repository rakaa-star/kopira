import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { MenuItem } from '../data/menu';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  sugarLevel: string;
  iceLevel: string;
  size: string;
  toppings: string[];
  notes: string;
  subtotal: number;
}

export interface CustomerInfo {
  nama: string;
  telepon: string;
  nomorMeja: string;
  catatan: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  total: number;
  paymentMethod: string;
  status: 'diterima' | 'diproses' | 'disiapkan' | 'diantar' | 'selesai';
  createdAt: Date;
  promoCode?: string;
  discount: number;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  tableNumber: string;
  setTableNumber: (n: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  loyaltyPoints: number;
  addLoyaltyPoints: (pts: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [tableNumber, setTableNumber] = useState('07');
  const [favorites, setFavorites] = useState<string[]>(['2', '6', '7']);
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250);

  const addToCart = useCallback((item: CartItem) => {
    setCart(prev => [...prev, item]);
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter((_, i) => i !== index));
    } else {
      setCart(prev => prev.map((item, i) =>
        i === index ? { ...item, quantity: qty, subtotal: (item.subtotal / item.quantity) * qty } : item
      ));
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }, []);

  const addLoyaltyPoints = useCallback((pts: number) => {
    setLoyaltyPoints(prev => prev + pts);
  }, []);

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount,
      currentOrder, setCurrentOrder,
      tableNumber, setTableNumber,
      favorites, toggleFavorite,
      loyaltyPoints, addLoyaltyPoints,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
