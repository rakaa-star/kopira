import { useState } from 'react';
import { Star, Gift, Zap, Crown, Coffee, ArrowRight, Check, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

const tiers = [
  { name: 'Bronze', minPts: 0, maxPts: 999, color: '#CD7F32', bg: '#CD7F32', icon: Coffee, perks: ['Diskon 5% setiap pembelian', 'Free Birthday drink', 'Akses menu eksklusif'] },
  { name: 'Silver', minPts: 1000, maxPts: 4999, color: '#A0AEC0', bg: '#9CA3AF', icon: Star, perks: ['Semua keuntungan Bronze', 'Diskon 10%', 'Priority ordering', 'Free upgrade size'] },
  { name: 'Gold', minPts: 5000, maxPts: 9999, color: '#C4843E', bg: '#C4843E', icon: Crown, perks: ['Semua keuntungan Silver', 'Diskon 15%', 'Free topping setiap order', '2x poin setiap hari Senin'] },
  { name: 'Platinum', minPts: 10000, maxPts: Infinity, color: '#6B46C1', bg: '#7C3AED', icon: Crown, perks: ['Semua keuntungan Gold', 'Diskon 20%', 'Dedicated barista', 'Exclusive tasting events'] },
];

const rewards = [
  { id: 1, name: 'Espresso Gratis', points: 200, image: 'https://images.unsplash.com/photo-1652507733698-b0c536a92cd4?w=200&h=200&fit=crop', value: 'Rp 28.000' },
  { id: 2, name: 'Kopira Latte Gratis', points: 350, image: 'https://images.unsplash.com/photo-1593543294918-ca3634e04cdb?w=200&h=200&fit=crop', value: 'Rp 38.000' },
  { id: 3, name: 'Diskon 25%', points: 500, image: 'https://images.unsplash.com/photo-1563311977-d285756282dc?w=200&h=200&fit=crop', value: 'Diskon Rp 15.000' },
  { id: 4, name: 'Signature Blend Gratis', points: 450, image: 'https://images.unsplash.com/photo-1549652127-2e5e59e86a7a?w=200&h=200&fit=crop', value: 'Rp 52.000' },
  { id: 5, name: 'Cashback Rp 20K', points: 400, image: 'https://images.unsplash.com/photo-1558122104-355edad709f6?w=200&h=200&fit=crop', value: 'Cashback Rp 20.000' },
  { id: 6, name: 'Upgrade Size Gratis', points: 150, image: 'https://images.unsplash.com/photo-1650097364104-eef0e54af0da?w=200&h=200&fit=crop', value: 'Upgrade Gratis' },
];

const history = [
  { date: '17 Jun 2026', desc: 'Pembelian Kopira Latte x2', points: +80, type: 'earn' },
  { date: '15 Jun 2026', desc: 'Penukaran reward Espresso', points: -200, type: 'redeem' },
  { date: '12 Jun 2026', desc: 'Pembelian Signature Blend', points: +520, type: 'earn' },
  { date: '10 Jun 2026', desc: 'Bonus Anniversary', points: +500, type: 'bonus' },
  { date: '8 Jun 2026', desc: 'Pembelian Cold Brew', points: +420, type: 'earn' },
];

export function LoyaltyPage() {
  const { loyaltyPoints } = useApp();
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'rewards' | 'history'>('rewards');

  const currentTier = [...tiers].reverse().find(t => loyaltyPoints >= t.minPts) || tiers[0];
  const nextTier = tiers.find(t => t.minPts > loyaltyPoints);
  const progress = nextTier
    ? ((loyaltyPoints - currentTier.minPts) / (nextTier.minPts - currentTier.minPts)) * 100
    : 100;

  const handleRedeem = (rewardId: number, pts: number) => {
    if (loyaltyPoints >= pts && !redeemedRewards.includes(rewardId)) {
      setRedeemedRewards(prev => [...prev, rewardId]);
    }
  };

  const TierIcon = currentTier.icon;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-[#1A0F0A] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C4843E] text-sm font-medium tracking-widest uppercase mb-3">Program Loyalti</p>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            KOPIRA Rewards
          </h1>
          <p className="text-white/60">Setiap cangkir membawa Anda lebih dekat ke hadiah istimewa</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Current Status Card */}
        <div className="relative overflow-hidden bg-[#1A0F0A] rounded-3xl p-7 mb-8 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${currentTier.color}, transparent)`, transform: 'translate(30%, -30%)' }} />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/60 text-sm mb-1">Anggota sejak Januari 2024</p>
                <p className="text-white text-lg font-bold">Pelanggan KOPIRA</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${currentTier.color}30`, border: `1px solid ${currentTier.color}50` }}>
                <TierIcon className="w-4 h-4" style={{ color: currentTier.color }} />
                <span className="text-sm font-bold" style={{ color: currentTier.color }}>{currentTier.name}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-2 mb-1">
                <span className="text-white font-bold" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', lineHeight: 1 }}>
                  {loyaltyPoints.toLocaleString('id')}
                </span>
                <span className="text-white/60 text-sm mb-2">poin</span>
              </div>
              {nextTier && (
                <p className="text-white/60 text-xs">{(nextTier.minPts - loyaltyPoints).toLocaleString('id')} poin lagi menuju {nextTier.name}</p>
              )}
            </div>

            {nextTier && (
              <div>
                <div className="flex justify-between text-xs text-white/50 mb-1.5">
                  <span>{currentTier.name}</span>
                  <span>{nextTier.name}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%`, backgroundColor: currentTier.color }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {tiers.map(tier => {
            const Icon = tier.icon;
            const isActive = tier.name === currentTier.name;
            return (
              <div key={tier.name} className={`p-4 rounded-2xl border text-center transition-all ${isActive ? 'border-[#C4843E] bg-[#C4843E]/5 shadow-lg' : 'border-border bg-card'}`}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${tier.color}20` }}>
                  <Icon className="w-5 h-5" style={{ color: tier.color }} />
                </div>
                <p className="font-bold text-sm text-foreground mb-1">{tier.name}</p>
                <p className="text-xs text-muted-foreground">{tier.minPts.toLocaleString()} pts</p>
                {isActive && <span className="inline-block mt-2 text-[10px] bg-[#C4843E] text-white px-2 py-0.5 rounded-full">Aktif</span>}
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-xl p-1 mb-8 w-fit">
          {(['rewards', 'history'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === tab ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {tab === 'rewards' ? 'Tukar Poin' : 'Riwayat'}
            </button>
          ))}
        </div>

        {activeTab === 'rewards' ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {rewards.map(reward => {
              const canRedeem = loyaltyPoints >= reward.points;
              const redeemed = redeemedRewards.includes(reward.id);
              return (
                <div key={reward.id} className={`bg-card border rounded-2xl overflow-hidden transition-all ${redeemed ? 'border-green-400/30 opacity-75' : 'border-border hover:border-[#C4843E]/30 hover:-translate-y-0.5'}`}>
                  <div className="h-36 overflow-hidden bg-muted">
                    <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-foreground font-semibold text-sm mb-1">{reward.name}</h3>
                    <p className="text-muted-foreground text-xs mb-3">Senilai {reward.value}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#C4843E]" fill="currentColor" />
                        <span className="text-sm font-bold text-[#C4843E]">{reward.points} pts</span>
                      </div>
                      <button
                        onClick={() => handleRedeem(reward.id, reward.points)}
                        disabled={!canRedeem || redeemed}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          redeemed ? 'bg-green-100 text-green-700' : canRedeem ? 'bg-[#C4843E] text-white hover:bg-[#B8742E]' : 'bg-muted text-muted-foreground cursor-not-allowed'
                        }`}
                      >
                        {redeemed ? <><Check className="w-3 h-3" /> Ditukar</> : canRedeem ? 'Tukar' : 'Kurang poin'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {history.map((h, i) => (
              <div key={i} className={`flex items-center justify-between px-5 py-4 ${i < history.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${h.type === 'earn' ? 'bg-green-100' : h.type === 'bonus' ? 'bg-[#C4843E]/15' : 'bg-red-100'}`}>
                    {h.type === 'earn' ? <Zap className="w-4 h-4 text-green-600" /> : h.type === 'bonus' ? <Gift className="w-4 h-4 text-[#C4843E]" /> : <ArrowRight className="w-4 h-4 text-red-500" />}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-medium">{h.desc}</p>
                    <p className="text-muted-foreground text-xs">{h.date}</p>
                  </div>
                </div>
                <span className={`font-bold text-sm ${h.points > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {h.points > 0 ? '+' : ''}{h.points}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Current tier perks */}
        <div className="mt-10 p-6 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[#C4843E]" />
            <h3 className="text-foreground font-semibold">Keuntungan {currentTier.name} Anda</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {currentTier.perks.map(perk => (
              <div key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 shrink-0" />
                {perk}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
