"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  BookOpen, 
  QrCode, 
  Printer, 
  Receipt, 
  Clock, 
  Calendar, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  ArrowRight,
  LogOut,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  CreditCard,
  RotateCcw
} from 'lucide-react';
import { generateQrDataUrl } from '@/lib/qr';
import { INITIAL_PATRONS, INITIAL_LOANS, INITIAL_PAYMENTS, Patron, BookLoan } from '@/data/mockStore';
import PrintableCard from '@/components/dashboard/PrintableCard';
import MembershipCertificate from '@/components/dashboard/MembershipCertificate';
import { useSeniorMode } from '@/components/providers/SeniorModeProvider';

export default function MemberDashboardPage() {
  const [patron, setPatron] = useState<Patron>(INITIAL_PATRONS[1]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'CARD' | 'CERTIFICATE' | 'LOANS' | 'PAYMENTS' | 'PRINT'>('CARD');
  const [finePaid, setFinePaid] = useState(false);

  const { seniorMode, toggleSeniorMode } = useSeniorMode();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ulbil_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setPatron((prev) => ({
            ...prev,
            name: parsed.name || parsed.identifier || prev.name,
            email: parsed.email || (parsed.identifier?.includes('@') ? parsed.identifier : prev.email),
            phone: parsed.phone || (!parsed.identifier?.includes('@') ? parsed.identifier : prev.phone),
            address: parsed.address || prev.address,
            memberId: parsed.memberId || prev.memberId,
            tier: parsed.tier || prev.tier,
            validUntil: parsed.validUntil || prev.validUntil,
            status: parsed.status || 'ACTIVE'
          }));
        } catch {}
      }
    }
  }, []);

  useEffect(() => {
    async function initQr() {
      const verifyUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/verify/${patron.memberId}`
        : `https://ulbil.org/verify/${patron.memberId}`;
      const url = await generateQrDataUrl(verifyUrl, { width: 180 });
      setQrCodeUrl(url);
    }
    initQr();
  }, [patron.memberId]);

  const allLoans = INITIAL_LOANS.filter(l => l.memberId === patron.memberId || l.memberId === 'UIL-2026-0142');
  const activeLoans = allLoans.filter(l => l.status !== 'RETURNED');
  const overdueLoans = allLoans.filter(l => l.status === 'OVERDUE');
  const totalLateFines = overdueLoans.reduce((sum, l) => sum + (l.fineAmount || 0), 0);

  const payments = INITIAL_PAYMENTS.filter(p => p.memberId === patron.memberId || p.memberId === 'UIL-2026-0142');

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ulbil_user');
    }
  };

  return (
    <div className="py-10 space-y-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Top Welcome Header */}
      <div className="heritage-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#FEF5ED] via-[#FCFBF7] to-[#FAF6ED] border-2 border-[#DFB343]/70 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-16 sm:w-16 sm:h-20 rounded-2xl bg-white border-2 border-[#DFB343] shrink-0 overflow-hidden relative flex items-center justify-center shadow-xs">
            {patron.photoUrl ? (
              <Image
                src={patron.photoUrl}
                alt={patron.name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <span className="font-serif font-bold text-2xl sm:text-3xl text-[#C2592B]">
                {patron.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Patron ({patron.status})</span>
            </div>
            <h1 className="font-serif font-extrabold text-xl sm:text-2xl text-[#221F1E]">
              {patron.name}
            </h1>
            <p className="text-xs text-[#7A6E65]">
              Member ID: <strong className="font-mono text-[#C2592B]">{patron.memberId}</strong> • Tier: <strong className="text-[#8C6D23]">{patron.tier}</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Senior Mode Quick Toggle */}
          <button
            onClick={toggleSeniorMode}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              seniorMode
                ? 'bg-[#C2592B] text-white shadow-xs'
                : 'bg-white border border-[#DFB343] text-[#8C6D23] hover:bg-[#FEF5ED]'
            }`}
          >
            <span>👓 {seniorMode ? 'Senior Mode (ON)' : 'Senior Reader Mode'}</span>
          </button>

          <Link
            href="/auth/signin"
            onClick={handleSignOut}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#5A504B] bg-white border border-[#EADBCC] hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>

      {/* KPI Tiles: Loans, Fines, Validity, Quota */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Tile 1: Books Currently on Loan */}
        <div className="heritage-card p-5 rounded-2xl bg-white border border-[#EADBCC] space-y-1">
          <span className="text-xs font-bold text-[#7A6E65]">Books Currently Issued</span>
          <div className="font-serif font-extrabold text-3xl text-[#C2592B]">
            {activeLoans.length} <span className="text-xs font-normal text-[#7A6E65]">/ 2 max</span>
          </div>
          <p className="text-[11px] text-[#5A504B]">14-day borrowing window</p>
        </div>

        {/* Tile 2: Late Fines Due */}
        <div className={`heritage-card p-5 rounded-2xl border space-y-1 ${
          totalLateFines > 0 && !finePaid
            ? 'bg-red-50/50 border-red-200 text-red-900'
            : 'bg-white border-[#EADBCC]'
        }`}>
          <span className="text-xs font-bold text-[#7A6E65]">Overdue Late Fines</span>
          <div className="font-serif font-extrabold text-3xl text-[#221F1E]">
            {finePaid ? (
              <span className="text-emerald-700">₹0 <span className="text-xs font-normal text-emerald-600">(Cleared)</span></span>
            ) : totalLateFines > 0 ? (
              <span className="text-red-600">₹{totalLateFines}</span>
            ) : (
              <span className="text-emerald-700">₹0</span>
            )}
          </div>
          <p className="text-[11px] text-[#5A504B]">
            {totalLateFines > 0 && !finePaid ? (
              <button
                onClick={() => setFinePaid(true)}
                className="font-bold text-[#C2592B] hover:underline cursor-pointer"
              >
                Pay ₹{totalLateFines} Online via UPI
              </button>
            ) : (
              'All loans up to date (No pending dues)'
            )}
          </p>
        </div>

        {/* Tile 3: Membership Validity */}
        <div className="heritage-card p-5 rounded-2xl bg-white border border-[#EADBCC] space-y-1">
          <span className="text-xs font-bold text-[#7A6E65]">Membership Validity</span>
          <div className="font-serif font-extrabold text-2xl text-[#8C6D23] truncate">
            {patron.validUntil}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">Active & in good standing</p>
        </div>

        {/* Tile 4: Caution Deposit */}
        <div className="heritage-card p-5 rounded-2xl bg-white border border-[#EADBCC] space-y-1">
          <span className="text-xs font-bold text-[#7A6E65]">Refundable Caution Deposit</span>
          <div className="font-serif font-extrabold text-2xl text-[#221F1E]">
            ₹200
          </div>
          <p className="text-[11px] text-[#5A504B]">Registered on file with UIL</p>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EADBCC] overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('CARD')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
            activeTab === 'CARD'
              ? 'border-[#C2592B] text-[#C2592B]'
              : 'border-transparent text-[#7A6E65] hover:text-[#221F1E]'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Digital Card</span>
        </button>

        <button
          onClick={() => setActiveTab('CERTIFICATE')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
            activeTab === 'CERTIFICATE'
              ? 'border-[#C2592B] text-[#C2592B]'
              : 'border-transparent text-[#7A6E65] hover:text-[#221F1E]'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5 text-[#C69214]" />
          <span>Official Membership Certificate (PDF)</span>
        </button>

        <button
          onClick={() => setActiveTab('LOANS')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
            activeTab === 'LOANS'
              ? 'border-[#C2592B] text-[#C2592B]'
              : 'border-transparent text-[#7A6E65] hover:text-[#221F1E]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Book Issue History ({allLoans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('PAYMENTS')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
            activeTab === 'PAYMENTS'
              ? 'border-[#C2592B] text-[#C2592B]'
              : 'border-transparent text-[#7A6E65] hover:text-[#221F1E]'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Invoices & Receipts ({payments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('PRINT')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
            activeTab === 'PRINT'
              ? 'border-[#C2592B] text-[#C2592B]'
              : 'border-transparent text-[#7A6E65] hover:text-[#221F1E]'
          }`}
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Printable Wallet Card</span>
        </button>
      </div>

      {/* Tab 1: Digital Card */}
      {activeTab === 'CARD' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Digital Card */}
          <div className="lg:col-span-6">
            <div className="heritage-card rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#221F1E] via-[#2F2926] to-[#1C1816] border-2 border-[#DFB343] text-white shadow-xl space-y-6 relative overflow-hidden">
              
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-64 h-64">
                <Image
                  src="https://www.ulbil.org/images/Logo/logo_digital.png"
                  alt="Watermark"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/20 pb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-11 relative shrink-0">
                    <Image
                      src="https://www.ulbil.org/images/Logo/logo_digital.png"
                      alt="UIL Logo"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm leading-tight text-white">
                      ULUBERIA INSTITUTE & LIBRARY
                    </h3>
                    <p className="text-[10px] text-amber-300 font-semibold">125th Quasquicentennial Jubilee (1902–2027)</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#D95D24] text-white">
                  {patron.tier.toUpperCase()}
                </span>
              </div>

              {/* Card Body with QR Code */}
              <div className="flex items-center justify-between gap-4 relative z-10">
                <div className="space-y-1 text-xs">
                  <div className="text-neutral-400 text-[10px]">Patron Name</div>
                  <div className="font-serif font-bold text-lg text-amber-200">{patron.name}</div>
                  
                  <div className="pt-2 text-neutral-400 text-[10px]">Member Registration ID</div>
                  <div className="font-mono font-bold text-sm text-white">{patron.memberId}</div>

                  <div className="pt-2 text-neutral-400 text-[10px]">Valid Until</div>
                  <div className="font-semibold text-xs text-neutral-200">{patron.validUntil}</div>
                </div>

                {qrCodeUrl && (
                  <div className="bg-white p-2 rounded-2xl border-2 border-[#DFB343] shrink-0 shadow-lg text-center space-y-1">
                    <Image
                      src={qrCodeUrl}
                      alt="Verification QR"
                      width={120}
                      height={120}
                      className="object-contain mx-auto"
                    />
                    <span className="block text-[8px] font-bold text-[#221F1E]">SCAN TO VERIFY</span>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[10px] text-neutral-400 relative z-10">
                <span className="flex items-center gap-1 text-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Official Digital Library Credential
                </span>
                <span className="font-mono text-xs tracking-widest text-neutral-300">
                  ||||| | |||| ||||| ||
                </span>
              </div>

            </div>
          </div>

          {/* Quick Actions & Official Certificate Callout */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Certificate Callout Card */}
            <div className="heritage-card rounded-2xl p-6 bg-gradient-to-br from-[#FEF5ED] to-white border-2 border-[#DFB343]/70 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DFB343] text-xs font-bold text-[#C2592B]">
                <FileCheck className="w-3.5 h-3.5 text-[#C69214]" />
                <span>Official PDF Membership Certificate Available</span>
              </div>
              <h3 className="font-serif font-extrabold text-base sm:text-lg text-[#221F1E]">
                Need an Official Proof of Membership?
              </h3>
              <p className="text-xs text-[#5A504B] leading-relaxed">
                Generate and download an official verified certificate on institutional letterhead bearing your registration details, QR verification token, and authorized signatures.
              </p>
              <button
                onClick={() => setActiveTab('CERTIFICATE')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>View & Download Official Certificate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Profile & Security info */}
            <div className="heritage-card rounded-2xl p-6 bg-white border border-[#EADBCC] space-y-3 shadow-xs">
              <h4 className="font-serif font-bold text-sm text-[#221F1E]">
                Verified Patron Particulars
              </h4>

              <div className="space-y-2 text-xs text-[#3E3835]">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC]">
                  <span className="text-[#7A6E65]">Registered Phone:</span>
                  <span className="font-semibold text-[#221F1E] flex items-center gap-1">
                    {patron.phone} <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC]">
                  <span className="text-[#7A6E65]">Registered Email:</span>
                  <span className="font-semibold text-[#221F1E] flex items-center gap-1">
                    {patron.email} <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC]">
                  <span className="text-[#7A6E65]">Residential Address:</span>
                  <span className="font-semibold text-[#221F1E] text-right truncate max-w-[200px]">{patron.address}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Official Membership Certificate */}
      {activeTab === 'CERTIFICATE' && (
        <MembershipCertificate patron={patron} />
      )}

      {/* Tab 3: Complete Book Issue History */}
      {activeTab === 'LOANS' && (
        <div className="space-y-4">
          <div className="heritage-card rounded-2xl overflow-hidden bg-white border border-[#EADBCC] shadow-xs">
            <div className="p-4 bg-[#FAF7F0] border-b border-[#EADBCC] flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-sm text-[#221F1E]">Complete Book Issue & Return History</h3>
                <p className="text-[11px] text-[#7A6E65]">Chronological record of all volumes borrowed from Uluberia Institute & Library.</p>
              </div>
              <span className="text-xs font-bold text-[#C2592B]">Total Borrowed: {allLoans.length}</span>
            </div>

            <div className="divide-y divide-[#EADBCC]/60 text-xs">
              {allLoans.map((loan) => (
                <div key={loan.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FCFBF7] transition-colors">
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-[#221F1E]">{loan.bookTitle}</div>
                    <div className="text-[11px] text-[#7A6E65]">Author: {loan.author} • Accession No: <strong className="font-mono text-[#C2592B]">{loan.bookAccessionNo}</strong></div>
                    <div className="text-[11px] text-[#5A504B]">
                      Issued on: <strong>{loan.issuedDate}</strong> • Due: <strong>{loan.dueDate}</strong>
                      {loan.returnDate && ` • Returned on: ${loan.returnDate}`}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      loan.status === 'ISSUED'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : loan.status === 'OVERDUE'
                          ? 'bg-red-50 text-red-700 border border-red-200 animate-pulse'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {loan.status} {loan.fineAmount ? `(Fine: ₹${loan.fineAmount})` : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Invoices & Payments */}
      {activeTab === 'PAYMENTS' && (
        <div className="space-y-4">
          <div className="heritage-card rounded-2xl overflow-hidden bg-white border border-[#EADBCC] shadow-xs">
            <div className="p-4 bg-[#FAF7F0] border-b border-[#EADBCC] flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-sm text-[#221F1E]">Official Invoices & Payment Ledger</h3>
                <p className="text-[11px] text-[#7A6E65]">Membership registration fees, annual renewals, and library receipt history.</p>
              </div>
              <span className="text-xs text-[#8C6D23] font-bold">Non-Profit Heritage Trust</span>
            </div>

            <div className="divide-y divide-[#EADBCC]/60 text-xs">
              {payments.map((p) => (
                <div key={p.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FCFBF7] transition-colors">
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-[#221F1E]">{p.purpose}</div>
                    <div className="font-mono text-[11px] text-[#C2592B]">Receipt No: {p.receiptNo}</div>
                    <div className="text-[11px] text-[#7A6E65]">Date: {p.date} • Mode: {p.paymentMethod}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-serif font-extrabold text-base text-[#221F1E]">
                      ₹{p.amount}
                    </span>

                    <button 
                      onClick={() => alert(`Downloading official PDF receipt for ${p.receiptNo}...`)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#8C6D23] bg-[#FCFBF7] border border-[#DFB343] hover:bg-[#FEF5ED] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Printable Physical Card */}
      {activeTab === 'PRINT' && (
        <PrintableCard patron={patron} />
      )}

    </div>
  );
}

