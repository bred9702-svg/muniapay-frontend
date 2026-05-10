import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  CheckCircle2,
  Smartphone,
  Zap,
  X,
  MessageCircle,
  Mail,
  RefreshCw,
  Clock,
  Lock,
  MessageSquare,
  Check
} from 'lucide-react';

const App = () => {
  const [direction, setDirection] = useState('RDC_TO_KEN');
  const [inputAmount, setInputAmount] = useState(100);
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activePreset, setActivePreset] = useState(100);

  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    receiverName: '',
    receiverPhone: ''
  });

  const feePercent = 0.07;
  const rates = {
    RDC_TO_KEN: 129.5,
    KEN_TO_RDC: 0.00772
  };

  const isRDCToKen = direction === 'RDC_TO_KEN';
  const currentRate = rates[direction];
  const feeAmount = inputAmount * feePercent;
  const netAmount = inputAmount - feeAmount;
  const finalAmount = netAmount * currentRate;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const handleTransfer = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://fintrans-backend.onrender.com/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, amount: inputAmount, direction })
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setShowModal(false);
          setIsSuccess(false);
          setFormData({ senderName: '', senderPhone: '', receiverName: '', receiverPhone: '' });
        }, 2500);
      } else {
        alert("Erreur lors du transfert. Réessayez.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 font-['Questrial'] antialiased overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,600;0,700;0,800;1,900&family=Questrial&display=swap');

        .font-heading {
          font-family: 'Poppins', sans-serif;
        }

        .text-gradient {
          background: linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #d8b4fe 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 5s linear infinite;
        }

        @keyframes shine {
          to { background-position: 200% center; }
        }

        .glass-card {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(25px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          pointer-events: none;
        }

        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .animate-reveal {
          animation: reveal 0.45s ease forwards;
        }

        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 rgba(168,85,247,0); }
          50% { box-shadow: 0 0 25px rgba(168,85,247,0.35); }
          100% { box-shadow: 0 0 0 rgba(168,85,247,0); }
        }

        .pulse-glow {
          animation: pulseGlow 2.5s infinite;
        }

        .section-rounded {
          border-radius: 4rem 4rem 0 0;
        }
      `}</style>

      {/* Background Decor */}
      <div className="orb w-[500px] h-[500px] bg-purple-600/20 -top-32 -left-32" />
      <div className="orb w-[400px] h-[400px] bg-indigo-600/10 bottom-0 right-0" />

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-50 py-5 transition-all duration-500 ${isScrolled ? 'bg-black/70 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="text-xl font-black tracking-tight uppercase font-heading">
              MUNIA<span className="text-purple-400">PAY</span>
            </div>
          </div>
          <button className="glass-card px-6 py-3 rounded-xl text-xs uppercase tracking-[0.2em] font-black hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95">
            Connexion
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-60 md:pb-32 text-center">
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-purple-400 text-[9px] font-black font-heading tracking-[0.2em] uppercase mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            Transferts Instantanés : RDC <span className="text-white/20">↔</span> Kenya
          </div>

          <h1 className="text-4xl md:text-8xl lg:text-9xl font-heading font-black italic leading-[1] md:leading-[0.85] tracking-tighter uppercase mb-10 text-white">
            L'amour n'a pas <br />
            <span className="text-gradient">de distance.</span>
          </h1>

          <p className="text-slate-400 text-base md:text-2xl max-w-2xl mx-auto mb-10">
            Envoyez du soutien à ceux qui comptent vraiment. Pas de bureau à visiter, pas de capture d'écran à envoyer. Juste vous et votre famille.
          </p>

          <p className="text-purple-300 text-sm md:text-base max-w-3xl mx-auto mb-16 leading-relaxed">
            Envoyez de l'argent entre la RDC et le Kenya en moins de 15 minutes via M-Pesa.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {['✓ Paiements sécurisés', '✓ Disponible 24/7', '✓ Compatible M-Pesa'].map((item, i) => (
              <div key={i} className="glass-card px-5 py-3 rounded-2xl text-xs md:text-sm text-white/80 border border-white/10">
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById('calculateur').scrollIntoView({ behavior: 'smooth' })}
            className="relative group px-12 py-6 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600" />
            <span className="relative font-heading font-black text-[11px] uppercase tracking-[0.2em] text-white">
              Calculer l'envoi
            </span>
          </button>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculateur" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto glass-card rounded-[3rem] p-8 md:p-12 shadow-2xl">
            <div className="flex items-center justify-between mb-8 bg-black/40 rounded-3xl p-5 border border-white/10">
              <div>
                <p className="text-purple-400 text-xs uppercase tracking-[0.2em] mb-2 font-black">Trajet des fonds</p>
                <div className="flex items-center gap-3 text-xl">
                  <span>{isRDCToKen ? '🇨🇩' : '🇰🇪'}</span>
                  <span>→</span>
                  <span>{isRDCToKen ? '🇰🇪' : '🇨🇩'}</span>
                </div>
              </div>
              <button
                onClick={() => setDirection(isRDCToKen ? 'KEN_TO_RDC' : 'RDC_TO_KEN')}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-600 transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {[50, 100, 250, 500].map((amount) => (
                <button
                  key={amount}
                  onClick={() => { setInputAmount(amount); setActivePreset(amount); }}
                  className={`px-5 py-3 rounded-xl text-sm font-black transition-all duration-300 ${
                    activePreset === amount ? 'bg-purple-600 text-white scale-105 pulse-glow' : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10 mb-6">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3 block font-black">Vous envoyez</label>
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-4xl font-black text-purple-400">$</span>
                  <input
                    type="number"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(parseFloat(e.target.value) || 0)}
                    className="bg-transparent outline-none text-5xl font-black w-full"
                  />
                </div>
                <div className="bg-black/40 border border-white/10 px-5 py-3 rounded-xl text-sm font-black">
                  {isRDCToKen ? 'USD' : 'KES'}
                </div>
              </div>
            </div>

            <div className="bg-purple-600/10 border border-purple-500/20 rounded-[2rem] p-8">
              <label className="text-xs uppercase tracking-[0.2em] text-purple-400 mb-3 block font-black">Ils reçoivent</label>
              <div className="flex justify-between items-center gap-4 mb-6">
                <div className="text-5xl font-black animate-reveal">
                  {finalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="bg-purple-500/20 border border-purple-500/20 px-5 py-3 rounded-xl text-sm font-black">
                  {isRDCToKen ? 'KES' : 'USD'}
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-400"><span>Taux actuel</span><span>1 USD = {currentRate} KES</span></div>
                <div className="flex justify-between text-slate-400"><span>Frais</span><span>${feeAmount.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-400"><span>Temps estimé</span><span className="text-green-400 font-black">~11 min</span></div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-purple-300 leading-relaxed">
                    Votre famille recevra environ <span className="text-white font-black">{finalAmount.toLocaleString()} {isRDCToKen ? 'KES' : 'USD'}</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full mt-8 py-6 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Continuer
            </button>
          </div>
        </div>
      </section>

      {/* Step Flow */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] font-heading italic mb-4">Le Processus</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic font-heading text-white">Comment ça <br /><span className="text-white/20">marche ?</span></h3>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { id: '01', title: 'Détails', desc: "Entrez les informations de l'expéditeur et du bénéficiaire.", icon: <MessageSquare /> },
              { id: '02', title: 'Paiement', desc: 'Payez via Mobile Money sans changer vos habitudes.', icon: <Smartphone /> },
              { id: '03', title: 'Réception', desc: 'Le bénéficiaire reçoit l’argent sur M-Pesa.', icon: <CheckCircle2 /> }
            ].map((step, i) => (
              <div key={i} className="glass-card p-10 rounded-[3rem] group hover:border-purple-500/50 transition-all relative overflow-hidden">
                <div className="absolute -top-6 -right-6 text-8xl font-black text-white/5 font-heading italic">{step.id}</div>
                <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center text-purple-400 mb-8">{step.icon}</div>
                <h4 className="text-xl md:text-2xl font-black font-heading text-white uppercase italic mb-4">{step.title}</h4>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - White Section */}
      <section className="py-20 md:py-32 bg-white section-rounded relative overflow-hidden shadow-2xl border border-slate-100">
        <div className="container mx-auto max-w-7xl px-8 md:px-16 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] font-heading italic mb-4">Paroles de la famille</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic font-heading text-slate-900">On ne blague pas <br /><span className="text-purple-500/20">avec la confiance.</span></h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Maman Sarah', text: 'Je reçois mon M-Pesa même quand il est minuit.', offset: '' },
              { name: 'Junior K.', text: 'Le service est rapide et simple.', offset: 'md:translate-y-6' },
              { name: 'Alain M.', text: 'Pas besoin de scanner des documents partout.', offset: 'md:translate-y-12' }
            ].map((t, i) => (
              <div key={i} className={`bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 ${t.offset}`}>
                <p className="font-heading font-black uppercase text-sm italic text-slate-900 mb-2">{t.name}</p>
                <p className="text-slate-600 text-lg italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100 text-center">
        <div className="text-2xl font-black tracking-tight uppercase mb-4 font-heading text-slate-900">
          MUNIA<span className="text-purple-600">PAY</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400 mb-6 uppercase tracking-widest font-black">
          <span>WhatsApp Support</span><span>•</span><span>24/7</span><span>•</span><span>Paiements sécurisés</span>
        </div>
        <p className="text-slate-300 text-xs uppercase tracking-[0.4em] font-black italic">© 2026 MuniaPay</p>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => !isLoading && setShowModal(false)} />
          <div className="glass-card relative w-full max-w-2xl rounded-[3rem] p-8 md:p-12 border border-white/20 animate-reveal">
            <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-all"><X /></button>

            {isSuccess ? (
              <div className="text-center py-10 animate-reveal">
                <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-8 pulse-glow"><Check className="w-10 h-10 text-green-400" /></div>
                <h4 className="text-3xl font-black uppercase italic font-heading mb-4 text-white">Transfert initié</h4>
                <p className="text-slate-400 max-w-md mx-auto leading-relaxed font-heading italic">Votre famille recevra l’argent sous environ 15 minutes. Merci de votre confiance.</p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-black uppercase italic font-heading text-center mb-10 text-white text-gradient">Finaliser l'envoi</h3>
                <form className="space-y-6" onSubmit={handleTransfer}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Votre nom" required value={formData.senderName} onChange={(e) => setFormData({ ...formData, senderName: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-purple-500 transition-all duration-300 focus:scale-[1.02] text-white" />
                    <input type="tel" placeholder="Votre numéro" required value={formData.senderPhone} onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-purple-500 transition-all duration-300 focus:scale-[1.02] text-white" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Nom du bénéficiaire" required value={formData.receiverName} onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-purple-500 transition-all duration-300 focus:scale-[1.02] text-white" />
                    <input type="tel" placeholder="Numéro de réception" required value={formData.receiverPhone} onChange={(e) => setFormData({ ...formData, receiverPhone: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-purple-500 transition-all duration-300 focus:scale-[1.02] text-white" />
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-95 text-white shadow-xl shadow-purple-500/20">
                    {isLoading ? <RefreshCw className="animate-spin inline-block mr-2" /> : 'Confirmer le transfert'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
