"use client";

import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  FileText,
  UserCheck
} from 'lucide-react';
import { MEMBERSHIP_TIERS, FAQS } from '@/data/libraryData';

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState('Ordinary Reader (General)');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#FCFBF7] to-[#FAF6ED] border-b border-[#EADBCC] py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#DFB343] text-xs font-bold text-[#C2592B] shadow-2xs">
            <Award className="w-3.5 h-3.5 text-[#C69214]" />
            <span>Join the 125-Year Community</span>
          </div>

          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#221F1E]">
            Library Membership Plans
          </h1>

          <p className="text-xs sm:text-sm text-[#5A504B] max-w-2xl mx-auto leading-relaxed">
            Gain full access to over 55,000 volumes, borrow books for home study, utilize Wi-Fi-enabled reading rooms, and receive complimentary copies of &apos;Satta&apos;.
          </p>
        </div>
      </section>

      {/* Membership Tiers Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`heritage-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all ${
                tier.recommended 
                  ? 'bg-gradient-to-b from-white to-[#FEF5ED] border-2 border-[#C2592B] shadow-lg ring-4 ring-[#C2592B]/10' 
                  : 'bg-white border border-[#EADBCC]'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#D95D24] to-[#C69214] text-white text-[10px] font-bold shadow-xs">
                  MOST POPULAR FOR READERS
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#221F1E]">{tier.name}</h3>
                  <p className="text-xs text-[#8C6D23] font-semibold mt-0.5">{tier.bengaliName}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#EADBCC]/80 space-y-1">
                  <div className="flex items-baseline gap-1 text-[#C2592B]">
                    <span className="font-serif font-extrabold text-3xl">{tier.fee}</span>
                    <span className="text-xs font-semibold text-[#7A6E65]">/ annual</span>
                  </div>
                  <div className="text-[11px] text-[#7A6E65]">
                    <strong>Deposit:</strong> {tier.deposit}
                  </div>
                  <div className="text-[11px] text-[#C69214] font-semibold">
                    <strong>Borrowing Quota:</strong> {tier.quota}
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-[#3E3835] pt-2">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C69214] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-[#EADBCC]/60">
                <button
                  onClick={() => {
                    setSelectedTier(tier.name);
                    const formEl = document.getElementById('membership-form');
                    formEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tier.recommended
                      ? 'bg-gradient-to-r from-[#D95D24] to-[#C69214] text-white shadow-md hover:opacity-95'
                      : 'bg-[#FCFBF7] border border-[#DFB343] text-[#8C6D23] hover:bg-[#FEF5ED]'
                  }`}
                >
                  Select this Tier & Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Online Application Form */}
      <section id="membership-form" className="max-w-4xl mx-auto px-4 sm:px-8 scroll-mt-28">
        <div className="heritage-card rounded-3xl bg-white border-2 border-[#DFB343]/60 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B]">Instant Registration</span>
            <h2 className="font-serif font-extrabold text-2xl text-[#221F1E]">
              Apply for Online Membership Registration
            </h2>
            <p className="text-xs text-[#7A6E65]">
              Submit your preliminary details online to initiate your membership card issuance.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
              <div className="flex items-center gap-2 font-serif font-bold text-base text-emerald-800">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                <span>Application Submitted Successfully!</span>
              </div>
              <p className="text-xs leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your online application for <strong>{selectedTier}</strong> has been logged.
                Please visit the Uluberia Institute & Library counter during regular library hours with <strong>2 passport-size photographs</strong> and a <strong>valid photo ID</strong> to collect your laminated membership card.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-lg bg-white border border-emerald-300 text-xs font-bold text-emerald-800 hover:bg-emerald-50 cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#3E3835] mb-1">Selected Membership Tier *</label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden text-[#221F1E]"
                >
                  <option value="Student & Young Reader">Student & Young Reader (₹100/yr)</option>
                  <option value="Ordinary Reader (General)">Ordinary Reader - General (₹250/yr)</option>
                  <option value="Life Patron & Research Fellow">Life Patron & Research Fellow (₹5,000 one-time)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E3835] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Subhankar Sen"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3E3835] mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. (+91) 98363 30911"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E3835] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. subhankar@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3E3835] mb-1">Occupation / School / College</label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="e.g. Student, Uluberia College / Teacher"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E3835] mb-1">Residential Address *</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Full address with PIN Code..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Membership Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B]">Common Inquiries</span>
          <h2 className="font-serif font-extrabold text-2xl text-[#221F1E]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="heritage-card rounded-2xl bg-white border border-[#EADBCC] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-serif font-bold text-xs sm:text-sm text-[#221F1E] hover:text-[#C2592B] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C69214] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#5A504B] leading-relaxed border-t border-[#EADBCC]/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
