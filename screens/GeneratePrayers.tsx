
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { generatePrayers } from '../services/geminiService';
import { MOCK_LITURGY } from '../constants';
import { DayLiturgy, GeneratedPrayersResponse } from '../types';
import { ImageContext } from '../App';

const GeneratePrayers: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { images } = useContext(ImageContext);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GeneratedPrayersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [liturgy, setLiturgy] = useState<DayLiturgy>(MOCK_LITURGY);
  const [fromCache, setFromCache] = useState(false);
  const [cacheChecked, setCacheChecked] = useState(false);

  const customResponse = searchParams.get('resp') || undefined;
  const localContext = searchParams.get('ctx') || undefined;

  // Chave do cache baseada na data de hoje
  const cacheKey = `preces_${new Date().toISOString().split('T')[0]}`;

  // Verificar se há personalização (parâmetros na URL)
  const hasPersonalization = Boolean(customResponse || localContext);

  // Carregar liturgia salva e cache de preces
  useEffect(() => {
    const saved = localStorage.getItem('liturgy_today');
    if (saved) {
      try {
        setLiturgy(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar liturgia:', e);
      }
    }

    // Se tem personalização, limpar cache e marcar para regenerar
    if (hasPersonalization) {
      sessionStorage.removeItem(cacheKey);
      setCacheChecked(true);
      return;
    }

    // Verificar cache de preces (apenas se não tiver personalização)
    const cachedPrayers = sessionStorage.getItem(cacheKey);
    if (cachedPrayers) {
      try {
        const parsed = JSON.parse(cachedPrayers);
        setData(parsed);
        setFromCache(true);
      } catch (e) {
        console.error('Erro ao carregar preces do cache:', e);
      }
    }
    setCacheChecked(true);
  }, [cacheKey, hasPersonalization]);

  const handleGenerate = async (forceRegenerate = false) => {
    // Se não forçar regeneração e tiver cache, não gerar
    if (!forceRegenerate && data) return;

    setLoading(true);
    setError(null);
    setFromCache(false);
    try {
      const gosp = liturgy.readings.find(r => r.type === 'Gospel') || liturgy.readings[0];
      const result = await generatePrayers(
        liturgy.title,
        gosp.reference,
        gosp.content,
        customResponse,
        localContext
      );
      setData(result);
      // Salvar no cache
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
    } catch (err) {
      setError('Erro ao conectar com a IA. Verifique a API Key no .env.local');
    } finally {
      setLoading(false);
    }
  };

  // Gerar automaticamente APENAS se não tiver cache e a verificação já foi feita
  const hasLiturgy = liturgy.readings.length > 0;

  React.useEffect(() => {
    // Só gerar se: cache verificado, sem dados, liturgia carregada, não está carregando
    if (cacheChecked && !data && hasLiturgy && !loading && !error) {
      handleGenerate();
    }
  }, [cacheChecked, hasLiturgy, data]);

  return (
    <div className="pb-32">
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 h-16 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button onClick={() => navigate('/')} className="p-2">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="font-bold text-base tracking-tight">Preces da Assembleia</h1>
        <button onClick={() => navigate('/preces/personalizar')} className="p-2 text-primary">
          <span className="material-symbols-outlined">tune</span>
        </button>
      </header>

      <main className="px-5 pt-4 space-y-6">

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-500 font-medium">Gerando preces com IA...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl">
            <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error}</p>
            <button onClick={handleGenerate} className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold text-sm">Tentar de novo</button>
          </div>
        ) : !data ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-bold text-lg">Gerar Preces com IA</h3>
              <p className="text-sm text-slate-500 max-w-xs">
                A IA irá criar 4 preces contextualizadas com a liturgia do dia
              </p>
            </div>
            <button
              onClick={handleGenerate}
              disabled={!hasLiturgy}
              className="px-8 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="material-symbols-outlined">auto_awesome</span>
              Gerar Preces
            </button>
          </div>
        ) : data && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6 bg-slate-100 dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">Resposta</span>
              <p className="text-lg font-display font-bold italic text-primary">"{data.response}"</p>
            </div>

            <div className="space-y-4">
              {data.prayers.map((prayer, i) => (
                <div key={i} className="group relative bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex gap-4">
                    <span className="text-primary/30 dark:text-primary/60 font-black text-2xl font-display">{i + 1}</span>
                    <p className="text-base leading-relaxed text-slate-800 dark:text-slate-200">{prayer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 pb-10 space-y-4">
              {fromCache && (
                <p className="text-center text-xs text-slate-400">
                  <span className="material-symbols-outlined text-sm align-middle mr-1">cached</span>
                  Preces recuperadas do cache
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => handleGenerate(true)}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-bold transition-all hover:bg-slate-300 dark:hover:bg-slate-600 active:scale-95 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">refresh</span>
                  {loading ? 'Gerando...' : 'Regenerar'}
                </button>

                <button
                  onClick={() => {
                    const text = `Preces - ${liturgy.title}\n\nResposta: ${data.response}\n\n${data.prayers.map((p, i) => `${i + 1}. ${p}`).join('\n\n')}`;
                    navigator.clipboard.writeText(text);
                    alert('Preces copiadas para a área de transferência!');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold shadow-lg transition-transform active:scale-95"
                >
                  <span className="material-symbols-outlined">content_copy</span>
                  Copiar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GeneratePrayers;
