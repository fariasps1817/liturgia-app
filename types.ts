
export interface Reading {
  id: string;
  type: 'FirstReading' | 'Psalm' | 'SecondReading' | 'Gospel';
  label: string;
  reference: string;
  content: string;
}

export interface DayLiturgy {
  date: string;
  title: string;
  celebration?: string;
  liturgicalRank?: string; // Expandido para aceitar valores da API Railway
  season: string; // Expandido para aceitar mais valores
  liturgicalColor: string;
  readings: Reading[];
}

export interface GeneratedPrayersResponse {
  response: string;
  prayers: string[];
}

export interface AppSettings {
  altarImageUrl: string;
  churchWindowImageUrl: string;
  fontSize: number;
}
