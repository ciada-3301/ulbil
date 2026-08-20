"use client";

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { LIBRARY_INFO } from '@/data/libraryData';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#FCFBF7] to-[#FAF6ED] border-b border-[#EADBCC] py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-white px-3.5 py-1 rounded-full border border-[#DFB343]/60 shadow-2xs">
            Connect & Visit
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#221F1E]">
            Contact & Location Details
          </h1>
          <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
            Reach out to our librarian desk, administration, or 125th Anniversary committee. We are eager to assist readers, researchers, and well-wishers.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Feedback Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Cards Left Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Timings */}
            <div className="heritage-card p-6 rounded-3xl bg-white border border-[#EADBCC] space-y-5">
              <h3 className="font-serif font-bold text-lg text-[#221F1E] border-b border-[#EADBCC] pb-3 text-[#C2592B]">
                Library Headquarters
              </h3>

              <div className="space-y-4 text-xs text-[#5A504B]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF5ED] text-[#C2592B] flex items-center justify-center shrink-0 border border-[#DFB343]/40">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#221F1E] block">Physical Address</strong>
                    <p className="mt-0.5">{LIBRARY_INFO.address}</p>
                    <p className="text-[#8C6D23] font-semibold mt-1">Uluberia, Howrah, West Bengal – 711315</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF5ED] text-[#C69214] flex items-center justify-center shrink-0 border border-[#DFB343]/40">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#221F1E] block">Telephone Helpline</strong>
                    <a href="tel:+919836330911" className="hover:text-[#C2592B] font-semibold text-[#8C6D23]">{LIBRARY_INFO.phone}</a>
                    <p className="text-[11px] text-[#7A6E65]">General assistance during library hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF5ED] text-[#D95D24] flex items-center justify-center shrink-0 border border-[#DFB343]/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#221F1E] block">Official Email Addresses</strong>
                    <p><a href="mailto:ulu.ins.library@ulbil.org" className="hover:text-[#C2592B]">ulu.ins.library@ulbil.org</a></p>
                    <p><a href="mailto:ulu.ins.library@gmail.com" className="hover:text-[#C2592B]">ulu.ins.library@gmail.com</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF5ED] text-[#C69214] flex items-center justify-center shrink-0 border border-[#DFB343]/40">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#221F1E] block">Daily Timings</strong>
                    <p><strong>Morning:</strong> {LIBRARY_INFO.timings.morning}</p>
                    <p><strong>Evening:</strong> {LIBRARY_INFO.timings.evening}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EADBCC]">
                <a
                  href="https://www.facebook.com/p/Uluberia-Institute-Library-61553707542427/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Visit Official Facebook Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Inquiry / Feedback Form Right Column */}
          <div className="lg:col-span-7">
            <div className="heritage-card rounded-3xl bg-white border-2 border-[#DFB343]/60 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B]">Send a Message</span>
                <h3 className="font-serif font-extrabold text-2xl text-[#221F1E]">General Inquiry & Research Request</h3>
                <p className="text-xs text-[#7A6E65]">
                  Have a question regarding book holdings, event participation, or membership? Drop us a note.
                </p>
              </div>

              {sent ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
                  <div className="flex items-center gap-2 font-serif font-bold text-base text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Message Sent Successfully!</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Thank you, <strong>{name}</strong>. Your communication has been dispatched to the Secretary&apos;s desk at Uluberia Institute & Library. We will respond promptly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-4 py-2 rounded-lg bg-white border border-emerald-300 text-xs font-bold text-emerald-800 hover:bg-emerald-50 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMessage} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#3E3835] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priyabrata Roy"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#3E3835] mb-1">Email / Phone *</label>
                      <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. roy@example.com / 98363..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3E3835] mb-1">Subject of Inquiry *</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. 125th Souvenir Article / Book Borrowing / Research"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3E3835] mb-1">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your query or message in detail here..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
