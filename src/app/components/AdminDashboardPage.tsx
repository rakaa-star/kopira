import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Coffee, ShoppingCart, Users, TrendingUp, BarChart2, Package, QrCode, Settings, Bell, Search, ChevronDown, Plus, Edit2, Trash2, Eye, CheckCircle, Clock, AlertCircle, MenuSquare } from 'lucide-react';
import { menuItems } from '../data/menu';

const salesData = [
  { day: 'Sen', revenue: 1250000, orders: 42 },
  { day: 'Sel', revenue: 980000, orders: 33 },
  { day: 'Rab', revenue: 1650000, orders: 55 },
  { day: 'Kam', revenue: 1420000, orders: 48 },
  { day: 'Jum', revenue: 2100000, orders: 70 },
  { day: 'Sab', revenue: 2850000, orders: 95 },
  { day: 'Min', revenue: 2600000, orders: 87 },
];

const categoryData = [
  { name: 'Kopi', value: 45, color: '#3D1A08' },
  { name: 'Signature', value: 28, color: '#C4843E' },
  { name: 'Non Kopi', value: 15, color: '#8B4513' },
  { name: 'Dessert', value: 8, color: '#D4A574' },
  { name: 'Snack', value: 4, color: '#E8DDD0' },
];

const recentOrders = [
  { id: 'KOP-A1B2C3', customer: 'Aisyah R.', table: '05', items: 3, total: 135000, status: 'disiapkan', time: '14:32' },
  { id: 'KOP-D4E5F6', customer: 'Budi S.', table: '12', items: 2, total: 80000, status: 'diantar', time: '14:28' },
  { id: 'KOP-G7H8I9', customer: 'Dewi P.', table: '03', items: 4, total: 178000, status: 'diterima', time: '14:25' },
  { id: 'KOP-J1K2L3', customer: 'Eko F.', table: '08', items: 1, total: 52000, status: 'selesai', time: '14:15' },
  { id: 'KOP-M4N5O6', customer: 'Fara A.', table: '15', items: 3, total: 115000, status: 'diproses', time: '14:10' },
];

const tableQRs = [
  { no: '01', status: 'aktif' }, { no: '02', status: 'aktif' }, { no: '03', status: 'memesan' },
  { no: '04', status: 'aktif' }, { no: '05', status: 'memesan' }, { no: '06', status: 'aktif' },
  { no: '07', status: 'aktif' }, { no: '08', status: 'memesan' }, { no: '09', status: 'nonaktif' },
  { no: '10', status: 'aktif' }, { no: '11', status: 'aktif' }, { no: '12', status: 'memesan' },
];

const statusColors: Record<string, string> = {
  diterima: 'bg-blue-100 text-blue-700',
  diproses: 'bg-yellow-100 text-yellow-700',
  disiapkan: 'bg-orange-100 text-orange-700',
  diantar: 'bg-purple-100 text-purple-700',
  selesai: 'bg-green-100 text-green-700',
};

const statusIcons: Record<string, typeof CheckCircle> = {
  diterima: AlertCircle,
  diproses: Clock,
  disiapkan: Coffee,
  diantar: Package,
  selesai: CheckCircle,
};

