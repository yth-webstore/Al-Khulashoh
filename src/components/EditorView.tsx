import React, { useState } from 'react';
import { Chapter, DzikirItem } from '../types';
import { 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  FileDown, 
  Copy, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { generateChapterMarkdown } from '../data/khulashahData';

interface EditorViewProps {
  chapter: Chapter;
  onSaveChapter: (updated: Chapter) => void;
  onResetChapter: (chapterId: string) => void;
  hasCustomEdit: boolean;
}

export const EditorView: React.FC<EditorViewProps> = ({
  chapter,
  onSaveChapter,
  onResetChapter,
  hasCustomEdit
}) => {
  const [title, setTitle] = useState(chapter.title);
  const [arabicTitle, setArabicTitle] = useState(chapter.arabicTitle);
  const [description, setDescription] = useState(chapter.description);
  const [items, setItems] = useState<DzikirItem[]>(chapter.items);
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  const handleUpdateItem = (index: number, field: keyof DzikirItem, value: any) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    setItems(next);
  };

  const handleAddItem = () => {
    const newItem: DzikirItem = {
      id: `custom-item-${Date.now()}`,
      arabic: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ',
      translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang.',
      repeatCount: 1
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updated: Chapter = {
      ...chapter,
      title,
      arabicTitle,
      description,
      items
    };
    onSaveChapter(updated);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const updated: Chapter = { ...chapter, title, arabicTitle, description, items };
    const md = generateChapterMarkdown(updated);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${chapter.id}-edited.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    const updated: Chapter = { ...chapter, title, arabicTitle, description, items };
    const md = generateChapterMarkdown(updated);
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 max-w-5xl mx-auto w-full">
      {/* Editor Control Card */}
      <div className="bg-white dark:bg-stone-800 rounded-2xl p-5 md:p-6 shadow-sm border border-stone-200 dark:border-stone-700 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-stone-200 dark:border-stone-700">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Penyunting Teks (Editor)
              </h2>
              {hasCustomEdit && (
                <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-full">
                  Tersimpan di Browser
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Edit teks Arab berharakat, terjemahan bahasa Indonesia, dan catatan kaki. Siap diekspor ke GitHub!
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              {isSavedNotice ? <Check size={15} /> : <Save size={15} />}
              {isSavedNotice ? 'Tersimpan!' : 'Simpan Perubahan'}
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-medium transition-colors"
            >
              {copiedMd ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
              Salin Markdown
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-medium transition-colors"
            >
              <FileDown size={15} />
              Unduh .MD
            </button>

            {hasCustomEdit && (
              <button
                onClick={() => onResetChapter(chapter.id)}
                className="flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl text-xs font-medium transition-colors"
                title="Kembalikan ke naskah asli buku"
              >
                <RotateCcw size={15} />
                Reset ke Asli
              </button>
            )}
          </div>
        </div>

        {/* Chapter Header Edit Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Judul Bab (Indonesia)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Judul Bab (Arab)
            </label>
            <input
              type="text"
              value={arabicTitle}
              onChange={(e) => setArabicTitle(e.target.value)}
              dir="rtl"
              className="w-full px-3 py-2 text-base font-arabic rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Deskripsi / Keterangan Bab
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Item Blocks */}
      <div className="space-y-5">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-white dark:bg-stone-800 rounded-2xl p-5 shadow-sm border border-stone-200 dark:border-stone-700 relative group"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100 dark:border-stone-700">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Bagian {index + 1}
              </span>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                  <span>Ulang:</span>
                  <input
                    type="number"
                    min={1}
                    value={item.repeatCount || 1}
                    onChange={(e) => handleUpdateItem(index, 'repeatCount', parseInt(e.target.value) || 1)}
                    className="w-14 px-2 py-1 text-xs text-center rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900"
                  />
                  <span>x</span>
                </div>

                <button
                  onClick={() => handleRemoveItem(index)}
                  className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                  title="Hapus bagian ini"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Arabic Input */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 text-right" dir="rtl">
                النَّصُّ العَرَبِيُّ (Teks Arab Berharakat)
              </label>
              <textarea
                value={item.arabic}
                onChange={(e) => handleUpdateItem(index, 'arabic', e.target.value)}
                dir="rtl"
                rows={3}
                className="w-full px-3 py-2 text-xl font-arabic leading-loose rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Translation Input */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Terjemahan Bahasa Indonesia
              </label>
              <textarea
                value={item.translation}
                onChange={(e) => handleUpdateItem(index, 'translation', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm leading-relaxed rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Source & Note Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Sumber / Dalil (Opsional)
                </label>
                <input
                  type="text"
                  value={item.source || ''}
                  onChange={(e) => handleUpdateItem(index, 'source', e.target.value)}
                  placeholder="contoh: QS. Al-Baqarah: 255"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Catatan / Keterangan (Opsional)
                </label>
                <input
                  type="text"
                  value={item.note || ''}
                  onChange={(e) => handleUpdateItem(index, 'note', e.target.value)}
                  placeholder="contoh: Dibaca setelah salam"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Item Button */}
      <div className="mt-5 text-center">
        <button
          onClick={handleAddItem}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-stone-700 rounded-xl text-xs font-semibold transition-all shadow-sm"
        >
          <Plus size={16} />
          Tambah Bait / Bagian Baru
        </button>
      </div>
    </div>
  );
};
