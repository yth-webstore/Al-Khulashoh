import { Chapter } from '../types';
import { CHAPTERS_PART1 } from './chaptersPart1';
import { CHAPTERS_PART2 } from './chaptersPart2';
import { CHAPTERS_PART3 } from './chaptersPart3';
import { CHAPTERS_PART4 } from './chaptersPart4';
import { CHAPTERS_PART5 } from './chaptersPart5';

export const ALL_CHAPTERS: Chapter[] = [
  ...CHAPTERS_PART1,
  ...CHAPTERS_PART2,
  ...CHAPTERS_PART3,
  ...CHAPTERS_PART4,
  ...CHAPTERS_PART5,
];

export const CATEGORIES = [
  { id: 'all', label: 'Semua Bab' },
  { id: 'pagi-malam', label: 'Pagi & Malam' },
  { id: 'fajar', label: 'Fajar & Subuh' },
  { id: 'dhuha', label: 'Dhuha' },
  { id: 'dzuhur', label: 'Dzuhur' },
  { id: 'ashar', label: 'Ashar' },
  { id: 'maghrib', label: 'Maghrib' },
  { id: 'isya', label: 'Isya & Tidur' },
  { id: 'jumat', label: 'Hari Jum\'at' },
  { id: 'safar', label: 'Doa Safar' },
  { id: 'qasidah-ratib', label: 'Qasidah & Ratib' },
  { id: 'asmaul-husna', label: 'Asmaul Husna' },
  { id: 'biografi', label: 'Biografi Penyusun' },
] as const;

export function generateChapterMarkdown(chapter: Chapter): string {
  let md = `# ${chapter.title}\n`;
  md += `## ${chapter.arabicTitle}\n\n`;
  md += `*Halaman ${chapter.pageStart} - ${chapter.pageEnd} Kitab Al-Khulashah*\n\n`;
  md += `> ${chapter.description}\n\n`;
  md += `---\n\n`;

  chapter.items.forEach((item, index) => {
    md += `### Bagian ${index + 1}\n\n`;
    if (item.source) {
      md += `*Sumber: ${item.source}*\n\n`;
    }
    if (item.repeatCount && item.repeatCount > 1) {
      md += `**Dibaca: ${item.repeatCount}x**\n\n`;
    }
    md += `\`\`\`arabic\n${item.arabic}\n\`\`\`\n\n`;
    md += `**Terjemahan:**\n${item.translation}\n\n`;
    if (item.note) {
      md += `*Catatan: ${item.note}*\n\n`;
    }
    md += `---\n\n`;
  });

  return md;
}

export function generateCompleteBookMarkdown(chapters: Chapter[]): string {
  let book = `# KITAB AL-KHULASHAH (الْخُلَاصَةُ)\n`;
  book += `### Intisari Kumpulan Dzikir & Doa Harian dan Mingguan\n`;
  book += `**Disusun oleh:** Al-Allamah Ad-Da'i Ilallah Al-Habib Umar bin Muhammad bin Salim bin Hafidz bin Syeikh Abubakar bin Salim\n\n`;
  book += `---\n\n`;

  chapters.forEach((ch) => {
    book += generateChapterMarkdown(ch);
    book += `\n\n\\pagebreak\n\n`;
  });

  return book;
}
