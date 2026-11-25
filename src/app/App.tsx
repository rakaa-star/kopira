import { BrowserRouter, Routes, Route } from 'react-router';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { MenuPage } from './components/MenuPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CustomerInfoPage } from './components/CustomerInfoPage';
import { PaymentPage } from './components/PaymentPage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { LoyaltyPage } from './components/LoyaltyPage';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { QROrderPage } from './components/QROrderPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        {/* MARKER-MAKE-KIT-INVOKED */}
        <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/menu/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout/info" element={<CustomerInfoPage />} />
            <Route path="/checkout/payment" element={<PaymentPage />} />
            <Route path="/order/tracking" element={<OrderTrackingPage />} />
            <Route path="/tentang" element={<AboutPage />} />
            <Route path="/kontak" element={<ContactPage />} />
            <Route path="/loyalti" element={<LoyaltyPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/meja/:tableNumber" element={<QROrderPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
