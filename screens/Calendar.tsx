import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLiturgyOfDay } from '../services/liturgyService';
import { DayLiturgy } from '../types';

interface CalendarDay {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  liturgy?: {
    title: string;
    color: string;
    season: string;
    isReal?: boolean;
  };
  loading?: boolean;
}

const COLOR_MAP: Record<string, string> = {
  'Verde': 'bg-liturgy-green',
  'Roxo': 'bg-liturgy-purple',
  'Vermelho': 'bg-liturgy-red',
  'Branco': 'bg-white border border-slate-200',
  'Rosa': 'bg-pink-400',
};


const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [loadingDay, setLoadingDay] = useState<number | null>(null);
  const [loadedDays, setLoadedDays] = useState<Record<string, { title: string; color: string; season: string }>>({});

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  // Gerar dias do mês
  const generateDays = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();

    const today = new Date();
    const calendarDays: CalendarDay[] = [];

    // Dias do mês anterior (para completar a primeira semana)
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      calendarDays.push({
        day,
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Dias do mês atual
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateKey = date.toISOString().split('T')[0];

      calendarDays.push({
        day,
        date,
        isCurrentMonth: true,
        isToday:
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear(),
        liturgy: loadedDays[dateKey],
      });
    }

    // Dias do próximo mês (para completar a última semana)
    const remainingDays = 42 - calendarDays.length; // 6 semanas * 7 dias
    for (let day = 1; day <= remainingDays; day++) {
      calendarDays.push({
        day,
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    setDays(calendarDays);
  }, [currentDate, loadedDays]);

  useEffect(() => {
    generateDays();
  }, [generateDays]);

  // Navegar entre meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Carregar liturgia de um dia
  const loadDayLiturgy = async (calendarDay: CalendarDay) => {
    if (!calendarDay.isCurrentMonth) return;

    const dateKey = calendarDay.date.toISOString().split('T')[0];

    // Se já carregou, apenas seleciona
    if (loadedDays[dateKey]) {
      setSelectedDay({ ...calendarDay, liturgy: loadedDays[dateKey] });
      return;
    }

    setLoadingDay(calendarDay.day);
    setSelectedDay(calendarDay);

    try {
      // Buscar dados REAIS da API para qualquer data!
      const liturgy = await fetchLiturgyOfDay(calendarDay.date);
      const liturgyData = {
        title: liturgy.title,
        color: liturgy.liturgicalColor,
        season: liturgy.season,
      };

      // Salvar no localStorage para uso em outras telas
      localStorage.setItem('liturgy_today', JSON.stringify(liturgy));
      localStorage.setItem('liturgy_selected_date', dateKey);

      setLoadedDays(prev => ({ ...prev, [dateKey]: liturgyData }));
      setSelectedDay({ ...calendarDay, liturgy: liturgyData });
    } catch (error) {
      console.error('Erro ao carregar liturgia:', error);
    } finally {
      setLoadingDay(null);
    }
  };

  // Ver leituras do dia selecionado
  const goToReadings = () => {
    if (selectedDay) {
      navigate('/');
    }
  };

  return (
    <div className="pb-32">
      <header className="p-6 pt-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-xl bg-slate-100 dark:bg-surface-dark"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <h1 className="text-2xl font-display font-black capitalize">{monthName}</h1>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-xl bg-slate-100 dark:bg-surface-dark"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <p className="text-slate-500 text-sm text-center">Toque em um dia para ver a liturgia</p>
      </header>

      <main className="px-4">
        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
            <div key={d} className="h-8 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase">
              {d}
            </div>
          ))}
        </div>

        {/* Grid do calendário */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {days.map((calendarDay, index) => {
            const dateKey = calendarDay.date.toISOString().split('T')[0];
            const savedLiturgy = loadedDays[dateKey];
            const colorClass = savedLiturgy
              ? COLOR_MAP[savedLiturgy.color] || 'bg-slate-100 dark:bg-surface-dark'
              : 'bg-slate-100 dark:bg-surface-dark';
            const isLoading = loadingDay === calendarDay.day && calendarDay.isCurrentMonth;
            const isSelected = selectedDay?.date.toISOString().split('T')[0] === dateKey;

            return (
              <button
                key={index}
                onClick={() => loadDayLiturgy(calendarDay)}
                disabled={!calendarDay.isCurrentMonth || isLoading}
                className={`
                  h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all
                  ${calendarDay.isCurrentMonth ? 'cursor-pointer hover:scale-105' : 'opacity-30 cursor-default'}
                  ${calendarDay.isToday && !isSelected ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-background-dark' : ''}
                  ${isSelected ? 'ring-[3px] ring-blue-500 ring-offset-2 dark:ring-offset-background-dark scale-110 z-10' : ''}
                  ${colorClass}
                `}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className={`text-xs font-bold ${savedLiturgy?.color === 'Verde' || savedLiturgy?.color === 'Roxo' || savedLiturgy?.color === 'Vermelho'
                      ? 'text-white'
                      : ''
                      }`}>
                      {calendarDay.day}
                    </span>
                    {savedLiturgy && (
                      <div className={`w-1.5 h-1.5 rounded-full ${savedLiturgy.color === 'Branco' ? 'bg-yellow-400' : 'bg-white/50'
                        }`}></div>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Card do dia selecionado */}
        {selectedDay && selectedDay.isCurrentMonth && (
          <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedDay.liturgy
                  ? COLOR_MAP[selectedDay.liturgy.color] || 'bg-slate-200'
                  : 'bg-slate-200'
                  }`}>
                  <span className={`text-lg font-black ${selectedDay.liturgy?.color === 'Verde' || selectedDay.liturgy?.color === 'Roxo' || selectedDay.liturgy?.color === 'Vermelho'
                    ? 'text-white'
                    : 'text-slate-600'
                    }`}>
                    {selectedDay.day}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    {selectedDay.date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  {loadingDay === selectedDay.day ? (
                    <p className="text-sm text-slate-500">Carregando liturgia...</p>
                  ) : selectedDay.liturgy ? (
                    <>
                      <h3 className="font-bold text-lg leading-tight mb-1">{selectedDay.liturgy.title}</h3>
                      <p className="text-sm text-slate-500">
                        <span className="inline-block w-2 h-2 rounded-full mr-2" style={{
                          backgroundColor: selectedDay.liturgy.color === 'Verde' ? '#22c55e' :
                            selectedDay.liturgy.color === 'Roxo' ? '#8b5cf6' :
                              selectedDay.liturgy.color === 'Vermelho' ? '#ef4444' :
                                selectedDay.liturgy.color === 'Rosa' ? '#ec4899' : '#f1f5f9'
                        }}></span>
                        {selectedDay.liturgy.color} • {selectedDay.liturgy.season}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-slate-500">Toque para carregar</p>
                  )}
                </div>
              </div>

              {selectedDay.liturgy && (
                <button
                  onClick={goToReadings}
                  className="w-full mt-4 py-3 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-primary/90 active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">menu_book</span>
                  Ver Leituras do Dia
                </button>
              )}
            </div>
          </div>
        )}

        {/* Legenda de cores */}
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Legenda de Cores</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { color: 'bg-liturgy-green', label: 'Verde', desc: 'Tempo Comum' },
              { color: 'bg-liturgy-purple', label: 'Roxo', desc: 'Advento/Quaresma' },
              { color: 'bg-liturgy-red', label: 'Vermelho', desc: 'Mártires/Espírito' },
              { color: 'bg-white border', label: 'Branco', desc: 'Festas/Natal' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 p-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl">
                <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                <div>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">{item.label}</span>
                  <span className="text-[9px] text-slate-400">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Calendar;
