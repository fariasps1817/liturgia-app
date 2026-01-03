
import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DayLiturgy } from '../types';
import { MOCK_LITURGY } from '../constants';

// Formata números de versículos em sobrescrito (ex: "12Jesus disse" -> "<sup>12</sup>Jesus disse")
function formatVerseNumbers(text: string): string {
  // Regex para encontrar números no início do texto ou após pontuação/espaço
  // Captura números como 1, 12, 3a, 4b, etc.
  return text.replace(/(\s|^)(\d+[a-z]?)(?=[A-ZÁÉÍÓÚÀÂÊÔÃÕÇ])/g, '$1<sup class="text-primary/60 font-bold text-xs mr-0.5">$2</sup>');
}

const ReadingDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liturgy, setLiturgy] = useState<DayLiturgy>(MOCK_LITURGY);

  useEffect(() => {
    // Buscar dados salvos da liturgia
    const saved = localStorage.getItem('liturgy_today');
    if (saved) {
      try {
        setLiturgy(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao parsear liturgia:', e);
      }
    }
  }, []);

  const reading = useMemo(() =>
    liturgy.readings.find(r => r.id === id),
    [id, liturgy]);

  if (!reading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">menu_book</span>
        <p className="text-slate-500">Leitura não encontrada</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
        >
          Voltar
        </button>
      </div>
    );
  }

  // Conclusão apropriada para cada tipo de leitura
  const getConclusion = () => {
    if (reading.type === 'Gospel') {
      return {
        intro: '— Palavra da Salvação.',
        response: 'Glória a vós, Senhor.'
      };
    }
    if (reading.type === 'Psalm') {
      return null; // Salmo não tem conclusão padrão
    }
    return {
      intro: '— Palavra do Senhor.',
      response: 'Graças a Deus.'
    };
  };

  const conclusion = getConclusion();

  // Formatar data da liturgia
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <header className="flex items-center justify-between px-4 pt-3 pb-2 bg-white/50 dark:bg-background-dark/50 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-slate-600 dark:text-slate-400"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <div className="flex-1 text-center truncate px-4">
          <p className="text-[9px] text-slate-400 mb-0.5">{formatDate(liturgy.date)}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{reading.label}</p>
          <h1 className="text-sm font-bold truncate">{reading.reference}</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-md mx-auto">
          {reading.type === 'Psalm' ? (
            // Formatação especial para Salmo - estrofes em cards
            // Regex detecta tanto "– " (traço simples) quanto "— " (travessão)
            <div className="space-y-4">
              {reading.content.split(/\n[–—]\s*/).map((strophe, i) => {
                // Primeira parte é o refrão (começa com R:)
                if (i === 0) {
                  return (
                    <div key={i} className="bg-primary/10 dark:bg-primary/20 p-5 rounded-2xl border border-primary/20 text-center mb-6">
                      <p className="text-lg font-display font-bold italic text-primary">
                        {strophe.trim()}
                      </p>
                    </div>
                  );
                }
                // Estrofes do salmo em cards
                return (
                  <div key={i} className="group relative bg-white dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="text-base leading-relaxed text-slate-800 dark:text-slate-200">
                      — {strophe.trim()}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            // Formatação padrão para outras leituras
            <article className="prose-religious text-lg leading-[1.8] font-display text-slate-800 dark:text-slate-100 space-y-6">
              {reading.content.split('\n\n').map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{
                  __html: formatVerseNumbers(para)
                }} />
              ))}
            </article>
          )}

          {conclusion && (
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <p className="text-lg font-display italic mb-2">{conclusion.intro}</p>
              <p className="text-xl font-display font-black text-primary">{conclusion.response}</p>
            </div>
          )}

          {/* Botões de ação */}
          <div className="mt-10 pb-10 flex gap-3">
            <button
              onClick={() => {
                const dateFormatted = formatDate(liturgy.date);
                const text = `📅 ${dateFormatted}\n\n${reading.label}\n${reading.reference}\n\n${reading.content}${conclusion ? `\n\n${conclusion.intro}\n${conclusion.response}` : ''}`;
                navigator.clipboard.writeText(text);
                alert('Leitura copiada!');
              }}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-bold transition-all hover:bg-slate-300 dark:hover:bg-slate-600 active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">content_copy</span>
              Copiar
            </button>

            <button
              onClick={() => {
                const dateFormatted = formatDate(liturgy.date);
                const text = `📅 ${dateFormatted}\n\n${reading.label}\n${reading.reference}\n\n${reading.content}${conclusion ? `\n\n${conclusion.intro}\n${conclusion.response}` : ''}`;
                if (navigator.share) {
                  navigator.share({
                    title: `${reading.label} - ${reading.reference}`,
                    text: text
                  });
                } else {
                  navigator.clipboard.writeText(text);
                  alert('Leitura copiada para compartilhar!');
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold transition-all hover:bg-primary/90 active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">share</span>
              Compartilhar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReadingDetail;
