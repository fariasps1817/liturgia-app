
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLiturgyOfDay } from '../services/liturgyService';
import { DayLiturgy } from '../types';
import { MOCK_LITURGY } from '../constants';

// Cor litúrgica para classe CSS
const colorToClass: Record<string, string> = {
  'Verde': 'bg-liturgy-green/20 text-liturgy-green border-liturgy-green/30',
  'Roxo': 'bg-liturgy-purple/20 text-liturgy-purple border-liturgy-purple/30',
  'Vermelho': 'bg-liturgy-red/20 text-liturgy-red border-liturgy-red/30',
  'Branco': 'bg-white/80 text-slate-700 border-slate-300',
  'Rosa': 'bg-pink-100/20 text-pink-600 border-pink-300/30',
};

const ReadingsList: React.FC = () => {
  const navigate = useNavigate();
  const [liturgy, setLiturgy] = useState<DayLiturgy>(MOCK_LITURGY);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayDate, setDisplayDate] = useState<Date>(new Date());

  // Obtém a data atual no timezone América/Fortaleza
  const getTodayFortaleza = (): string => {
    const now = new Date();
    // Formata para YYYY-MM-DD no timezone de Fortaleza
    return now.toLocaleDateString('sv-SE', { timeZone: 'America/Fortaleza' });
  };

  const dateStr = displayDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  const loadLiturgy = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const todayFortaleza = getTodayFortaleza();

      // Verificar se há liturgia salva do calendário (seleção manual)
      const savedLiturgy = localStorage.getItem('liturgy_today');
      const savedDate = localStorage.getItem('liturgy_selected_date');
      const cacheDate = localStorage.getItem('liturgy_cache_date');

      // Se existe seleção manual do calendário, usar ela
      if (savedLiturgy && savedDate) {
        const liturgyData: DayLiturgy = JSON.parse(savedLiturgy);
        setLiturgy(liturgyData);
        const [year, month, day] = savedDate.split('-').map(Number);
        setDisplayDate(new Date(year, month - 1, day));
      }
      // Se existe cache mas é de outro dia, buscar nova liturgia
      else if (savedLiturgy && cacheDate && cacheDate !== todayFortaleza) {
        console.log(`Cache expirado: ${cacheDate} !== ${todayFortaleza}. Buscando nova liturgia...`);
        localStorage.removeItem('liturgy_today');
        localStorage.removeItem('liturgy_cache_date');

        const data = await fetchLiturgyOfDay();
        setLiturgy(data);
        setDisplayDate(new Date());
        localStorage.setItem('liturgy_today', JSON.stringify(data));
        localStorage.setItem('liturgy_cache_date', todayFortaleza);
      }
      // Se existe cache do mesmo dia, usar
      else if (savedLiturgy && cacheDate === todayFortaleza) {
        const liturgyData: DayLiturgy = JSON.parse(savedLiturgy);
        setLiturgy(liturgyData);
        setDisplayDate(new Date());
      }
      // Não existe cache, buscar
      else {
        const data = await fetchLiturgyOfDay();
        setLiturgy(data);
        setDisplayDate(new Date());
        localStorage.setItem('liturgy_today', JSON.stringify(data));
        localStorage.setItem('liturgy_cache_date', todayFortaleza);
      }
    } catch (err) {
      setError('Não foi possível carregar a liturgia. Usando dados offline.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLiturgy();
  }, [loadLiturgy]);

  const colorClass = colorToClass[liturgy.liturgicalColor] || colorToClass['Verde'];

  // Verificar se é o dia de hoje
  const today = new Date();
  const isToday = displayDate.toDateString() === today.toDateString();

  // Função para voltar ao dia atual
  const goToToday = async () => {
    localStorage.removeItem('liturgy_selected_date');
    localStorage.removeItem('liturgy_today');
    localStorage.removeItem('liturgy_cache_date');
    setDisplayDate(new Date());
    setIsLoading(true);
    try {
      const todayFortaleza = getTodayFortaleza();
      const data = await fetchLiturgyOfDay();
      setLiturgy(data);
      localStorage.setItem('liturgy_today', JSON.stringify(data));
      localStorage.setItem('liturgy_cache_date', todayFortaleza);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-24">
      <header className="p-6 pt-10">
        {!isToday && (
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={goToToday}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold hover:bg-primary/20 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">today</span>
              Voltar para hoje
            </button>
            <span className="text-xs text-slate-400">Visualizando outro dia</span>
          </div>
        )}
        <div className="flex items-center gap-3 mb-6">
          <div className={`px-3 py-1 border rounded-full text-[10px] font-bold uppercase tracking-widest ${colorClass}`}>
            {liturgy.season}
          </div>
          {liturgy.liturgicalRank && liturgy.liturgicalRank !== 'Féria' && (
            <div className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-[9px] font-bold uppercase">
              {liturgy.liturgicalRank}
            </div>
          )}
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
        </div>
        <h2 className="text-3xl font-display font-black leading-tight mb-1 capitalize">
          {dateStr.split(',')[0]}, <br />
          <span className="text-primary">{dateStr.split(',')[1]}</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          {isLoading ? 'Carregando...' : liturgy.title}
        </p>
      </header>

      {error && (
        <div className="mx-6 mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-700 dark:text-amber-300 text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">warning</span>
          <span className="flex-1">{error}</span>
          <button onClick={loadLiturgy} className="text-amber-600 font-bold underline">Tentar novamente</button>
        </div>
      )}

      {isLoading ? (
        <div className="px-6 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-full flex items-center gap-4 p-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl animate-pulse">
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 space-y-4">
          {liturgy.readings.map((reading) => (
            <button
              key={reading.id}
              onClick={() => navigate(`/reading/${reading.id}`)}
              className="w-full group relative flex items-center gap-4 p-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl transition-all hover:border-primary/40 active:scale-[0.98] shadow-sm"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary/5 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">
                  {reading.type === 'Gospel' ? 'auto_stories' : reading.type === 'Psalm' ? 'music_note' : 'menu_book'}
                </span>
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                  {reading.label}
                </p>
                <h3 className="text-base font-bold truncate">
                  {reading.reference}
                </h3>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">
                chevron_right
              </span>
            </button>
          ))}

          <button
            onClick={() => navigate('/preces')}
            className="w-full group relative flex items-center gap-4 p-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl transition-all hover:border-primary/40 active:scale-[0.98] shadow-sm"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary/5 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                Preces da Assembleia
              </p>
              <h3 className="text-base font-bold truncate">
                Gere as preces personalizadas
              </h3>
            </div>
            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">
              chevron_right
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadingsList;
