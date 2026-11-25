import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Facebook, Send, Check } from 'lucide-react';

const operationalHours = [
  { day: 'Senin – Jumat', hours: '07.00 – 22.00 WIB' },
  { day: 'Sabtu', hours: '08.00 – 23.00 WIB' },
  { day: 'Minggu', hours: '08.00 – 23.00 WIB' },
  { day: 'Hari Libur Nasional', hours: '09.00 – 21.00 WIB' },
];

export function ContactPage() {
  const [form, setForm] = useState({ nama: '', email: '', subjek: '', pesan: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ nama: '', email: '', subjek: '', pesan: '' });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-[#1A0F0A] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-3">Hubungi Kami</p>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Kami Senang Mendengar dari Anda
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Ada pertanyaan, saran, atau kolaborasi? Jangan ragu untuk menghubungi tim kami
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-foreground mb-8" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem' }}>
              Informasi Kontak
            </h2>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:border-[#C4843E]/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#C4843E]/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C4843E]" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm mb-1">Alamat</p>
                  <p className="text-muted-foreground text-sm">Jl. Sudirman Kav. 52, Jakarta Selatan, 12190</p>
                  <p className="text-muted-foreground text-xs mt-1">Gedung Kopira Tower, Lantai 1</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:border-[#C4843E]/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#C4843E]/15 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#C4843E]" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm mb-1">Telepon</p>
                  <p className="text-muted-foreground text-sm">+62 21 5550 8899</p>
                  <p className="text-muted-foreground text-xs mt-1">WhatsApp: +62 812 3456 7890</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:border-[#C4843E]/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#C4843E]/15 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#C4843E]" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm mb-1">Email</p>
                  <p className="text-muted-foreground text-sm">halo@kopira.id</p>
                  <p className="text-muted-foreground text-xs mt-1">Untuk bisnis: bisnis@kopira.id</p>
                </div>
              </div>
            </div>

            {/* Operational Hours */}
            <div className="p-6 bg-card border border-border rounded-2xl mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#C4843E]" />
                <h3 className="text-foreground font-semibold">Jam Operasional</h3>
              </div>
              <div className="space-y-2">
                {operationalHours.map(({ day, hours }) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{day}</span>
                    <span className="text-foreground font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-foreground font-semibold text-sm mb-4">Ikuti Kami</p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Instagram, label: '@kopira.id', color: '#E1306C' },
                  { Icon: Twitter, label: '@kopira_id', color: '#1DA1F2' },
                  { Icon: Facebook, label: 'KOPIRA Coffee', color: '#1877F2' },
                ].map(({ Icon, label, color }) => (
                  <a key={label} href="#" className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-muted-foreground hover:border-[#C4843E]/30 hover:text-foreground transition-all">
                    <Icon className="w-4 h-4" style={{ color }} />
                    <span className="text-xs">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>
                Kirim Pesan
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Nama Lengkap</label>
                    <input
                      required
                      value={form.nama}
                      onChange={e => setForm(f => ({ ...f, nama: e.target.value }))}
                      placeholder="Nama Anda"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50 focus:border-[#C4843E] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="email@domain.com"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50 focus:border-[#C4843E] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Subjek</label>
                  <select
                    value={form.subjek}
                    onChange={e => setForm(f => ({ ...f, subjek: e.target.value }))}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50 focus:border-[#C4843E] transition-all cursor-pointer"
                  >
                    <option value="">Pilih subjek</option>
                    <option>Pertanyaan Umum</option>
                    <option>Reservasi & Event</option>
                    <option>Kolaborasi Bisnis</option>
                    <option>Feedback & Saran</option>
                    <option>Lowongan Pekerjaan</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Pesan</label>
                  <textarea
                    required
                    rows={5}
                    value={form.pesan}
                    onChange={e => setForm(f => ({ ...f, pesan: e.target.value }))}
                    placeholder="Tuliskan pesan Anda di sini..."
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#C4843E]/50 focus:border-[#C4843E] resize-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-4 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    sent ? 'bg-green-600' : 'bg-[#C4843E] hover:bg-[#B8742E] hover:shadow-lg hover:shadow-[#C4843E]/30'
                  }`}
                >
                  {sent ? <><Check className="w-5 h-5" /> Pesan Terkirim!</> : <><Send className="w-5 h-5" /> Kirim Pesan</>}
                </button>
              </form>
            </div>

            {/* Google Maps placeholder */}
            <div className="mt-6 bg-card border border-border rounded-2xl overflow-hidden h-56 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-[#C4843E] mx-auto mb-2" />
                <p className="text-foreground font-medium text-sm">KOPIRA Coffee</p>
                <p className="text-muted-foreground text-xs">Jl. Sudirman Kav. 52, Jakarta Selatan</p>
                <a
                  href="#"
                  className="inline-block mt-3 text-[#C4843E] text-xs font-medium hover:underline"
                >
                  Buka di Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
