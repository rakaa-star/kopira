import { ArrowRight, Award, Heart, Leaf, Users, Coffee, Globe } from 'lucide-react';
import { Link } from 'react-router';

const team = [
  { name: 'Arif Wibowo', role: 'Founder & Head Barista', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', bio: 'Barista Champion Indonesia 2022, 12 tahun pengalaman di industri kopi premium.' },
  { name: 'Siti Rahma', role: 'Co-Founder & Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', bio: 'Ahli bisnis kuliner dengan 8 tahun pengalaman membangun brand F&B Indonesia.' },
  { name: 'Bintang Pratama', role: 'Head of Quality', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', bio: 'Q-Grader bersertifikat SCA, memastikan setiap biji kopi memenuhi standar tertinggi.' },
];

const values = [
  { icon: Leaf, title: 'Berkelanjutan', desc: 'Kami bekerja langsung dengan petani lokal menggunakan praktik pertanian yang bertanggung jawab dan ramah lingkungan.' },
  { icon: Heart, title: 'Penuh Passion', desc: 'Setiap cangkir adalah ekspresi cinta kami terhadap kopi. Tidak ada kompromi dalam kualitas dan rasa.' },
  { icon: Users, title: 'Komunitas', desc: 'KOPIRA adalah ruang tumbuh bersama — untuk pelanggan, karyawan, dan petani kopi Indonesia.' },
  { icon: Globe, title: 'Lokal Mendunia', desc: 'Memperkenalkan kopi Indonesia ke panggung dunia, dimulai dari satu cangkir sempurna.' },
];

const milestones = [
  { year: '2019', title: 'Lahir dari Garage', desc: 'KOPIRA dimulai sebagai kafe kecil di Kemang, Jakarta Selatan.' },
  { year: '2020', title: 'Bertahan & Berkembang', desc: 'Pandemi tidak menghentikan kami — lahirnya layanan delivery dan menu digital.' },
  { year: '2022', title: 'Penghargaan Nasional', desc: 'Masuk daftar "10 Kafe Terbaik Indonesia" versi Majalah F&B Monthly.' },
  { year: '2024', title: 'Ekspansi & Inovasi', desc: 'Membuka cabang ke-3, meluncurkan sistem QR ordering, dan program loyalti.' },
  { year: '2026', title: 'Menuju 1000 Pelanggan Setia', desc: 'Milestone komunitas dan rencana ekspansi ke kota-kota besar Indonesia.' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469631423273-6995642a6a40?w=1920&h=800&fit=crop&auto=format"
          alt="KOPIRA interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0703]/90 to-[#0D0703]/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-3">Cerita Kami</p>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2 }}>
            Lebih dari Sekadar Kopi,<br />
            <span className="text-[#C4843E] italic">Ini adalah Cara Hidup</span>
          </h1>
          <p className="text-white/70 max-w-xl">
            KOPIRA lahir dari keyakinan bahwa kopi Indonesia layak mendapat tempat di panggung dunia — dan setiap tegukan harus menjadi cerita yang tak terlupakan.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-3">Tentang Kami</p>
              <h2 className="text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                Filosofi di Balik Setiap Cangkir
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                KOPIRA bermula dari pertanyaan sederhana: "Mengapa kopi Indonesia yang terkenal di dunia, justru kurang dihargai di negeri sendiri?" Dari situlah kami memulai perjalanan untuk menghadirkan pengalaman kopi kelas dunia dengan bahan-bahan terbaik dari bumi Nusantara.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Kami percaya bahwa kopi bukan sekadar minuman — ia adalah bahasa universal yang menyatukan manusia. Di KOPIRA, kami menciptakan ruang di mana cerita-cerita terbaik bermula dari secangkir kopi yang sempurna.
              </p>
              <Link to="/menu" className="inline-flex items-center gap-2 bg-[#C4843E] text-white hover:bg-[#B8742E] px-6 py-3.5 rounded-full font-medium transition-all">
                Coba Menu Kami <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-5">
              <div className="p-6 bg-[#1A0F0A] rounded-3xl">
                <h3 className="text-white font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Visi</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Menjadi brand kopi Indonesia yang paling dicintai secara nasional dan diakui secara internasional sebagai representasi keunggulan kopi Nusantara.
                </p>
              </div>
              <div className="p-6 bg-card border border-border rounded-3xl">
                <h3 className="text-foreground font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Misi</h3>
                <ul className="space-y-2">
                  {[
                    'Menghadirkan kopi single origin Indonesia berkualitas premium',
                    'Memberdayakan petani kopi lokal secara langsung dan adil',
                    'Menciptakan pengalaman café yang tak terlupakan di setiap kunjungan',
                    'Mengedukasi masyarakat tentang kekayaan kopi Indonesia',
                  ].map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-[#C4843E]/20 text-[#C4843E] flex items-center justify-center text-xs shrink-0 mt-0.5">{i+1}</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-[#FAF0E6]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-3">Nilai-Nilai Kami</p>
            <h2 className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem' }}>Yang Kami Percaya</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card rounded-3xl p-6 border border-border hover:border-[#C4843E]/30 hover:-translate-y-1 transition-all shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#C4843E]/15 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#C4843E]" />
                </div>
                <h3 className="text-foreground font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-[#1A0F0A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-3">Perjalanan Kami</p>
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem' }}>Dari Garasi ke Panggung Nasional</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px h-full w-px bg-[#C4843E]/20" />
            {milestones.map((m, i) => (
              <div key={i} className={`flex items-start gap-8 mb-10 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span className="text-[#C4843E] font-bold text-sm">{m.year}</span>
                  <h3 className="text-white font-bold my-1" style={{ fontFamily: "'Playfair Display', serif" }}>{m.title}</h3>
                  <p className="text-white/60 text-sm">{m.desc}</p>
                </div>
                <div className="relative z-10 w-4 h-4 rounded-full bg-[#C4843E] border-2 border-[#C4843E]/30 shrink-0 mt-1" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-3">Tim Kami</p>
            <h2 className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem' }}>Orang-Orang di Balik Kopira</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {team.map(member => (
              <div key={member.name} className="text-center group">
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 shadow-xl ring-4 ring-background group-hover:ring-[#C4843E]/30 transition-all">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-foreground font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{member.name}</h3>
                <p className="text-[#C4843E] text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed px-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#C4843E]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem' }}>Bergabunglah dengan Cerita Kami</h2>
          <p className="text-white/80 mb-8">Kunjungi kami dan rasakan sendiri mengapa KOPIRA bukan sekadar kafe biasa</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/menu" className="bg-white text-[#C4843E] hover:bg-white/90 px-8 py-3.5 rounded-full font-semibold transition-all">
              Lihat Menu
            </Link>
            <Link to="/kontak" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-semibold transition-all">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
