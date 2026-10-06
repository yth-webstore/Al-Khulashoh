import React, { useState } from 'react';
import { 
  X, 
  GitBranch, 
  Terminal, 
  Download, 
  Copy, 
  Check, 
  BookOpen, 
  FolderGit2, 
  ExternalLink,
  Users,
  FileCode
} from 'lucide-react';
import { Chapter } from '../types';
import { generateCompleteBookMarkdown } from '../data/khulashahData';

interface GitExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
}

export const GitExportModal: React.FC<GitExportModalProps> = ({
  isOpen,
  onClose,
  chapters
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadCompleteBook = () => {
    const md = generateCompleteBookMarkdown(chapters);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AL-KHULASHAH-LENGKAP.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(chapters, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'al-khulashah-dataset.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const gitPushScript = `# 1. Buat repository baru di https://github.com/new
# Beri nama misalnya: al-khulashah

# 2. Hubungkan repository lokal ini ke remote GitHub Anda:
git remote add origin https://github.com/USERNAME/al-khulashah.git

# 3. Pastikan branch utama bernama main:
git branch -M main

# 4. Push seluruh file dan riwayat commit ke GitHub:
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-emerald-50/50 dark:bg-stone-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <FolderGit2 size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                Panduan Upload GitHub & Version Control
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Kitab Al-Khulashah versi teks siap edit, kolaborasi kontributor, & Git version control
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-stone-700 dark:text-stone-300">
          {/* Quick Downloads */}
          <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-700">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
              <Download size={16} className="text-emerald-600" />
              Unduh Naskah Teks Terbuka
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
              Anda dapat mengunduh seluruh isi naskah Al-Khulashah dalam format Markdown murni untuk diedit di VS Code, Obsidian, atau langsung di GitHub.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={handleDownloadCompleteBook}
                className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                <Download size={14} />
                Unduh AL-KHULASHAH-LENGKAP.md
              </button>
              <button
                onClick={handleDownloadJSON}
                className="flex items-center gap-2 px-3.5 py-2 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-semibold transition-colors"
              >
                <FileCode size={14} />
                Unduh Dataset JSON
              </button>
            </div>
          </div>

          {/* Step 1: Git Push to GitHub */}
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-2">
              <Terminal size={16} className="text-emerald-600" />
              Langkah Push ke Repository GitHub (Branch main)
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-2.5">
              Seluruh proyek ini telah diinisialisasi git dengan branch <code className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1 py-0.5 rounded font-mono">main</code>. Jalankan perintah berikut di terminal Anda untuk menghubungkan ke GitHub:
            </p>

            <div className="relative bg-stone-900 text-emerald-400 font-mono text-xs p-3.5 rounded-xl border border-stone-800">
              <pre className="overflow-x-auto whitespace-pre-wrap">{gitPushScript}</pre>
              <button
                onClick={() => handleCopyText(gitPushScript, 'git-script')}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                title="Salin Perintah Git"
              >
                {copiedSection === 'git-script' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Contributor Guide */}
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
              <Users size={16} className="text-emerald-600" />
              Panduan Kontributor Baru (Open Source Kitab)
            </h4>
            <div className="space-y-2 text-xs leading-relaxed">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 rounded-xl text-amber-900 dark:text-amber-200">
                <strong>Prinsip Amanah Teks:</strong> Kitab Al-Khulashah disusun oleh Al-Habib Umar bin Hafidz berdasarkan tuntunan Al-Qur\'an, Hadits shahih, dan amalan para salaf shalih. Setiap kontribusi harus menjaga keaslian harakat dan sanad teks.
              </div>

              <ul className="list-disc pl-5 space-y-1 text-stone-600 dark:text-stone-300">
                <li><strong>Koreksi Harakat / Ejaan:</strong> Buat branch baru misalnya <code className="bg-stone-200 dark:bg-stone-800 px-1 rounded">fix/harakat-wirdul-latif</code>.</li>
                <li><strong>Penyempurnaan Terjemah:</strong> Periksa kesesuaian terjemahan bahasa Indonesia dengan rujukan cetakan resmi Darul Musthafa Tarim / Penerbit Bacalah.</li>
                <li><strong>Dokumentasi Lengkap:</strong> Telah disertakan file <code className="font-mono text-emerald-600">README.md</code> dan <code className="font-mono text-emerald-600">CONTRIBUTING.md</code> di root direktori untuk mempermudah onboarding kontributor baru di GitHub.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
