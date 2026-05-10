import React, { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, 
  ChevronDown, 
  CheckCircle2, 
  Send, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  X,
  MessageCircle,
  Mail,
  RefreshCw,
  Clock,
  Lock,
  MessageSquare
} from 'lucide-react';

const App = () => {
  // --- ÉTATS ---
  const [direction, setDirection] = useState('RDC_TO_KEN');
  const [inputAmount, setInputAmount] = useState(100);
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- FORMULAIRE ---
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    receiverName: '',
    receiverPhone: ''
  });

  // --- LOGIQUE CALCUL ---
  const feePercent = 0.07;
  const rates = { 'RDC_TO_KEN': 129.50, 'KEN_TO_RDC': 0.00772 };
  const isRDCToKen = direction === 'RDC_TO_KEN';
  const currentRate = rates[direction];
  const netAmount = inputAmount - (inputAmount * feePercent);
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
        setShowModal(false);
        setFormData({ senderName: '', senderPhone: '', receiverName: '', receiverPhone: '' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 font-['Questrial'] antialiased selection:bg-purple-500/30 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,600;0,700;0,800;1,900&family=Questrial&display=swap');
        .font-heading { font-family: 'Poppins', sans-serif; }
        .text-gradient {
          background: linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #d8b4fe 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 5s linear infinite;
        }
        @keyframes shine { to { background-position: 200% center; } }
        .glass-card {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.15;
          pointer-events: none;
          animation: float 20s infinite alternate ease-in-out;
        }
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, 30px) scale(1.2); }
        }
        .section-rounded {
          border-radius: 3rem;
          margin-left: 1rem;
          margin-right: 1rem;
        }
        @media (min-width: 768px) {
          .section-rounded { border-radius: 5rem; margin-left: 2rem; margin-right: 2rem; }
        }
      `}</style>

      {/* BACKGROUND EFFECTS */}
      <div className="orb w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-600/20 -top-24 -left-24" />
      <div className="orb w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-indigo-600/15 bottom-0 -right-12" style={{ animationDelay: '-7s' }} />

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 py-4 md:py-6 transition-all duration-500 font-heading ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="text-lg md:text-xl flex items-baseline text-white font-black tracking-tighter uppercase">
                MUNIA<span className="text-purple-400 font-normal">PAY</span>
            </div>
          </div>
          <button className="glass-card text-white px-5 py-2 md:px-8 md:py-3 rounded-xl font-black text-[9px] md:text-[10px] hover:bg-white/10 transition-all uppercase tracking-[0.2em]">
            Connexion
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
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
          <p className="text-slate-400 text-base md:text-2xl max-w-2xl mx-auto mb-16">
            Envoyez du soutien à ceux qui comptent vraiment. Pas de bureau à visiter, pas de capture d'écran à envoyer. Juste vous et votre famille.
          </p>
          <button 
            onClick={() => document.getElementById('calculateur').scrollIntoView({ behavior: 'smooth' })}
            className="relative group px-12 py-6 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600" />
            <span className="relative font-heading font-black text-[11px] uppercase tracking-[0.2em] text-white">Calculer l'envoi</span>
          </button>
        </div>
      </section>

      {/* CALCULATEUR */}
      <section className="py-12 md:py-24 relative" id="calculateur">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto glass-card p-6 md:p-10 rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-white/20">
            <div className="space-y-8 text-white">
              <div className="flex items-center justify-between bg-black/50 p-5 rounded-3xl border border-white/10">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-purple-400 uppercase tracking-[0.1em] mb-1 font-heading italic">Trajet des fonds</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{isRDCToKen ? '🇨🇩' : '🇰🇪'}</span>
                    <div className="w-4 h-[1px] bg-white/20" />
                    <span className="text-xl">{isRDCToKen ? '🇰🇪' : '🇨🇩'}</span>
                    <span className="text-[9px] font-black font-heading uppercase italic ml-1 text-white/80">
                        {isRDCToKen ? 'Congo vers Kenya' : 'Kenya vers Congo'}
                    </span>
                  </div>
                </div>
                <button onClick={() => setDirection(d => d === 'RDC_TO_KEN' ? 'KEN_TO_RDC' : 'RDC_TO_KEN')} className="p-4 bg-white/5 rounded-xl border border-white/10 text-white hover:bg-purple-600 transition-all">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-3 font-heading italic">Vous envoyez</label>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-baseline gap-1.5 flex-1">
                    <span className="text-2xl md:text-3xl font-heading font-black text-purple-400 italic">{isRDCToKen ? '$' : ''}</span>
                    <input type="number" value={inputAmount} onChange={(e) => setInputAmount(parseFloat(e.target.value) || 0)} className="bg-transparent text-3xl md:text-5xl font-heading font-black outline-none w-full text-white" />
                  </div>
                  <div className="flex items-center gap-2 bg-black/60 px-5 py-3 rounded-xl border border-white/10">
                    <span className="text-sm">{isRDCToKen ? '🇨🇩' : '🇰🇪'}</span>
                    <span className="font-black text-[10px] font-heading">{isRDCToKen ? 'USD' : 'KES'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-600/5 border border-purple-500/30 rounded-[2rem] p-8">
                <label className="text-[9px] font-black text-purple-400 uppercase tracking-[0.2em] block mb-3 font-heading italic">Ils reçoivent (en 15 min)</label>
                <div className="flex justify-between items-center gap-2 relative z-10">
                  <div className="text-3xl md:text-5xl font-heading font-black w-full">
                    {finalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: (isRDCToKen ? 2 : 4) })}
                  </div>
                  <div className="flex items-center gap-2 bg-purple-500/20 px-5 py-3 rounded-xl border border-purple-500/30">
                    <span className="text-sm">{isRDCToKen ? '🇰🇪' : '🇨🇩'}</span>
                    <span className="font-black text-[10px] font-heading">{isRDCToKen ? 'KES' : 'USD'}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-[9px] text-center font-black text-slate-500 uppercase tracking-[0.2em] italic">
                    Frais 7% • Simple et honnête
                </div>
              </div>

              <button onClick={() => setShowModal(true)} className="w-full py-6 bg-white text-black rounded-2xl font-heading font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-slate-200 transition-all">
                C'est parti !
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] font-heading italic mb-4">Le Processus</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic font-heading text-white">Comment ça <br /><span className="text-white/20">marche ?</span></h3>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { id: '01', title: 'Détails', desc: "Entrez les informations de l'expéditeur et du bénéficiaire. C'est simple et sans paperasse.", icon: <MessageSquare /> },
              { id: '02', title: 'Paiement', desc: "Payez via votre compte Mobile Money habituel. Pas besoin de changer vos habitudes.", icon: <Smartphone /> },
              { id: '03', title: 'Réception', desc: "Le bénéficiaire reçoit l'argent sur son M-Pesa en moins de 15 minutes. Garanti.", icon: <CheckCircle2 /> }
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

      {/* TÉMOIGNAGES */}
      <section className="py-20 md:py-32 bg-white section-rounded relative overflow-hidden shadow-2xl border border-slate-100">
        <div className="container mx-auto max-w-7xl px-8 md:px-16 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] font-heading italic mb-4">Paroles de la famille</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic font-heading text-slate-900">
              On ne blague pas <br /><span className="text-purple-500/20">avec la confiance.</span>
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Maman Sarah", text: "Avant, mon fils devait aller à la banque, envoyer la photo... Là, je reçois mon M-Pesa même quand il est minuit. C'est magique.", offset: "" },
              { name: "Junior K.", text: "J'utilise Munia Pay pour mon loyer ici au Kenya depuis le Congo. C'est carré, pas besoin de justifier 100 fois chaque envoi.", offset: "md:translate-y-6" },
              { name: "Alain M.", text: "C'est le seul service qui ne me demande pas de scanner ma carte 3 fois pour un petit envoi. C'est rapide.", offset: "md:translate-y-12" }
            ].map((t, i) => (
              <div key={i} className={`bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 ${t.offset}`}>
                <p className="font-heading font-black uppercase text-sm italic text-slate-900 mb-2">{t.name}</p>
                <p className="text-slate-600 text-lg italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="py-20 md:py-32 bg-[#0a0c14] section-rounded my-12 md:my-20 relative overflow-hidden border border-white/5 shadow-2xl">
        <div className="container mx-auto max-w-7xl px-8 md:px-16 text-white">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-[9px] font-black text-purple-500 uppercase tracking-[0.3em] font-heading italic">Fini les tracas</h2>
            <h3 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic font-heading">L'urgence n'attend pas.</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Oubliez Western.", desc: "Une erreur d'une lettre ? Avec nous, c'est votre numéro de téléphone qui compte. Zéro blocage.", icon: <X className="w-5 h-5"/> },
              { title: "Même à minuit.", desc: "Envoyez depuis votre lit, l'argent arrive direct sur leur M-Pesa. Pas besoin d'ATM ouvert.", icon: <Clock className="w-5 h-5"/> },
              { title: "Zéro capture.", desc: "Pas besoin de prouver avec une photo WhatsApp. Notre système voit tout automatiquement.", icon: <Lock className="w-5 h-5"/> }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 md:p-10 rounded-[2.5rem] group border border-white/10">
                <h4 className="text-xl md:text-2xl font-black font-heading uppercase mb-3 italic tracking-tighter">{item.title}</h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & ASSISTANCE */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] font-heading italic mb-4">Questions fréquentes</h2>
            <h3 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic font-heading text-white">Des réponses à <br/><span className="text-white/20">vos doutes.</span></h3>
          </div>
          <div className="space-y-4 mb-20">
            {[
              { q: "C'est vraiment instantané ?", a: "Absolument. Une fois votre paiement validé, notre système traite l'envoi immédiatement. Le bénéficiaire reçoit ses fonds sur M-Pesa en moyenne sous 10 à 15 minutes." },
              { q: "Y a-t-il une limite de transfert ?", a: "Pour la sécurité, nous limitons les nouveaux utilisateurs à 500$ par transaction. Contactez-nous pour augmenter ce plafond." },
              { q: "Mes informations sont-elles sécurisées ?", a: "Nous utilisons un cryptage de bout en bout. Nous ne stockons jamais vos accès Mobile Money personnels." }
            ].map((item, i) => (
              <div key={i} className={`glass-card p-6 md:p-8 rounded-3xl cursor-pointer transition-all ${openFaq === i ? 'bg-purple-500/5 border-purple-500/30' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex justify-between items-center text-white">
                  <h4 className="text-xs md:text-base font-black font-heading uppercase italic">{item.q}</h4>
                  <ChevronDown className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-purple-400' : ''}`} />
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 mt-6 pt-6 opacity-100 border-t border-white/5' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-400 text-sm md:text-base">{item.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ASSISTANCE */}
          <div className="p-8 md:p-12 glass-card rounded-[3rem] border border-purple-500/20 text-center relative overflow-hidden group">
            <h4 className="text-xl md:text-2xl font-black font-heading text-white uppercase italic mb-4">Besoin d'un coup de main ?</h4>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">Notre équipe est disponible 7j/7 pour répondre à vos questions ou vous aider en cas de problème.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href="#" className="flex items-center gap-3 px-8 py-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 font-heading font-black text-xs uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href="#" className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-heading font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                <Mail className="w-4 h-4" /> E-mail Support
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center border-t border-white/5">
        <div className="brand-name text-xl text-white font-black opacity-50 mb-4 uppercase">MUNIA<span className="text-purple-400 font-normal">PAY</span></div>
        <p className="text-[8px] font-bold text-slate-700 uppercase tracking-[0.3em]">© 2024 Munia Pay. Fait avec coeur.</p>
      </footer>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowModal(false)} />
          <div className="glass-card w-full max-w-2xl rounded-[3rem] relative p-8 md:p-12 border border-white/20 animate-reveal">
            <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-white/30 hover:text-white"><X /></button>
            <h3 className="text-2xl md:text-3xl font-black font-heading text-white uppercase italic text-center mb-8">Dernière étape.</h3>
            <form className="space-y-6 text-white" onSubmit={handleTransfer}>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="VOTRE NOM" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-purple-500" value={formData.senderName} onChange={e => setFormData({...formData, senderName: e.target.value})} />
                <input type="tel" placeholder="VOTRE NUMÉRO" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-purple-500" value={formData.senderPhone} onChange={e => setFormData({...formData, senderPhone: e.target.value})} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="NOM DU BÉNÉFICIAIRE" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-purple-500" value={formData.receiverName} onChange={e => setFormData({...formData, receiverName: e.target.value})} />
                <input type="tel" placeholder="NUMÉRO DE RÉCEPTION" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-purple-500" value={formData.receiverPhone} onChange={e => setFormData({...formData, receiverPhone: e.target.value})} />
              </div>
              <button type="submit" disabled={isLoading} className="w-full py-5 bg-purple-600 text-white rounded-xl font-black uppercase tracking-[0.2em] font-heading shadow-xl hover:bg-purple-500 transition-all">
                {isLoading ? "Traitement..." : "Confirmer l'envoi"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
