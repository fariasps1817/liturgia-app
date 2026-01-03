
import { DayLiturgy } from './types';

export const MOCK_LITURGY: DayLiturgy = {
  date: new Date().toISOString(),
  title: "Quinta-feira da 29ª Semana do Tempo Comum",
  season: "Tempo Comum",
  liturgicalColor: "Verde",
  readings: [
    {
      id: "1",
      type: "FirstReading",
      label: "Primeira Leitura",
      reference: "Efésios 3,14-21",
      content: `Irmãos: Dobro os joelhos diante do Pai, de quem toda a família, nos céus e na terra, recebe o seu nome. Que ele se digne, segundo a riqueza da sua glória, fortalecer-vos pelo seu Espírito...`
    },
    {
      id: "2",
      type: "Psalm",
      label: "Salmo Responsorial",
      reference: "Sl 32(33), 1-2.4-5.11-12.18-19",
      content: "A terra está cheia da bondade do Senhor."
    },
    {
      id: "3",
      type: "Gospel",
      label: "Evangelho",
      reference: "Lucas 12,49-53",
      content: `Naquele tempo, disse Jesus aos seus discípulos: 'Eu vim para lançar fogo sobre a terra, e como gostaria que já estivesse aceso! Tenho um batismo com que ser batizado, e como estou ansioso até que ele se cumpra!'`
    }
  ]
};

export const DEFAULT_IMAGES = {
  ALTAR: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=800',
  CHURCH_WINDOW: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800'
};
