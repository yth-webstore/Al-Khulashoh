export type CategoryType = 
  | 'pagi-malam'
  | 'fajar'
  | 'dhuha'
  | 'dzuhur'
  | 'ashar'
  | 'maghrib'
  | 'isya'
  | 'jumat'
  | 'safar'
  | 'qasidah-ratib'
  | 'asmaul-husna'
  | 'biografi';

export interface DzikirItem {
  id: string;
  arabic: string;
  translation: string;
  transliteration?: string;
  repeatCount?: number;
  note?: string;
  source?: string;
}

export interface Chapter {
  id: string;
  title: string;
  arabicTitle: string;
  category: CategoryType;
  pageStart: number;
  pageEnd: number;
  description: string;
  items: DzikirItem[];
}

export interface EditedContent {
  [chapterId: string]: {
    title?: string;
    arabicTitle?: string;
    description?: string;
    items?: DzikirItem[];
    lastModified: string;
  };
}

export interface AsmaulHusnaItem {
  number: number;
  arabic: string;
  latin: string;
  meaning: string;
}
