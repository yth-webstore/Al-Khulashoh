import React from 'react';
import { Chapter, CategoryType } from '../types';
import { CATEGORIES } from '../data/khulashahData';
import { BookMarked, ChevronRight, FileText, Sparkles, Clock } from 'lucide-react';

interface SidebarProps {
  chapters: Chapter[];
  selectedChapterId: string;
  onSelectChapter: (id: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chapters,
  selectedChapterId,
  onSelectChapter,
  selectedCategory,
  onSelectCategory,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const filteredChapters = selectedCategory === 'all'
    ? chapters
    : chapters.filter((c) => c.category === selectedCategory);

  return (
    <aside className="w-full md:w-80 flex-shrink-0 bg-stone-50/70 dark:bg-stone-900/60 border-r border-stone-200 dark:border-stone-800 p-3 flex flex-col h-full overflow-hidden">
      {/* Category Pills */}
      <div className="mb-3">
        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 px-1 mb-1.5 block">
          Kategori Waktu & Doa
        </label>
        <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-all font-medium ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 px-1 mb-1 flex items-center justify-between">
          <span>Daftar Isi Kitab ({filteredChapters.length})</span>
          <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-normal">Hal. 1 - 394</span>
        </div>

        {filteredChapters.map((chapter) => {
          const isSelected = chapter.id === selectedChapterId;
          const isBookmarked = bookmarkedIds.includes(chapter.id);

          return (
            <div
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className={`group p-2.5 rounded-xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 shadow-sm'
                  : 'bg-white/70 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border-transparent hover:border-stone-200 dark:hover:border-stone-700'
              }`}
            >
              <div className="flex items-start justify-between gap-1.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200">
                      Hal. {chapter.pageStart}
                    </span>
                    <span className="text-[10px] text-stone-600 dark:text-stone-300 uppercase tracking-tight">
                      {chapter.category}
                    </span>
                  </div>
                  <h3 className={`text-xs font-semibold truncate ${
                    isSelected ? 'text-emerald-900 dark:text-emerald-400' : 'text-stone-800 dark:text-stone-200'
                  }`}>
                    {chapter.title}
                  </h3>
                  <p className="font-arabic text-xs text-stone-700 dark:text-stone-300 text-right truncate dir-rtl mt-0.5" dir="rtl">
                    {chapter.arabicTitle}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(chapter.id);
                  }}
                  className={`p-1 rounded-md transition-colors ${
                    isBookmarked 
                      ? 'text-amber-500 hover:text-amber-600' 
                      : 'text-stone-300 hover:text-stone-500 dark:hover:text-stone-400 opacity-0 group-hover:opacity-100'
                  }`}
                  title={isBookmarked ? 'Hapus bookmark' : 'Simpan bookmark'}
                >
                  <BookMarked size={15} className={isBookmarked ? 'fill-amber-500' : ''} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
