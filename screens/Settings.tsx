
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Interface para o evento de instalação PWA
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detectar se o app já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Capturar o evento de instalação PWA
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setInstallPrompt(null);
    } else {
      // Mostrar instruções manuais
      alert('Para instalar:\n\n📱 Android: Menu ⋮ → "Adicionar à tela inicial"\n\n🍎 iPhone: Compartilhar → "Adicionar à Tela de Início"');
    }
  };

  return (
    <div className="pb-32">
      <header className="p-6 pt-10">
        <h1 className="text-3xl font-display font-black mb-1">Ajustes</h1>
        <p className="text-slate-500 text-sm">Personalize sua experiência no app.</p>
      </header>

      <main className="px-6 space-y-8">

        {/* Seção de Instalação PWA */}
        {!isInstalled && (
          <section className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 px-2">Instalação</h3>
            <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-2xl border border-primary/20 p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined text-white text-2xl">install_mobile</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base">Instalar na tela inicial</h4>
                  <p className="text-xs text-slate-500">Acesse mais rápido, como um app nativo</p>
                </div>
              </div>
              <button
                onClick={handleInstall}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">download</span>
                Instalar App
              </button>
            </div>
          </section>
        )}

        {isInstalled && (
          <section className="space-y-3">
            <div className="bg-green-500/10 rounded-2xl border border-green-500/20 p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-green-500 text-2xl">check_circle</span>
              <div>
                <p className="font-bold text-green-600 dark:text-green-400">App instalado!</p>
                <p className="text-xs text-slate-500">Você está usando a versão instalada</p>
              </div>
            </div>
          </section>
        )}

        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 px-2">Outras Opções</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <button onClick={() => navigate('/sobre')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">info</span>
                <span className="font-medium">Sobre o Desenvolvedor</span>
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </button>
            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">dark_mode</span>
                <span className="font-medium">Modo Escuro</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" onChange={() => document.documentElement.classList.toggle('dark')} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;

