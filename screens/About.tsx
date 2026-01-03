
import React from 'react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleCopyPix = () => {
    const pixKey = "(85) 98881.1817";
    navigator.clipboard.writeText(pixKey);
    alert("Chave Pix copiada!");
  };

  return (
    <div className="relative flex flex-col h-screen bg-[#0f1115] text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-[#0f1115]/80 backdrop-blur-md z-10 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="flex size-10 items-center justify-center rounded-full hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Sobre o App</h1>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Hero Section */}
        <div className="flex flex-col items-center pt-8 pb-10">
          <div className="w-24 h-24 rounded-[24px] bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(17,82,212,0.5)] mb-8">
            <span className="material-symbols-outlined text-white text-[48px] fill-1">church</span>
          </div>

          <h2 className="text-[28px] font-bold text-center leading-tight mb-3">
            Liturgia & Comunidade
          </h2>

          <div className="bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              VERSÃO 2.5.0 - Orações Eucarísticas
            </span>
          </div>

          <div className="text-center space-y-3 px-2">
            <h3 className="text-xl font-bold">Gratuito e Colaborativo</h3>
            <p className="text-slate-400 text-base leading-relaxed">
              Este aplicativo foi desenvolvido para auxiliar na obra da Igreja. É totalmente gratuito para apoiar a sua liturgia diária.
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-slate-800/50 mb-8"></div>

        {/* Fale Conosco Section */}
        <section className="space-y-4 mb-10">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 pl-2">
            FALE CONOSCO
          </h3>

          <div className="bg-[#1a1d23] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
            <a
              href="https://wa.me/5585988811817?text=Ol%C3%A1%21%20Gostaria%20de%20enviar%20uma%20sugest%C3%A3o%20para%20o%20app%20Liturgia%20Di%C3%A1ria%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center p-4 hover:bg-white/5 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 text-blue-500">
                <span className="material-symbols-outlined text-xl">lightbulb</span>
              </div>
              <div className="flex-1">
                <span className="block text-sm font-bold">Enviar Sugestões</span>
                <span className="block text-[11px] text-slate-500">Tem uma ideia para melhorar?</span>
              </div>
              <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors">chevron_right</span>
            </a>

            <a
              href="https://wa.me/5585988811817?text=Ol%C3%A1%21%20Gostaria%20de%20relatar%20um%20erro%20no%20app%20Liturgia%20Di%C3%A1ria%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center p-4 hover:bg-white/5 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mr-4 text-orange-500">
                <span className="material-symbols-outlined text-xl">bug_report</span>
              </div>
              <div className="flex-1">
                <span className="block text-sm font-bold">Relatar Erros</span>
                <span className="block text-[11px] text-slate-500">Algo não funcionou? Avise-nos.</span>
              </div>
              <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors">chevron_right</span>
            </a>

            <a
              href="https://wa.me/5585988811817?text=Ol%C3%A1%21%20Tenho%20uma%20pergunta%20sobre%20o%20app%20Liturgia%20Di%C3%A1ria%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center p-4 hover:bg-white/5 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4 text-green-500">
                <span className="material-symbols-outlined text-xl">chat</span>
              </div>
              <div className="flex-1">
                <span className="block text-sm font-bold">Fazer Perguntas</span>
                <span className="block text-[11px] text-slate-500">Fale pelo WhatsApp</span>
              </div>
              <span className="material-symbols-outlined text-slate-600 group-hover:text-primary">open_in_new</span>
            </a>
          </div>
        </section>

        {/* Contribuição Section */}
        <section className="space-y-4 mb-10">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 pl-2">
            CONTRIBUIÇÃO
          </h3>

          <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1d23] to-[#12141a] rounded-[24px] p-6 border border-white/5 shadow-xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-2xl">favorite</span>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-1">Ajude a manter online</h4>
                <p className="text-sm text-slate-400 leading-relaxed px-4">
                  Este projeto é mantido por doações voluntárias. Sua ajuda cobre custos de IA e manutenção.
                </p>
              </div>

              <div className="w-full bg-black/30 rounded-2xl p-4 border border-white/5 flex flex-col items-center">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">CHAVE PIX / WHATSAPP</span>
                <span className="text-xl font-mono font-bold text-white">(85) 98881.1817</span>
              </div>

              <button
                onClick={handleCopyPix}
                className="w-full py-4 bg-primary hover:bg-blue-700 text-white font-black rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">content_copy</span>
                Copiar Chave Pix
              </button>
            </div>
          </div>
        </section>

        <p className="text-center text-[10px] text-slate-600 pb-10">
          © 2024 Liturgia Diária. Desenvolvido com carinho para a comunidade.
        </p>
      </main>
    </div>
  );
};

export default About;
