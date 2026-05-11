import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  CheckCircle2, 
  Smartphone, 
  X,
  MessageCircle,
  Mail,
  RefreshCw,
  Clock,
  Lock,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

const App = () => {
  const [direction, setDirection] = useState('RDC_TO_KEN');
  const [inputAmount, setInputAmount] = useState(100);
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    receiverName: '',
    receiverPhone: ''
  });

  const feePercent = 0.07;
  const rates = { 'RDC_TO_KEN': 129.50, 'KEN_TO_RDC': 0.00772 };
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

  const validatePhone = (phone, country) => {
    const cleaned = phone.replace(/\s/g, '');
    if (country === 'CD') return /^(243|\+243)[0-9]{9}$/.test(cleaned);
    if (country === 'KE') return /^(254|\+254)[0-9]{9}$/.test(cleaned);
    return false;
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.senderName.trim() || formData.senderName.trim().length < 2) errors.senderName = 'Nom invalide';
    if (!formData.receiverName.trim() || formData.receiverName.trim().length < 2) errors.receiverName = 'Nom invalide';
    const senderCountry = isRDCToKen ? 'CD' : 'KE';
    const receiverCountry = isRDCToKen ? 'KE' : 'CD';
    if (!validatePhone(formData.senderPhone, senderCountry)) errors.senderPhone = isRDCToKen ? 'Format: 243XXXXXXXXX' : 'Format: 254XXXXXXXXX';
    if (!validatePhone(formData.receiverPhone, receiverCountry)) errors.receiverPhone = isRDCToKen ? 'Format: 254XXXXXXXXX' : 'Format: 243XXXXXXXXX';
    if (inputAmount < 5) errors.amount = 'Montant minimum : 5$';
    if (inputAmount > 500) errors.amount = 'Montant maximum : 500$';
    return errors;
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setIsLoading(true);
    try {
      const response = await fetch("https://fintrans-backend.onrender.com/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, amount: inputAmount, direction })
      });
      if (response.ok) {
        const data = await response.json();
        setTransactionId(data.id);
        setIsSuccess(true);
        setTimeout(() => {
          setShowModal(false);
          setIsSuccess(false);
          setTransactionId('');
          setFormData({ senderName: '', senderPhone: '', receiverName: '', receiverPhone: '' });
          setFormErrors({});
        }, 5000);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (err) {
      setError("Impossible de contacter le serveur. Vérifiez votre connexion.");
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
  width: calc(100% - 2rem);
}
@media (min-width: 768px) {
  .section-rounded { 
    border-radius: 5rem; 
    margin-left: 2rem; 
    margin-right: 2rem;
    width: calc(100% - 4rem);
  }
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-reveal { animation: reveal 0.45s ease forwards; }
        * { box-sizing: border-box; }
body { overflow-x: hidden; max-width: 100vw; }
      `}</style>

      <div className="orb w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-600/20 -top-24 -left-24 max-w-full" />
<div className="orb w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-indigo-600/15 bottom-0 right-0 max-w-full" style={{ animationDelay: '-7s' }} />

     <nav className={`fixed top-0 left-0 right-0 w-full z-50 py-4 md:py-6 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 flex justify-between items-center w-full">
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.svg" alt="MuniaPay" className="h-9 w-auto" />
          </div>
          <a 
  href="https://wa.me/254742599719?text=Bonjour%20MuniaPay,%20j'ai%20besoin%20d'aide" 
  target="_blank" 
  rel="noopener noreferrer"
  className="glass-card text-white px-5 py-2 md:px-8 md:py-3 rounded-xl font-black text-xs hover:bg-green-500 hover:border-green-500 transition-all uppercase tracking-widest flex items-center gap-2"
>
  <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
  Help ?
</a>
        </div>
      </nav>

      <section className="relative pt-32 pb-16 md:pt-60 md:pb-32 text-center">
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-purple-400 text-xs font-black font-heading tracking-widest uppercase mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            Transferts Instantanés : RDC ↔ Kenya
          </div>
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-heading font-black italic leading-tight tracking-tighter uppercase mb-10 text-white">
            L'amour n'a pas <br />
            <span className="text-gradient">de distance.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto mb-16">
            Envoyez du soutien à ceux qui comptent vraiment. Pas de bureau à visiter, pas de capture d'écran à envoyer.
          </p>
          <button
            onClick={() => document.getElementById('calculateur').scrollIntoView({ behavior: 'smooth' })}
            className="relative px-12 py-6 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600" />
            <span className="relative font-heading font-black text-xs uppercase tracking-widest text-white">Calculer l'envoi</span>
          </button>
        </div>
      </section>

      <section className="py-12 md:py-24 relative" id="calculateur">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto glass-card p-6 md:p-10 rounded-3xl shadow-2xl border border-white/20">
            <div className="space-y-6 text-white">
              <div className="flex items-center justify-between bg-black/50 p-5 rounded-2xl border border-white/10">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-purple-400 uppercase tracking-widest mb-1 font-heading">Trajet des fonds</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{isRDCToKen ? '🇨🇩' : '🇰🇪'}</span>
                    <span className="text-white/40">→</span>
                    <span className="text-xl">{isRDCToKen ? '🇰🇪' : '🇨🇩'}</span>
                    <span className="text-xs font-black font-heading uppercase ml-1 text-white/60">
                      {isRDCToKen ? 'Congo vers Kenya' : 'Kenya vers Congo'}
                    </span>
                  </div>
                </div>
                <button onClick={() => setDirection(d => d === 'RDC_TO_KEN' ? 'KEN_TO_RDC' : 'RDC_TO_KEN')} className="p-3 bg-white/5 rounded-xl border border-white/10 text-white hover:bg-purple-600 transition-all">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-3 font-heading">Vous envoyez</label>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-baseline gap-1.5 flex-1">
                    <span className="text-2xl font-heading font-black text-purple-400">{isRDCToKen ? '$' : 'KES'}</span>
                    <input type="number" value={inputAmount} onChange={(e) => setInputAmount(parseFloat(e.target.value) || 0)} className="bg-transparent text-4xl font-heading font-black outline-none w-full text-white" min="5" max="500" />
                  </div>
                  <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-xl border border-white/10">
                    <span className="text-sm">{isRDCToKen ? '🇨🇩' : '🇰🇪'}</span>
                    <span className="font-black text-xs font-heading">{isRDCToKen ? 'USD' : 'KES'}</span>
                  </div>
                </div>
                {formErrors.amount && <p className="text-red-400 text-xs mt-2 font-heading">{formErrors.amount}</p>}
              </div>

              <div className="bg-purple-600/5 border border-purple-500/30 rounded-2xl p-6">
                <label className="text-xs font-black text-purple-400 uppercase tracking-widest block mb-3 font-heading">Ils reçoivent (en 15 min)</label>
                <div className="flex justify-between items-center gap-2">
                  <div className="text-4xl font-heading font-black w-full">
                    {finalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-500/30">
                    <span className="text-sm">{isRDCToKen ? '🇰🇪' : '🇨🇩'}</span>
                    <span className="font-black text-xs font-heading">{isRDCToKen ? 'KES' : 'USD'}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 text-xs text-center font-black text-slate-500 uppercase tracking-widest">
                  Frais {feeAmount.toFixed(2)} {isRDCToKen ? '$' : 'KES'} (7%) • Simple et honnête
                </div>
              </div>

              <button onClick={() => { setShowModal(true); setError(''); setFormErrors({}); }} className="w-full py-5 bg-white text-black rounded-2xl font-heading font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-200 transition-all">
                C'est parti !
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-xs font-black text-purple-500 uppercase tracking-widest font-heading italic mb-4">Le Processus</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic font-heading text-white">Comment ça <br /><span className="text-white/20">marche ?</span></h3>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { id: '01', title: 'Détails', desc: "Entrez les informations de l'expéditeur et du bénéficiaire.", icon: <MessageSquare /> },
              { id: '02', title: 'Paiement', desc: "Payez via votre compte Mobile Money habituel.", icon: <Smartphone /> },
              { id: '03', title: 'Réception', desc: "Le bénéficiaire reçoit l'argent sur M-Pesa en moins de 15 minutes.", icon: <CheckCircle2 /> }
            ].map((step, i) => (
              <div key={i} className="glass-card p-10 rounded-3xl hover:border-purple-500/50 transition-all relative overflow-hidden">
                <div className="absolute -top-6 -right-6 text-8xl font-black text-white/5 font-heading italic">{step.id}</div>
                <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center text-purple-400 mb-8">{step.icon}</div>
                <h4 className="text-xl font-black font-heading text-white uppercase italic mb-4">{step.title}</h4>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white section-rounded relative overflow-hidden shadow-2xl">
        <div className="container mx-auto max-w-7xl px-8 md:px-16 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-xs font-black text-purple-600 uppercase tracking-widest font-heading italic mb-4">Paroles de la famille</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic font-heading text-slate-900">
              On ne blague pas <br /><span className="text-purple-500/20">avec la confiance.</span>
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Maman Sarah", text: "Avant, mon fils devait aller à la banque... Là, je reçois mon M-Pesa même à minuit.", offset: "" },
              { name: "Junior K.", text: "J'utilise Munia Pay pour mon loyer au Kenya depuis le Congo. C'est carré.", offset: "md:translate-y-6" },
              { name: "Alain M.", text: "C'est le seul service qui ne me demande pas de scanner ma carte 3 fois.", offset: "md:translate-y-12" }
            ].map((t, i) => (
              <div key={i} className={`bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 ${t.offset}`}>
                <p className="font-heading font-black uppercase text-sm italic text-slate-900 mb-2">{t.name}</p>
                <p className="text-slate-600 text-lg italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#0a0c14] section-rounded my-12 md:my-20 relative overflow-hidden border border-white/5 shadow-2xl">
        <div className="container mx-auto max-w-7xl px-8 md:px-16 text-white">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-xs font-black text-purple-500 uppercase tracking-widest font-heading italic">Fini les tracas</h2>
            <h3 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic font-heading">L'urgence n'attend pas.</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Oubliez Western.", desc: "C'est votre numéro de téléphone qui compte. Zéro blocage.", icon: <X className="w-5 h-5"/> },
              { title: "Même à minuit.", desc: "L'argent arrive direct sur M-Pesa. Pas besoin d'ATM ouvert.", icon: <Clock className="w-5 h-5"/> },
              { title: "Zéro capture.", desc: "Notre système voit tout automatiquement.", icon: <Lock className="w-5 h-5"/> }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 md:p-10 rounded-3xl border border-white/10">
                <h4 className="text-xl font-black font-heading uppercase mb-3 italic">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-32">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-purple-500 uppercase tracking-widest font-heading italic mb-4">Questions fréquentes</h2>
            <h3 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic font-heading text-white">Des réponses à <br/><span className="text-white/20">vos doutes.</span></h3>
          </div>
          <div className="space-y-4 mb-20">
            {[
              { q: "C'est vraiment instantané ?", a: "Absolument. Le bénéficiaire reçoit ses fonds sur M-Pesa en moyenne sous 10 à 15 minutes." },
              { q: "Y a-t-il une limite de transfert ?", a: "Minimum 5$ et maximum 500$ par transaction. Contactez-nous pour augmenter ce plafond." },
              { q: "Mes informations sont-elles sécurisées ?", a: "Nous utilisons un cryptage de bout en bout. Nous ne stockons jamais vos accès Mobile Money." }
            ].map((item, i) => (
              <div key={i} className={`glass-card p-6 md:p-8 rounded-2xl cursor-pointer transition-all ${openFaq === i ? 'bg-purple-500/5 border-purple-500/30' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex justify-between items-center text-white">
                  <h4 className="text-sm font-black font-heading uppercase italic">{item.q}</h4>
                  <ChevronDown className={`transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180 text-purple-400' : ''}`} />
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 mt-4 pt-4 opacity-100 border-t border-white/5' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-400 text-sm">{item.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 md:p-12 glass-card rounded-3xl border border-purple-500/20 text-center">
            <h4 className="text-xl font-black font-heading text-white uppercase italic mb-4">Besoin d'un coup de main ?</h4>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">Notre équipe est disponible 7j/7.</p>
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

      <footer className="py-12 text-center border-t border-white/5">
        <img src="/logo.svg" alt="MuniaPay" className="h-8 w-auto mx-auto mb-4 opacity-50" />
        <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">© 2026 Munia Pay. Fait avec coeur.</p>
      </footer>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => !isLoading && !isSuccess && setShowModal(false)} />
          <div className="glass-card w-full max-w-2xl rounded-3xl relative p-8 md:p-12 border border-white/20 animate-reveal max-h-[90vh] overflow-y-auto">
            {!isSuccess && (
              <button onClick={() => !isLoading && setShowModal(false)} className="absolute top-6 right-6 text-white/30 hover:text-white transition-all">
                <X />
              </button>
            )}

            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✅</span>
                </div>
                <h4 className="text-2xl font-black uppercase italic font-heading mb-3 text-white">Transfert initié !</h4>
                <p className="text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
                  Votre famille recevra l'argent sous environ 15 minutes.
                </p>
                {transactionId && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-heading">Numéro de suivi</p>
                    <p className="text-purple-400 font-black text-sm font-mono">{transactionId.slice(0, 8).toUpperCase()}</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-black font-heading text-white uppercase italic text-center mb-6">Dernière étape.</h3>

                <div className="bg-purple-600/10 border border-purple-500/20 rounded-2xl p-5 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Vous envoyez</span>
                    <span className="text-white font-black">{inputAmount} {isRDCToKen ? 'USD' : 'KES'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-slate-400">Frais (7%)</span>
                    <span className="text-slate-400">-{feeAmount.toFixed(2)} {isRDCToKen ? 'USD' : 'KES'}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                    <span className="text-purple-400 font-black text-sm uppercase tracking-widest font-heading">Ils reçoivent</span>
                    <span className="text-white font-black text-lg">{finalAmount.toLocaleString(undefined, {maximumFractionDigits: 2})} {isRDCToKen ? 'KES' : 'USD'}</span>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <form className="space-y-4 text-white" onSubmit={handleTransfer}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input type="text" placeholder="VOTRE NOM" required className={`w-full bg-white/5 border rounded-xl p-4 outline-none focus:border-purple-500 transition-all ${formErrors.senderName ? 'border-red-500' : 'border-white/10'}`} value={formData.senderName} onChange={e => { setFormData({...formData, senderName: e.target.value}); setFormErrors({...formErrors, senderName: ''}); }} />
                      {formErrors.senderName && <p className="text-red-400 text-xs mt-1 font-heading">{formErrors.senderName}</p>}
                    </div>
                    <div>
                      <input type="tel" placeholder={isRDCToKen ? "243XXXXXXXXX" : "254XXXXXXXXX"} required className={`w-full bg-white/5 border rounded-xl p-4 outline-none focus:border-purple-500 transition-all ${formErrors.senderPhone ? 'border-red-500' : 'border-white/10'}`} value={formData.senderPhone} onChange={e => { setFormData({...formData, senderPhone: e.target.value}); setFormErrors({...formErrors, senderPhone: ''}); }} />
                      {formErrors.senderPhone && <p className="text-red-400 text-xs mt-1 font-heading">{formErrors.senderPhone}</p>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input type="text" placeholder="NOM DU BÉNÉFICIAIRE" required className={`w-full bg-white/5 border rounded-xl p-4 outline-none focus:border-purple-500 transition-all ${formErrors.receiverName ? 'border-red-500' : 'border-white/10'}`} value={formData.receiverName} onChange={e => { setFormData({...formData, receiverName: e.target.value}); setFormErrors({...formErrors, receiverName: ''}); }} />
                      {formErrors.receiverName && <p className="text-red-400 text-xs mt-1 font-heading">{formErrors.receiverName}</p>}
                    </div>
                    <div>
                      <input type="tel" placeholder={isRDCToKen ? "254XXXXXXXXX" : "243XXXXXXXXX"} required className={`w-full bg-white/5 border rounded-xl p-4 outline-none focus:border-purple-500 transition-all ${formErrors.receiverPhone ? 'border-red-500' : 'border-white/10'}`} value={formData.receiverPhone} onChange={e => { setFormData({...formData, receiverPhone: e.target.value}); setFormErrors({...formErrors, receiverPhone: ''}); }} />
                      {formErrors.receiverPhone && <p className="text-red-400 text-xs mt-1 font-heading">{formErrors.receiverPhone}</p>}
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full py-5 bg-purple-600 text-white rounded-xl font-black uppercase tracking-widest font-heading shadow-xl hover:bg-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? "Traitement en cours..." : "Confirmer l'envoi"}
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
