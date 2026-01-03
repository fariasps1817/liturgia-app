
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalizePrayers: React.FC = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState('');
  const [context, setContext] = useState('');

  const handleApply = () => {
    const params = new URLSearchParams();
    if (response) params.append('resp', response);
    if (context) params.append('ctx', context);
    navigate(`/preces?${params.toString()}`);
  };

  return (
    <div className="pb-32">
      <header className="p-6 pt-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <div>
          <h1 className="text-3xl font-display font-black">Personalizar</h1>
          <p className="text-slate-500 text-sm">Ajuste os parâmetros da IA.</p>
        </div>
      </header>

      <main className="px-6 space-y-8">
        <div className="space-y-6 bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Resposta da Assembleia</label>
            <input 
              type="text" 
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 focus:ring-primary focus:border-primary placeholder:text-slate-400"
              placeholder="Ex: Senhor, ouvi-nos e atendei-nos"
            />
            <p className="mt-2 text-[11px] text-slate-400 italic">Deixe em branco para que a IA sugira uma resposta adequada.</p>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Intenções ou Contexto Local</label>
            <textarea 
              rows={5}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 focus:ring-primary focus:border-primary placeholder:text-slate-400"
              placeholder="Ex: Missa de 7º dia do Sr. José; Pela saúde dos enfermos da nossa paróquia..."
            />
            <p className="mt-2 text-[11px] text-slate-400 italic">Essas informações serão integradas à última prece gerada.</p>
          </div>

          <button 
            onClick={handleApply}
            className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 transition-all active:scale-95"
          >
            Aplicar e Recriar Preces
          </button>
        </div>
      </main>
    </div>
  );
};

export default PersonalizePrayers;
