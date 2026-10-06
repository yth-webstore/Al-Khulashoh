import React from 'react';
import { 
  BookOpen, 
  Edit3, 
  GitBranch, 
  Bookmark, 
  Search, 
  Moon, 
  Sun, 
  RotateCcw,
  Sparkles,
  Download,
  Share2
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'read' | 'edit' | 'asmaul-husna' | 'git';
  setActiveTab: (tab: 'read' | 'edit' | 'asmaul-husna' | 'git') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenBiography: () => void;
  onOpenExportModal: () => void;
  hasCustomEdits: boolean;
  onResetAllEdits: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  showTranslation: boolean;
  setShowTranslation: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
  onOpenBiography,
  onOpenExportModal,
  hasCustomEdits,
  onResetAllEdits,
  fontSize,
  setFontSize,
  showTranslation,
  setShowTranslation
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-emerald-900/10 bg-amber-50/90 dark:bg-stone-900/95 dark:border-stone-800 backdrop-blur-md px-4 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('read')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
              <span className="font-arabic text-2xl leading-none">خ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-emerald-950 dark:text-emerald-400 tracking-tight flex items-center gap-1.5">
                  AL-KHULASHAH
                  <span className="text-xs font-arabic font-normal text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 rounded">
                    الخلاصة
                  </span>
                </h1>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Al-Habib Umar bin Hafidz
              </p>
            </div>
          </div>

          {/* Quick buttons on mobile */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-stone-600 dark:text-stone-300 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800"
              title="Toggle Mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={onOpenExportModal}
              className="p-2 bg-emerald-600 text-white rounded-lg shadow-sm"
              title="GitHub & Export"
            >
              <GitBranch size={18} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 text-stone-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari wirid, doa, kata..."
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-xl border border-stone-300/80 dark:border-stone-700 bg-white/80 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
          />
        </div>

        {/* View mode buttons */}
        <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto justify-center">
          <button
            onClick={() => setActiveTab('read')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'read'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800'
            }`}
          >
            <BookOpen size={15} />
            Baca
          </button>

          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors relative ${
              activeTab === 'edit'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800'
            }`}
          >
            <Edit3 size={15} />
            Editor Teks
            {hasCustomEdits && (
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute -top-0.5 -right-0.5 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('asmaul-husna')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'asmaul-husna'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800'
            }`}
          >
            <Sparkles size={15} />
            99 Asmaul Husna
          </button>

          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors"
          >
            <GitBranch size={15} />
            GitHub & Export
          </button>

          <button
            onClick={onOpenBiography}
            className="px-2.5 py-1.5 text-xs text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition-colors"
          >
            Biografi
          </button>

          {/* Desktop utility icons */}
          <div className="hidden md:flex items-center gap-1 ml-2 pl-2 border-l border-stone-300 dark:border-stone-700">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 text-stone-600 dark:text-stone-300 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800"
              title="Ganti Tema Gelap/Terang"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
