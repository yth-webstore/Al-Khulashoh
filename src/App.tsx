/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ALL_CHAPTERS } from './data/khulashahData';
import { Chapter, EditedContent } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ReaderView } from './components/ReaderView';
import { EditorView } from './components/EditorView';
import { AsmaulHusnaView } from './components/AsmaulHusnaView';
import { GitExportModal } from './components/GitExportModal';
import { BiographyModal } from './components/BiographyModal';
import { TasbihCounter } from './components/TasbihCounter';

const STORAGE_KEY_EDITS = 'khulashah_edited_content_v1';
const STORAGE_KEY_BOOKMARKS = 'khulashah_bookmarks_v1';
const STORAGE_KEY_FONT_SIZE = 'khulashah_font_size_v1';
const STORAGE_KEY_THEME = 'khulashah_theme_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'read' | 'edit' | 'asmaul-husna' | 'git'>('read');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('bangun-tidur');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Custom edits persisted in LocalStorage
  const [editedContent, setEditedContent] = useState<EditedContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EDITS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Bookmarks persisted in LocalStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      return saved ? JSON.parse(saved) : ['bangun-tidur', 'wirdul-latif'];
    } catch {
      return ['bangun-tidur', 'wirdul-latif'];
    }
  });

  // Reader Settings
  const [fontSize, setFontSize] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FONT_SIZE);
      return saved ? parseInt(saved) : 28;
    } catch {
      return 28;
    }
  });

  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  
  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  // Modals
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isGitModalOpen, setIsGitModalOpen] = useState(false);

  // Sync dark mode class on html tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'light');
    }
  }, [isDarkMode]);

  // Persist font size
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FONT_SIZE, fontSize.toString());
  }, [fontSize]);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Persist edits
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EDITS, JSON.stringify(editedContent));
  }, [editedContent]);

  // Merge default chapters with any custom edits
  const chaptersWithEdits = useMemo(() => {
    return ALL_CHAPTERS.map((ch) => {
      const custom = editedContent[ch.id];
      if (!custom) return ch;
      return {
        ...ch,
        title: custom.title || ch.title,
        arabicTitle: custom.arabicTitle || ch.arabicTitle,
        description: custom.description || ch.description,
        items: custom.items || ch.items
      };
    });
  }, [editedContent]);

  // Filter chapters by search query
  const searchableChapters = useMemo(() => {
    if (!searchQuery.trim()) return chaptersWithEdits;
    const q = searchQuery.toLowerCase();
    return chaptersWithEdits.filter((ch) => {
      const matchTitle = ch.title.toLowerCase().includes(q) || ch.arabicTitle.includes(q);
      const matchDesc = ch.description.toLowerCase().includes(q);
      const matchItems = ch.items.some(
        (it) => it.arabic.includes(q) || it.translation.toLowerCase().includes(q) || (it.note && it.note.toLowerCase().includes(q))
      );
      return matchTitle || matchDesc || matchItems;
    });
  }, [chaptersWithEdits, searchQuery]);

  const activeChapter = useMemo(() => {
    return chaptersWithEdits.find((c) => c.id === selectedChapterId) || chaptersWithEdits[0];
  }, [chaptersWithEdits, selectedChapterId]);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveChapter = (updated: Chapter) => {
    setEditedContent((prev) => ({
      ...prev,
      [updated.id]: {
        title: updated.title,
        arabicTitle: updated.arabicTitle,
        description: updated.description,
        items: updated.items,
        lastModified: new Date().toISOString()
      }
    }));
  };

  const handleResetChapter = (chapterId: string) => {
    setEditedContent((prev) => {
      const next = { ...prev };
      delete next[chapterId];
      return next;
    });
  };

  const handleResetAllEdits = () => {
    if (window.confirm('Kembalikan seluruh isi bab ke naskah asli buku Al-Khulashah?')) {
      setEditedContent({});
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 dark:bg-stone-950 text-stone-900 dark:text-stone-100 islamic-pattern transition-colors">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenBiography={() => setIsBioModalOpen(true)}
        onOpenExportModal={() => setIsGitModalOpen(true)}
        hasCustomEdits={Object.keys(editedContent).length > 0}
        onResetAllEdits={handleResetAllEdits}
        fontSize={fontSize}
        setFontSize={setFontSize}
        showTranslation={showTranslation}
        setShowTranslation={setShowTranslation}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden max-w-7xl mx-auto w-full">
        {/* Sidebar visible in 'read' and 'edit' views */}
        {(activeTab === 'read' || activeTab === 'edit') && (
          <Sidebar
            chapters={searchableChapters}
            selectedChapterId={selectedChapterId}
            onSelectChapter={(id) => setSelectedChapterId(id)}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* Dynamic Center Stage */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {activeTab === 'read' && (
            <ReaderView
              chapter={activeChapter}
              onEditChapter={() => setActiveTab('edit')}
              isBookmarked={bookmarkedIds.includes(activeChapter.id)}
              onToggleBookmark={handleToggleBookmark}
              fontSize={fontSize}
              setFontSize={setFontSize}
              showTranslation={showTranslation}
              setShowTranslation={setShowTranslation}
            />
          )}

          {activeTab === 'edit' && (
            <EditorView
              chapter={activeChapter}
              onSaveChapter={handleSaveChapter}
              onResetChapter={handleResetChapter}
              hasCustomEdit={Boolean(editedContent[activeChapter.id])}
            />
          )}

          {activeTab === 'asmaul-husna' && (
            <AsmaulHusnaView />
          )}

          {activeTab === 'git' && (
            <div className="p-8 max-w-3xl mx-auto">
              <button
                onClick={() => setIsGitModalOpen(true)}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold"
              >
                Buka Panduan GitHub
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Floating Tasbih Counter */}
      <TasbihCounter initialTarget={33} />

      {/* Biography Modal */}
      <BiographyModal
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
      />

      {/* Git & Export Modal */}
      <GitExportModal
        isOpen={isGitModalOpen}
        onClose={() => setIsGitModalOpen(false)}
        chapters={chaptersWithEdits}
      />
    </div>
  );
}