type AdminTab = 'overview' | 'orders' | 'menu' | 'analytics' | 'qr' | 'customers';

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const stats = [
    { label: 'Total Penjualan Hari Ini', value: 'Rp 2.85 jt', change: '+18%', icon: TrendingUp, color: '#C4843E' },
    { label: 'Total Pesanan', value: '95', change: '+12%', icon: ShoppingCart, color: '#3D1A08' },
    { label: 'Pelanggan Aktif', value: '1,248', change: '+5%', icon: Users, color: '#8B4513' },
    { label: 'Menu Terjual', value: '47 item', change: '+8%', icon: Coffee, color: '#C4A882' },
  ];

  const sidebarItems: { id: AdminTab; label: string; icon: typeof Coffee }[] = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'orders', label: 'Pesanan', icon: ShoppingCart },
    { id: 'menu', label: 'Menu', icon: MenuSquare },
    { id: 'analytics', label: 'Analitik', icon: BarChart2 },
    { id: 'qr', label: 'QR Meja', icon: QrCode },
    { id: 'customers', label: 'Pelanggan', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#0D0703] flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#1A0F0A] border-r border-[#C4843E]/10 flex-col hidden md:flex">
        {/* Logo */}
        <div className="p-6 border-b border-[#C4843E]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C4843E] flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold tracking-widest text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>KOPIRA</p>
              <p className="text-[#C4A882] text-[10px]">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                activeTab === id ? 'bg-[#C4843E]/20 text-[#C4843E]' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#C4843E]/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all">
            <Settings className="w-4 h-4" />
            Pengaturan
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#1A0F0A] border-b border-[#C4843E]/10 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-white font-semibold capitalize" style={{ fontFamily: "'Playfair Display', serif" }}>
              {sidebarItems.find(s => s.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input placeholder="Cari..." className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4843E]/50 w-48" />
            </div>
            <button className="relative p-2 text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C4843E] rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#C4843E] flex items-center justify-center text-white text-xs font-bold">A</div>
              <div className="hidden sm:block">
                <p className="text-white text-xs font-medium">Admin</p>
                <p className="text-white/40 text-[10px]">Super Admin</p>
              </div>
              <ChevronDown className="w-3 h-3 text-white/40" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, change, icon: Icon, color }) => (
                  <div key={label} className="bg-[#1A0F0A] border border-[#C4843E]/10 rounded-2xl p-5 hover:border-[#C4843E]/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}25` }}>
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <span className="text-green-400 text-xs font-medium bg-green-400/10 px-2 py-1 rounded-full">{change}</span>
                    </div>
                    <p className="text-white font-bold text-xl mb-0.5">{value}</p>
                    <p className="text-white/40 text-xs">{label}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#1A0F0A] border border-[#C4843E]/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-white font-semibold">Penjualan 7 Hari Terakhir</h3>
                    <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60 focus:outline-none">
                      <option>Minggu Ini</option>
                      <option>Bulan Ini</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}K`} />
                      <Tooltip
                        contentStyle={{ background: '#1A0F0A', border: '1px solid rgba(196,132,62,0.3)', borderRadius: 12, color: '#FAF7F2' }}
                        formatter={(v: number) => [`Rp ${v.toLocaleString('id')}`, 'Penjualan']}
                      />
                      <Bar dataKey="revenue" fill="#C4843E" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#1A0F0A] border border-[#C4843E]/10 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-5">Kategori Menu</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value">
                        {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#1A0F0A', border: '1px solid rgba(196,132,62,0.3)', borderRadius: 8, color: '#FAF7F2' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {categoryData.map(d => (
                      <div key={d.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                          <span className="text-white/60 text-xs">{d.name}</span>
                        </div>
                        <span className="text-white text-xs font-medium">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-[#1A0F0A] border border-[#C4843E]/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white font-semibold">Pesanan Terbaru</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-[#C4843E] text-xs hover:underline">Lihat Semua</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        {['ID Pesanan', 'Pelanggan', 'Meja', 'Total', 'Status', 'Waktu'].map(h => (
                          <th key={h} className="text-left py-2 text-white/40 text-xs font-medium pb-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(order => {
                        const StatusIcon = statusIcons[order.status] || CheckCircle;
                        return (
                          <tr key={order.id} className="border-b border-white/5 hover:bg-white/2">
                            <td className="py-3 text-[#C4843E] font-medium text-xs">{order.id}</td>
                            <td className="py-3 text-white">{order.customer}</td>
                            <td className="py-3 text-white/60">Meja {order.table}</td>
                            <td className="py-3 text-white font-medium">Rp {order.total.toLocaleString('id')}</td>
                            <td className="py-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                                <StatusIcon className="w-3 h-3" />
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 text-white/40 text-xs">{order.time}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold">Semua Pesanan</h2>
                <div className="flex gap-2">
                  {['semua', 'aktif', 'selesai'].map(f => (
                    <button key={f} className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#1A0F0A] border border-[#C4843E]/20 text-white/60 hover:text-white capitalize transition-colors">
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-[#1A0F0A] border border-[#C4843E]/10 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#C4843E]/10">
                      {['ID', 'Pelanggan', 'Meja', 'Item', 'Total', 'Status', 'Waktu', 'Aksi'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-white/40 text-xs font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => {
                      const StatusIcon = statusIcons[order.status] || CheckCircle;
                      return (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                          <td className="px-4 py-3 text-[#C4843E] text-xs font-medium">{order.id}</td>
                          <td className="px-4 py-3 text-white">{order.customer}</td>
                          <td className="px-4 py-3 text-white/60">{order.table}</td>
                          <td className="px-4 py-3 text-white/60">{order.items} item</td>
                          <td className="px-4 py-3 text-white font-medium">Rp {order.total.toLocaleString('id')}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                              <StatusIcon className="w-3 h-3" />
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-white/40 text-xs">{order.time}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-all"><Eye className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold">Kelola Menu</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#C4843E] hover:bg-[#B8742E] text-white rounded-xl text-sm font-medium transition-colors">
                  <Plus className="w-4 h-4" /> Tambah Menu
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.slice(0, 9).map(item => (
                  <div key={item.id} className="bg-[#1A0F0A] border border-[#C4843E]/10 rounded-2xl overflow-hidden hover:border-[#C4843E]/30 transition-all">
                    <div className="h-36 overflow-hidden bg-[#0D0703]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-white font-medium text-sm">{item.name}</h3>
                        <span className="text-[#C4843E] font-bold text-xs">Rp {(item.price/1000).toFixed(0)}K</span>
                      </div>
                      <p className="text-white/40 text-xs mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-0.5 bg-white/5 rounded-full text-white/40 capitalize">{item.category}</span>
                        <div className="flex gap-1">
                          <button className="p-1.5 text-white/40 hover:text-[#C4843E] rounded-lg hover:bg-white/5 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 text-white/40 hover:text-red-400 rounded-lg hover:bg-white/5 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-[#1A0F0A] border border-[#C4843E]/10 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-5">Tren Penjualan (7 Hari)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}K`} />
                    <Tooltip contentStyle={{ background: '#1A0F0A', border: '1px solid rgba(196,132,62,0.3)', borderRadius: 12, color: '#FAF7F2' }} />
                    <Line type="monotone" dataKey="revenue" stroke="#C4843E" strokeWidth={2.5} dot={{ fill: '#C4843E', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-[#1A0F0A] border border-[#C4843E]/10 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4">Menu Terlaris</h3>
                  <div className="space-y-3">
                    {menuItems.filter(m => m.isBestSeller).map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#0D0703] shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{item.name}</p>
                          <div className="h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-[#C4843E] rounded-full" style={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }} />
                          </div>
                        </div>
                        <span className="text-white/60 text-xs">{item.reviews} terjual</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#1A0F0A] border border-[#C4843E]/10 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4">Ringkasan Penjualan</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Total Revenue Bulan Ini', value: 'Rp 48.2 jt', color: '#C4843E' },
                      { label: 'Total Pesanan Bulan Ini', value: '1,247 pesanan', color: '#8B4513' },
                      { label: 'Rata-rata Nilai Pesanan', value: 'Rp 38.650', color: '#D4A574' },
                      { label: 'Pelanggan Baru', value: '127 orang', color: '#C4A882' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex items-center justify-between p-3 bg-white/3 rounded-xl">
                        <span className="text-white/60 text-sm">{label}</span>
                        <span className="font-bold text-sm" style={{ color }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold">Manajemen QR Meja</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#C4843E] hover:bg-[#B8742E] text-white rounded-xl text-sm font-medium transition-colors">
                  <Plus className="w-4 h-4" /> Tambah Meja
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {tableQRs.map(table => (
                  <div
                    key={table.no}
                    className={`aspect-square rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all hover:-translate-y-0.5 ${
                      table.status === 'memesan' ? 'border-[#C4843E]/50 bg-[#C4843E]/10' :
                      table.status === 'nonaktif' ? 'border-white/10 bg-white/3 opacity-50' :
                      'border-white/10 bg-[#1A0F0A] hover:border-[#C4843E]/30'
                    }`}
                  >
                    <QrCode className={`w-8 h-8 mb-2 ${table.status === 'memesan' ? 'text-[#C4843E]' : table.status === 'nonaktif' ? 'text-white/20' : 'text-white/60'}`} />
                    <p className="text-white font-bold text-sm">Meja {table.no}</p>
                    <p className={`text-[10px] capitalize mt-0.5 ${
                      table.status === 'memesan' ? 'text-[#C4843E]' : table.status === 'nonaktif' ? 'text-white/30' : 'text-green-400'
                    }`}>
                      {table.status}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 flex-wrap">
                {[{ color: 'green-400', label: 'Aktif' }, { color: '[#C4843E]', label: 'Sedang Memesan' }, { color: 'white/30', label: 'Nonaktif' }].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-white/60">
                    <div className={`w-2.5 h-2.5 rounded-full bg-${color}`} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-4">
              <h2 className="text-white font-semibold">Data Pelanggan</h2>
              <div className="bg-[#1A0F0A] border border-[#C4843E]/10 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#C4843E]/10">
                      {['Nama', 'Email', 'Tier', 'Total Pesanan', 'Total Spend', 'Bergabung'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-white/40 text-xs font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Aisyah Ramadhani', email: 'aisyah@email.com', tier: 'Gold', orders: 47, spend: 'Rp 1.8 jt', joined: 'Jan 2024' },
                      { name: 'Budi Santoso', email: 'budi@email.com', tier: 'Silver', orders: 23, spend: 'Rp 870K', joined: 'Mar 2024' },
                      { name: 'Dewi Prastiwi', email: 'dewi@email.com', tier: 'Platinum', orders: 89, spend: 'Rp 3.4 jt', joined: 'Nov 2023' },
                      { name: 'Eko Firmansyah', email: 'eko@email.com', tier: 'Bronze', orders: 8, spend: 'Rp 320K', joined: 'Mei 2025' },
                    ].map(cust => (
                      <tr key={cust.name} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                        <td className="px-4 py-3 text-white font-medium">{cust.name}</td>
                        <td className="px-4 py-3 text-white/60 text-xs">{cust.email}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            cust.tier === 'Platinum' ? 'bg-purple-500/20 text-purple-300' :
                            cust.tier === 'Gold' ? 'bg-[#C4843E]/20 text-[#C4843E]' :
                            cust.tier === 'Silver' ? 'bg-gray-500/20 text-gray-300' :
                            'bg-amber-700/20 text-amber-500'
                          }`}>{cust.tier}</span>
                        </td>
                        <td className="px-4 py-3 text-white/60">{cust.orders}x</td>
                        <td className="px-4 py-3 text-white font-medium">{cust.spend}</td>
                        <td className="px-4 py-3 text-white/40 text-xs">{cust.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
