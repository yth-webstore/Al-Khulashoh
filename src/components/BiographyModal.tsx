import React from 'react';
import { X, BookOpen, GraduationCap, Compass, BookMarked, Globe2 } from 'lucide-react';

interface BiographyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BiographyModal: React.FC<BiographyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-emerald-50/50 dark:bg-stone-800/50">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
              Biografi Ringkas Al-Habib Umar bin Hafidz
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Halaman 9 - 13 Kitab Al-Khulashah
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-5 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          {/* Kelahiran & Nasab */}
          <section className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-2">
              <BookOpen size={16} />
              Kelahiran dan Silsilah Nasab
            </h4>
            <p className="text-xs md:text-sm mb-2">
              Beliau dilahirkan di kota Tarim, Hadramaut, Republik Yaman sebelum Subuh dari ibunda Hababah Zahra binti Hafidz bin Abdullah Al-Haddar pada hari Senin, 4 Muharram 1383 H (27 Mei 1963 M).
            </p>
            <div className="text-xs bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200 dark:border-stone-800 font-mono text-stone-600 dark:text-stone-300">
              Al-Habib Umar bin Muhammad bin Salim bin Hafidz bin Abdullah bin Abu Bakar bin Aidarus bin Umar bin Aidarus bin Umar bin Abu Bakar bin Aidarus bin Husain bin Syeikh Abu Bakar bin Salim... bersambung hingga Sayyidina Al-Faqih Al-Muqaddam, Al-Imam Ahmad Al-Muhajir ilallah, Sayyidina Husein bin Ali, dan Sayyidatuna Fatimah Az-Zahra binti Rasulullah ﷺ.
            </div>
          </section>

          {/* Menuntut Ilmu */}
          <section>
            <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-2">
              <GraduationCap size={16} />
              Perjalanan Menuntut Ilmu
            </h4>
            <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300">
              Sejak usia dini, beliau menghafal Al-Qur\'an dan mempelajari berbagai disiplin ilmu syariat (Hadits, Fiqih, Tauhid, Ushul Fiqh, Nahwu, Bahasa Arab) serta suluk tasawuf dari ayahnya Al-Habib Muhammad bin Salim (Mufti Tarim) serta ulama terkemuka: Al-Habib Muhammad bin Alawi bin Shihab, Al-Habib Abdullah bin Syeikh Alaydrus, Al-Habib Umar bin Alawi Alkaf, Al-Habib Ahmad bin Hasan Al-Haddad, serta guru-guru di Haramain (Makkah & Madinah) seperti As-Sayyid Muhammad bin Alawi Al-Maliki dan Syeikh Muhammad Yasin Al-Faddani.
            </p>
          </section>

          {/* Darul Musthafa */}
          <section className="bg-emerald-50/60 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-1 flex items-center gap-2">
              <Globe2 size={16} />
              Pendirian Darul Musthafa di Tarim
            </h4>
            <p className="text-xs md:text-sm text-stone-700 dark:text-stone-300">
              Pada tahun 1414 H (1994 M), beliau mendirikan Pondok Pesantren <strong>Dar Al-Musthafa</strong> di Tarim, Hadramaut berdasarkan 3 pilar: 
              <br />
              1. <strong>ILMU:</strong> Pengkajian ilmu syariat bersanad tersambung (talaqqi).
              <br />
              2. <strong>SULUK:</strong> Pemurnian jiwa/hati (tazkiyatun nafs) dan akhlak karimah.
              <br />
              3. <strong>DA\'WAH:</strong> Menyebarkan manfaat dan menyeru ke jalan Allah dengan hikmah dan kasih sayang.
            </p>
          </section>

          {/* Karya Tulis */}
          <section>
            <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-2">
              <BookMarked size={16} />
              Sebagian Karya Tulis Beliau
            </h4>
            <ul className="text-xs space-y-1 list-disc pl-5 text-stone-600 dark:text-stone-300">
              <li><strong>Al-Khulashah:</strong> Intisari kumpulan dzikir dan doa harian.</li>
              <li><strong>Ad-Dhiya\' Al-Lami\' fi Dzikri Maulid An-Nabi Asy-Syafi\':</strong> Kitab Maulid yang masyhur.</li>
              <li><strong>Al-Mukhtar min Syifa as-Saqim:</strong> Koleksi hadits pilihan.</li>
              <li><strong>Is\'af Thalibi Ridhal Khallaq:</strong> Uraian budi pekerti luhur.</li>
              <li><strong>Taujihat Ath-Thullab:</strong> Arahan bagi para penuntut ilmu.</li>
            </ul>
          </section>
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
