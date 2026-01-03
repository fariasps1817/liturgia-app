import { DayLiturgy, Reading } from '../types';
import { MOCK_LITURGY } from '../constants';

const API_BASE_URL = 'https://liturgia.up.railway.app/v2/';

/**
 * Interface para a resposta da API Railway
 */
interface LiturgiaAPIResponse {
    data: string;
    liturgia: string;
    cor: string;
    oracoes: {
        coleta: string;
        oferendas: string;
        comunhao: string;
        extras: Array<{ titulo: string; texto: string }>;
    };
    leituras: {
        primeiraLeitura: Array<{
            referencia: string;
            titulo: string;
            texto: string;
        }>;
        segundaLeitura: Array<{
            referencia: string;
            titulo: string;
            texto: string;
        }>;
        salmo: Array<{
            referencia: string;
            refrao: string;
            texto: string;
        }>;
        evangelho: Array<{
            referencia: string;
            titulo: string;
            texto: string;
        }>;
        extras: Array<{
            tipo?: string;
            referencia: string;
            titulo: string;
            texto: string;
        }>;
    };
    antifonas: {
        entrada: string;
        comunhao: string;
    };
}

/**
 * Busca a liturgia do dia do site da API Railway
 * @param date - Data opcional (padrão: hoje)
 */
export const fetchLiturgyOfDay = async (date?: Date): Promise<DayLiturgy> => {
    try {
        let url = API_BASE_URL;

        if (date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            url = `${API_BASE_URL}?dia=${day}&mes=${month}&ano=${year}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data: LiturgiaAPIResponse = await response.json();
        return convertAPIResponse(data);
    } catch (error) {
        console.error('Erro ao buscar liturgia:', error);
        return MOCK_LITURGY;
    }
};

/**
 * Busca liturgias de um período (até 7 dias)
 * @param days - Número de dias a buscar (máximo 7)
 */
export const fetchLiturgyPeriod = async (days: number = 7): Promise<DayLiturgy[]> => {
    try {
        const limitedDays = Math.min(days, 7);
        const url = `${API_BASE_URL}?periodo=${limitedDays}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const dataArray: LiturgiaAPIResponse[] = await response.json();
        return dataArray.map(convertAPIResponse);
    } catch (error) {
        console.error('Erro ao buscar período de liturgias:', error);
        return [MOCK_LITURGY];
    }
};

/**
 * Converte a resposta da API para o formato DayLiturgy do app
 */
function convertAPIResponse(data: LiturgiaAPIResponse): DayLiturgy {
    const readings: Reading[] = [];
    let readingId = 1;

    // Primeira Leitura
    if (data.leituras.primeiraLeitura.length > 0) {
        const leitura = data.leituras.primeiraLeitura[0];
        const textoCompleto = leitura.titulo
            ? `${leitura.titulo} – ${leitura.texto}`
            : leitura.texto;
        readings.push({
            id: String(readingId++),
            type: 'FirstReading',
            label: 'Primeira Leitura',
            reference: leitura.referencia,
            content: textoCompleto
        });
    }

    // Salmo
    if (data.leituras.salmo.length > 0) {
        const salmo = data.leituras.salmo[0];
        readings.push({
            id: String(readingId++),
            type: 'Psalm',
            label: 'Salmo Responsorial',
            reference: salmo.referencia,
            content: `R: ${salmo.refrao}\n\n${salmo.texto}`
        });
    }

    // Segunda Leitura (se existir)
    if (data.leituras.segundaLeitura.length > 0) {
        const leitura = data.leituras.segundaLeitura[0];
        const textoCompleto = leitura.titulo
            ? `${leitura.titulo} – ${leitura.texto}`
            : leitura.texto;
        readings.push({
            id: String(readingId++),
            type: 'SecondReading',
            label: 'Segunda Leitura',
            reference: leitura.referencia,
            content: textoCompleto
        });
    }

    // Evangelho
    if (data.leituras.evangelho.length > 0) {
        const evangelho = data.leituras.evangelho[0];
        const textoCompleto = evangelho.titulo
            ? `${evangelho.titulo} – ${evangelho.texto}`
            : evangelho.texto;
        readings.push({
            id: String(readingId++),
            type: 'Gospel',
            label: 'Evangelho',
            reference: evangelho.referencia,
            content: textoCompleto
        });
    }

    // Determinar tempo litúrgico baseado no título
    const season = determineSeason(data.liturgia, data.cor);

    // Converter data DD/MM/YYYY para ISO
    const [day, month, year] = data.data.split('/');
    const dateISO = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();

    return {
        date: dateISO,
        title: data.liturgia,
        celebration: data.liturgia,
        liturgicalRank: extractRank(data.liturgia),
        season,
        liturgicalColor: data.cor,
        readings
    };
}

/**
 * Determina o tempo litúrgico baseado no título e cor
 */
function determineSeason(liturgia: string, cor: string): string {
    const liturgiaLower = liturgia.toLowerCase();

    if (liturgiaLower.includes('natal') || liturgiaLower.includes('epifania')) {
        return 'Tempo do Natal';
    }
    if (liturgiaLower.includes('advento')) {
        return 'Advento';
    }
    if (liturgiaLower.includes('quaresma')) {
        return 'Quaresma';
    }
    if (liturgiaLower.includes('páscoa') || liturgiaLower.includes('pascal')) {
        return 'Tempo Pascal';
    }
    if (liturgiaLower.includes('pentecostes')) {
        return 'Tempo Pascal';
    }

    // Baseado na cor se não encontrou no título
    if (cor === 'Roxo') {
        return 'Advento/Quaresma';
    }
    if (cor === 'Branco') {
        return 'Festas';
    }
    if (cor === 'Vermelho') {
        return 'Mártires/Espírito Santo';
    }

    return 'Tempo Comum';
}

/**
 * Extrai o rank litúrgico do título
 */
function extractRank(liturgia: string): string {
    const liturgiaLower = liturgia.toLowerCase();

    if (liturgiaLower.includes('solenidade')) {
        return 'Solenidade';
    }
    if (liturgiaLower.includes('festa')) {
        return 'Festa';
    }
    if (liturgiaLower.includes('memória obrigatória')) {
        return 'Memória Obrigatória';
    }
    if (liturgiaLower.includes('memória')) {
        return 'Memória';
    }

    return 'Féria';
}
