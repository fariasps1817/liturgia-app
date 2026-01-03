import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ORACOES_EUCARISTICAS } from '../data/oracoes-eucaristicas';

const OracoesEucaristicas: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="pb-32">
            <header className="p-6 pt-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-2xl">auto_stories</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-black">Orações Eucarísticas</h1>
                        <p className="text-slate-500 text-xs">Acompanhe a Liturgia Eucarística</p>
                    </div>
                </div>
            </header>

            <main className="px-6">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Selecione a oração eucarística que o celebrante irá proclamar para acompanhar com as respostas da assembleia.
                </p>

                <div className="space-y-3">
                    {ORACOES_EUCARISTICAS.map((oracao) => (
                        <button
                            key={oracao.id}
                            onClick={() => navigate(`/oracoes-eucaristicas/${oracao.id}`)}
                            className="w-full group bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-left shadow-sm hover:shadow-md transition-all hover:border-primary/30 active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                                    <span className="text-white font-display font-black text-xl">{oracao.numero}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-base mb-0.5 truncate">{oracao.nome}</h3>
                                    <p className="text-xs text-slate-500 line-clamp-2">{oracao.descricao}</p>
                                    {oracao.prefacioFixo && (
                                        <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
                                            <span className="material-symbols-outlined text-xs">info</span>
                                            Prefácio próprio
                                        </span>
                                    )}
                                </div>
                                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-slate-100 dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">help</span>
                        Como usar
                    </h4>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span><strong className="text-primary">Azul</strong> = Celebrante (padre/bispo)</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span><strong className="text-green-600">Verde</strong> = Assembleia (você responde)</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span><strong className="text-amber-600">Amarelo</strong> = Todos cantam/rezam</span>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default OracoesEucaristicas;
