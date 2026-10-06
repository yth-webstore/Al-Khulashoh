import React, { useState } from 'react';
import { Chapter, DzikirItem } from '../types';
import { 
  Copy, 
  Check, 
  Edit3, 
  BookMarked, 
  FileDown, 
  Eye, 
  EyeOff, 
  ZoomIn, 
  ZoomOut,
  Sparkles,
  Share2
} from 'lucide-react';
import { generateChapterMarkdown } from '../data/khulashahData';

interface ReaderViewProps {
  chapter: Chapter;
  onEditChapter: (chapter: Chapter) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  showTranslation: boolean;
  setShowTranslation: (val: boolean) => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  chapter,
  onEditChapter,
  isBookmarked,
  onToggleBookmark,
  fontSize,
  setFontSize,
  showTranslation,
  setShowTranslation
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [itemCounters, setItemCounters] = useState<Record<string, number>>({});

  const handleCopyItem = (item: DzikirItem) => {
    const textToCopy = `${item.arabic}\n\nTerjemahan:\n${item.translation}${item.note ? `\n\nCatatan: ${item.note}` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleIncrementCounter = (itemId: string, maxTarget?: number) => {
    setItemCounters((prev) => {
      const current = prev[itemId] || 0;
      if (maxTarget && current >= maxTarget) {
        return { ...prev, [itemId]: 0 }; // reset on reaching target
      }
      return { ...prev, [itemId]: current + 1 };
    });
  };

  const handleDownloadMarkdown = () => {
    const md = generateChapterMarkdown(chapter);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${chapter.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 max-w-4xl mx-auto w-full">
      {/* Chapter Title Banner */}
      <div className="bg-white/90 dark:bg-stone-800/90 rounded-2xl p-5 md:p-7 shadow-sm border border-stone-200/80 dark:border-stone-700 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
        
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Halaman {chapter.pageStart} - {chapter.pageEnd}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 capitalize">
                {chapter.category}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-stone-50 mb-1">
              {chapter.title}
            </h2>
            <p className="font-arabic text-2xl md:text-3xl text-emerald-800 dark:text-emerald-400 mt-2 text-right dir-rtl" dir="rtl">
              {chapter.arabicTitle}
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => onToggleBookmark(chapter.id)}
              className={`p-2 rounded-xl transition-colors ${
                isBookmarked 
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400' 
                  : 'bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
              title="Bookmark Bab Ini"
            >
              <BookMarked size={18} className={isBookmarked ? 'fill-amber-500' : ''} />
            </button>
            <button
              onClick={() => onEditChapter(chapter)}
              className="p-2 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors"
              title="Edit Teks Bab Ini"
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="p-2 rounded-xl bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors"
              title="Download file .md untuk GitHub"
            >
              <FileDown size={18} />
            </button>
          </div>
        </div>

        {chapter.description && (
          <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 mt-3 pt-3 border-t border-stone-100 dark:border-stone-700/60 italic">
            {chapter.description}
          </p>
        )}

        {/* Reader Controls Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 mt-4 pt-3 border-t border-stone-100 dark:border-stone-700/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 dark:text-stone-400">Ukuran Huruf:</span>
            <button
              onClick={() => setFontSize(Math.max(20, fontSize - 2))}
              className="p-1 rounded bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-700 dark:text-stone-300"
              title="Perkecil Font"
            >
              <ZoomOut size={14} />
            </button>
            <span className="font-semibold px-1">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(44, fontSize + 2))}
              className="p-1 rounded bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-700 dark:text-stone-300"
              title="Perbesar Font"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-700 dark:text-stone-300 font-medium"
          >
            {showTranslation ? <Eye size={14} /> : <EyeOff size={14} />}
            {showTranslation ? 'Sembunyikan Terjemah' : 'Tampilkan Terjemah'}
          </button>
        </div>
      </div>

      {/* Dzikir & Doa Items */}
      <div className="space-y-6">
        {chapter.items.map((item, idx) => {
          const count = itemCounters[item.id] || 0;
          const target = item.repeatCount || 1;
          const isFinished = target > 1 && count >= target;

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-stone-800 rounded-2xl p-5 md:p-6 shadow-sm border border-stone-200/80 dark:border-stone-700 transition-all hover:border-emerald-500/30"
            >
              {/* Top metadata & Actions */}
              <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-stone-100 dark:border-stone-700/60">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  {item.source && (
                    <span className="text-stone-500 dark:text-stone-400 font-medium italic">
                      {item.source}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Repeat Badge / Clickable Counter */}
                  {target > 1 && (
                    <button
                      onClick={() => handleIncrementCounter(item.id, target)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                        isFinished
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 hover:bg-amber-200'
                      }`}
                      title="Klik untuk menghitung dzikir"
                    >
                      <span>Hitung: {count} / {target}x</span>
                      {isFinished && <Check size={12} />}
                    </button>
                  )}

                  <button
                    onClick={() => handleCopyItem(item)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                    title="Salin Teks Arab & Terjemah"
                  >
                    {copiedId === item.id ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                  </button>
                </div>
              </div>

              {/* Arabic Text with customizable font size */}
              <div 
                className="font-arabic text-stone-900 dark:text-stone-100 text-right leading-loose dir-rtl mb-4 select-text"
                style={{ fontSize: `${fontSize}px`, lineHeight: 2.2 }}
                dir="rtl"
              >
                {item.arabic}
              </div>

              {/* Translation */}
              {showTranslation && (
                <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-700/60">
                  <p className="text-stone-700 dark:text-stone-300 text-sm md:text-base leading-relaxed">
                    {item.translation}
                  </p>
                </div>
              )}

              {/* Note or explanation */}
              {item.note && (
                <div className="mt-2 text-xs bg-amber-50/70 dark:bg-stone-900/60 text-amber-900 dark:text-amber-200 p-2.5 rounded-xl border border-amber-200/50 dark:border-stone-700">
                  <span className="font-semibold">Catatan:</span> {item.note}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
