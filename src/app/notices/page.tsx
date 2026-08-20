import React from 'react';
import { Bell, FileText, Download, ExternalLink, Calendar, Sparkles } from 'lucide-react';
import { RECENT_NOTICES } from '@/data/libraryData';

export const metadata = {
  title: "Notices, Circulars & News",
  description: "Official notifications, meeting circulars, tender notices, holiday lists, and announcements from Uluberia Institute & Library.",
};

export default function NoticesPage() {
  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#FCFBF7] to-[#FAF6ED] border-b border-[#EADBCC] py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-white px-3.5 py-1 rounded-full border border-[#DFB343]/60 shadow-2xs">
            Official Announcements
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#221F1E]">
            Notices & Circulars
          </h1>
          <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
            Stay updated with administrative circulars, 125th Jubilee schedules, cultural contests, and library operating notifications.
          </p>
        </div>
      </section>

      {/* Notices List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 space-y-4">
        {RECENT_NOTICES.map((notice) => (
          <div
            key={notice.id}
            className="heritage-card p-5 sm:p-6 rounded-2xl bg-white border border-[#EADBCC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {notice.isNew && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#FEF5ED] text-[#D95D24] border border-[#DFB343]/60">
                    NEW
                  </span>
                )}
                <span className="text-xs font-bold text-[#8C6D23] px-2.5 py-0.5 rounded-full bg-[#FAF7F0] border border-[#EADBCC]">
                  {notice.category}
                </span>
                <span className="text-xs text-[#7A6E65] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#C69214]" />
                  <span>{notice.date}</span>
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-[#221F1E] group-hover:text-[#C2592B] transition-colors">
                {notice.title}
              </h3>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <a
                href={notice.pdfUrl || '#'}
                target={notice.pdfUrl && notice.pdfUrl !== '#' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-2xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Archival Note */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#EADBCC] text-xs text-[#5A504B] text-center space-y-1">
          <p><strong>Official Notice Board:</strong> Physical copies of all notices are affixed on the library ground-floor bulletin board.</p>
          <p>For official inquiries or tender documentation, contact the Secretary at <strong>ulu.ins.library@ulbil.org</strong>.</p>
        </div>
      </section>

    </div>
  );
}
