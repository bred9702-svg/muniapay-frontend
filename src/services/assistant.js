const ASSISTANT_API_URL = import.meta.env.VITE_ASSISTANT_API_URL || '/api/assistant/chat';

export const getLocalFallbackReply = (message) => {
  const text = message.toLowerCase();

  if (/(hello|hi|hey|english)/.test(text)) {
    return "Hello! I can help with onboarding and support. You can ask about transfer limits, fees, delivery time, or supported operators.";
  }

  if (/(habari|jambo|swahili)/.test(text)) {
    return "Habari 👋 Naweza kusaidia kuhusu onboarding na support: ada, muda wa kutuma pesa, na operators wanaokubaliwa.";
  }

  if (/(frais|fee|cost|commission)/.test(text)) {
    return "Les frais sont de 7% tout compris. Aucun frais caché n’est ajouté.";
  }

  if (/(limite|limit|max|min|montant)/.test(text)) {
    return "La limite standard est de 5$ minimum et 500$ maximum par transaction.";
  }

  if (/(combien de temps|instant|minutes|delay|muda)/.test(text)) {
    return "Un transfert arrive en moyenne en 10 à 15 minutes. Dans de rares cas, cela peut aller jusqu’à 30 minutes.";
  }

  if (/(operateur|opérateur|operator|mpesa|airtel|orange)/.test(text)) {
    return "Opérateurs supportés: RDC (Vodacom M-Pesa, Airtel Money, Orange Money) et Kenya (M-Pesa Safaricom).";
  }

  if (/(onboarding|commencer|start|first transfer|premier transfert)/.test(text)) {
    return "Onboarding rapide: 1) Clique sur “Calculer l’envoi”. 2) Saisis montant et numéros. 3) Confirme sur ton téléphone avec ton PIN Mobile Money.";
  }

  if (/(status|statut|suivi|transaction)/.test(text)) {
    return "Je peux expliquer le suivi (COLLECTING, SENDING, COMPLETED, FAILED). Pour un cas précis, contacte le support WhatsApp pour assistance humaine.";
  }

  return "Je n’ai pas assez d’informations pour répondre avec certitude. Peux-tu reformuler, ou contacter le support WhatsApp pour une aide humaine ?";
};

export const askAssistant = async ({ message, history = [] }) => {
  const response = await fetch(ASSISTANT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message, history })
  });

  if (!response.ok) {
    throw new Error('Assistant API unavailable');
  }

  const data = await response.json();

  if (!data?.reply || typeof data.reply !== 'string') {
    throw new Error('Invalid assistant response');
  }

  return data.reply;
};
