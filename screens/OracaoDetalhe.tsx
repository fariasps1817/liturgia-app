import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ORACOES_EUCARISTICAS, OracaoSection } from '../data/oracoes-eucaristicas';

const OracaoDetalhe: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const oracao = useMemo(() =>
        ORACOES_EUCARISTICAS.find(o => o.id === id),
        [id]
    );

    if (!oracao) {
        return (
            <div className="flex flex-col h-screen items-center justify-center bg-background-light dark:bg-background-dark">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">error</span>
                <p className="text-slate-500">Oração não encontrada</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                >
                    Voltar
                </button>
            </div>
        );
    }

    const renderSection = (section: OracaoSection, index: number) => {
        switch (section.tipo) {
            case 'titulo':
                return (
                    <div key={index} className="pt-8 pb-4 first:pt-0">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <span className="w-8 h-px bg-slate-300 dark:bg-slate-700"></span>
                            {section.texto}
                            <span className="flex-1 h-px bg-slate-300 dark:bg-slate-700"></span>
                        </h3>
                    </div>
                );

            case 'rubrica':
                return (
                    <div key={index} className="my-3 px-4 py-3 bg-slate-100 dark:bg-slate-800/50 rounded-xl border-l-4 border-slate-400">
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic">{section.texto}</p>
                    </div>
                );

            case 'celebrante':
                return (
                    <div key={index} className={`my-3 ${section.destaque ? 'my-6' : ''}`}>
                        <div className={`relative pl-4 ${section.destaque ? 'pl-5' : ''}`}>
                            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${section.destaque ? 'bg-red-500' : 'bg-primary'}`}></div>
                            {!section.destaque && (
                                <span className="text-[9px] font-black uppercase tracking-widest text-primary/60 block mb-1">Celebrante</span>
                            )}
                            <p className={`leading-relaxed ${section.destaque
                                ? 'text-lg font-display font-black text-red-600 dark:text-red-400 tracking-wide'
                                : 'text-base text-slate-800 dark:text-slate-200'
                                }`}>
                                {section.texto}
                            </p>
                        </div>
                    </div>
                );

            case 'assembleia':
                return (
                    <div key={index} className="my-4">
                        <div className="relative bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-2xl p-4 pl-5">
                            <div className="absolute left-0 top-4 bottom-4 w-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-green-600/80 dark:text-green-400/80 block mb-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">group</span>
                                Assembleia
                            </span>
                            <p className="text-base font-bold text-green-700 dark:text-green-300 leading-relaxed">
                                {section.texto}
                            </p>
                        </div>
                    </div>
                );

            case 'todos':
                return (
                    <div key={index} className="my-4">
                        <div className="relative bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4 pl-5">
                            <div className="absolute left-0 top-4 bottom-4 w-1.5 bg-amber-500 rounded-full"></div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-amber-600/80 dark:text-amber-400/80 block mb-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">music_note</span>
                                Todos cantam/rezam
                            </span>
                            <p className="text-base font-bold text-amber-700 dark:text-amber-300 leading-relaxed">
                                {section.texto}
                            </p>
                        </div>
                    </div>
                );

            case 'aclamacao':
                return (
                    <div key={index} className="my-4">
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-2xl p-4 overflow-hidden">
                            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-purple-200 dark:border-purple-700/50">
                                <span className="material-symbols-outlined text-purple-500">swap_vert</span>
                                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Escolha a aclamação conforme o celebrante</span>
                            </div>
                            <div className="space-y-4">
                                {section.opcoes?.map((opcao, i) => (
                                    <div key={i} className="relative">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">Se o celebrante disser:</span>
                                        </div>
                                        <div className="pl-4 border-l-2 border-primary/30 mb-2">
                                            <p className="text-sm font-bold text-primary">{opcao.celebrante}</p>
                                        </div>
                                        <div className="relative bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 rounded-xl p-3 pl-4">
                                            <div className="absolute left-0 top-3 bottom-3 w-1 bg-green-500 rounded-full"></div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-green-600/80 dark:text-green-400/80 block mb-1 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">group</span>
                                                Assembleia responde
                                            </span>
                                            <p className="text-sm font-bold text-green-700 dark:text-green-300 leading-relaxed">
                                                {opcao.assembleia}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
            {/* Header fixo */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-4 h-16 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <button onClick={() => navigate(-1)} className="p-2">
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <div className="flex-1 text-center px-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Oração Eucarística</p>
                    <h1 className="text-sm font-bold truncate">{oracao.numero}</h1>
                </div>
                <div className="w-10"></div>
            </header>

            {/* Conteúdo scrollável */}
            <main className="flex-1 overflow-y-auto px-5 pb-32">
                <div className="max-w-lg mx-auto">
                    {/* Título da Oração */}
                    <div className="py-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg shadow-primary/30 mb-4">
                            <span className="text-white font-display font-black text-2xl">{oracao.numero}</span>
                        </div>
                        <h2 className="text-xl font-display font-black mb-1">{oracao.nome}</h2>
                        <p className="text-sm text-slate-500">{oracao.descricao}</p>
                    </div>

                    {/* Seções da Oração */}
                    <div className="space-y-1">
                        {oracao.secoes.map((section, index) => renderSection(section, index))}
                    </div>

                    {/* Botões de ação */}
                    <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex gap-3">
                        <button
                            onClick={() => {
                                const texto = oracao.secoes
                                    .filter(s => s.tipo !== 'titulo')
                                    .map(s => {
                                        if (s.tipo === 'celebrante') return `C: ${s.texto}`;
                                        if (s.tipo === 'assembleia') return `A: ${s.texto}`;
                                        if (s.tipo === 'todos') return `TODOS: ${s.texto}`;
                                        return s.texto;
                                    })
                                    .join('\n\n');
                                navigator.clipboard.writeText(`${oracao.nome}\n\n${texto}`);
                                alert('Oração copiada!');
                            }}
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-bold transition-all hover:bg-slate-300 dark:hover:bg-slate-600 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-xl">content_copy</span>
                            Copiar
                        </button>
                        <button
                            onClick={() => navigate('/oracoes-eucaristicas')}
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold transition-all hover:bg-primary/90 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-xl">list</span>
                            Outras Orações
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OracaoDetalhe;
