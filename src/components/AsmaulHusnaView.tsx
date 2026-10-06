import React, { useState } from 'react';
import { ASMAUL_HUSNA } from '../data/asmaulHusnaData';
import { Search, Sparkles, Volume2, Copy, Check } from 'lucide-react';

export const AsmaulHusnaView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [copiedNumber, setCopiedNumber] = useState<number | null>(null);

  const filtered = ASMAUL_HUSNA.filter(
    (item) =>
      item.latin.toLowerCase().includes(search.toLowerCase()) ||
      item.meaning.toLowerCase().includes(search.toLowerCase()) ||
      item.arabic.includes(search)
  );

  const handleCopy = (item: typeof ASMAUL_HUSNA[0]) => {
    navigator.clipboard.writeText(`${item.arabic} (${item.latin}) - ${item.meaning}`);
    setCopiedNumber(item.number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 max-w-6xl mx-auto w-full">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-6 md:p-8 mb-6 shadow-md relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 mb-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={16} />
            Halaman 34 - 36 Kitab Al-Khulashah
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            99 Asmaul Husna (أَسْمَاءُ اللهِ الْحُسْنَى)
          </h2>
          <p className="text-emerald-100/90 text-xs md:text-sm leading-relaxed">
            Nama-nama Allah yang paling indah dan agung sebagaimana tercantum dalam naskah Kitab Al-Khulashah susunan Al-Habib Umar bin Hafidz untuk diamalkan dan dijadikan wasilah doa.
          </p>
        </div>

        {/* Search */}
        <div className="mt-5 max-w-md relative z-10">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-emerald-300" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau arti Asmaul Husna..."
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm rounded-xl bg-white/10 text-white placeholder-emerald-200/60 border border-emerald-400/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((item) => (
          <div
            key={item.number}
            className="bg-white dark:bg-stone-800 rounded-2xl p-4 border border-stone-200/80 dark:border-stone-700 hover:border-emerald-500/40 shadow-sm transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                {item.number}
              </span>
              <button
                onClick={() => handleCopy(item)}
                className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                title="Salin Asmaul Husna"
              >
                {copiedNumber === item.number ? (
                  <Check size={14} className="text-emerald-600" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>

            <div className="text-center my-2">
              <div className="font-arabic text-2xl md:text-3xl text-emerald-900 dark:text-emerald-300 leading-loose" dir="rtl">
                {item.arabic}
              </div>
              <div className="text-xs font-bold tracking-wider text-amber-700 dark:text-amber-400 mt-1 uppercase">
                {item.latin}
              </div>
            </div>

            <div className="text-center text-xs text-stone-600 dark:text-stone-300 pt-2 border-t border-stone-100 dark:border-stone-700/60 font-medium">
              {item.meaning}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
