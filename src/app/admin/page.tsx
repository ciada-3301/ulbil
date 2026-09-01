"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Search, 
  UserCheck, 
  UserX, 
  Receipt, 
  BookOpen, 
  HeartHandshake, 
  Lock, 
  Unlock, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  Download, 
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { 
  INITIAL_PATRONS, 
  INITIAL_LOANS, 
  INITIAL_PAYMENTS, 
  INITIAL_DONATIONS, 
  Patron, 
  BookLoan, 
  PaymentRecord 
} from '@/data/mockStore';

export default function AdminManagerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [patrons, setPatrons] = useState<Patron[]>(INITIAL_PATRONS);
  const [selectedPatron, setSelectedPatron] = useState<Patron | null>(INITIAL_PATRONS[1]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'PATRONS' | 'FINANCE' | 'DONATIONS'>('PATRONS');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'admin1902' || passcode.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Administrator security PIN. Unauthorized access is restricted.');
    }
  };

  const handleToggleStatus = (patronId: string) => {
    setPatrons(patrons.map(p => {
      if (p.id === patronId) {
        const nextStatus: 'ACTIVE' | 'PENDING_VERIFICATION' | 'EXPIRED' = p.status === 'ACTIVE' ? 'EXPIRED' : 'ACTIVE';
        const updated: Patron = { ...p, status: nextStatus };
        if (selectedPatron?.id === patronId) setSelectedPatron(updated);
        return updated;
      }
      return p;
    }));
  };

  const filteredPatrons = patrons.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const patronLoans = selectedPatron 
    ? INITIAL_LOANS.filter(l => l.memberId === selectedPatron.memberId)
    : [];

  const patronPayments = selectedPatron 
    ? INITIAL_PAYMENTS.filter(p => p.memberId === selectedPatron.memberId)
    : [];

  const totalCollections = INITIAL_PAYMENTS.reduce((sum, p) => sum + p.amount, 0);
  const totalDonations = INITIAL_DONATIONS.reduce((sum, d) => sum + d.amount, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-gradient-to-b from-[#FCFBF7] to-[#FAF6ED]">
        <div className="max-w-md w-full heritage-card rounded-3xl bg-white border-2 border-[#DFB343] p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FEF5ED] border border-[#DFB343]/60 flex items-center justify-center text-[#C2592B]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B]">Executive Council Portal</span>
            <h1 className="font-serif font-extrabold text-2xl text-[#221F1E]">Administrator Manager</h1>
            <p className="text-xs text-[#7A6E65]">Enter the administrator PIN to search patrons, audit financial ledgers, and manage memberships.</p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Admin PIN..."
                className="w-full px-4 py-3 rounded-xl bg-[#FCFBF7] border-2 border-[#DFB343]/60 text-center font-mono text-lg tracking-widest focus:border-[#C2592B] focus:outline-hidden"
              />
              <p className="text-[11px] text-[#A0720A] mt-1.5 font-medium">Default admin PIN: <strong>admin1902</strong></p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Portal</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 space-y-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EADBCC] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold shadow-2xs mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C69214]" />
            <span>Council Executive Session Active</span>
          </div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#221F1E]">
            Patron Management & Financial Ledger
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#8C6D23] bg-white border border-[#DFB343] hover:bg-[#FEF5ED] transition-colors cursor-pointer"
          >
            Lock Admin Portal
          </button>
        </div>
      </div>

      {/* Financial Overview KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="heritage-card p-4 rounded-2xl bg-white border border-[#EADBCC] space-y-1">
          <span className="text-xs font-bold text-[#7A6E65]">Total Registered Patrons</span>
          <div className="font-serif font-extrabold text-2xl text-[#221F1E]">{patrons.length}</div>
          <p className="text-[10px] text-[#5A504B]">Active & Pending readers</p>
        </div>

        <div className="heritage-card p-4 rounded-2xl bg-white border border-[#EADBCC] space-y-1">
          <span className="text-xs font-bold text-[#7A6E65]">Active Memberships</span>
          <div className="font-serif font-extrabold text-2xl text-emerald-700">
            {patrons.filter(p => p.status === 'ACTIVE').length}
          </div>
          <p className="text-[10px] text-[#5A504B]">Verified borrowing patrons</p>
        </div>

        <div className="heritage-card p-4 rounded-2xl bg-white border border-[#EADBCC] space-y-1">
          <span className="text-xs font-bold text-[#7A6E65]">Membership Collections</span>
          <div className="font-serif font-extrabold text-2xl text-[#C2592B]">₹{totalCollections.toLocaleString()}</div>
          <p className="text-[10px] text-[#5A504B]">Fees & renewals collected</p>
        </div>

        <div className="heritage-card p-4 rounded-2xl bg-white border border-[#EADBCC] space-y-1">
          <span className="text-xs font-bold text-[#7A6E65]">125th Jubilee Donations</span>
          <div className="font-serif font-extrabold text-2xl text-[#C69214]">₹{totalDonations.toLocaleString()}</div>
          <p className="text-[10px] text-[#5A504B]">Quasquicentennial Fund</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EADBCC]">
        <button
          onClick={() => setActiveTab('PATRONS')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'PATRONS'
              ? 'border-[#C2592B] text-[#C2592B]'
              : 'border-transparent text-[#7A6E65] hover:text-[#221F1E]'
          }`}
        >
          Patron 360° Search & Inspector
        </button>
        <button
          onClick={() => setActiveTab('FINANCE')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'FINANCE'
              ? 'border-[#C2592B] text-[#C2592B]'
              : 'border-transparent text-[#7A6E65] hover:text-[#221F1E]'
          }`}
        >
          Membership Payments Ledger
        </button>
        <button
          onClick={() => setActiveTab('DONATIONS')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'DONATIONS'
              ? 'border-[#C2592B] text-[#C2592B]'
              : 'border-transparent text-[#7A6E65] hover:text-[#221F1E]'
          }`}
        >
          125th Jubilee Donation Fund
        </button>
      </div>

      {/* Tab 1: Patron Search & 360 Inspector */}
      {activeTab === 'PATRONS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Patron Search List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C69214]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, phone, ID, email..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
              />
            </div>

            <div className="heritage-card rounded-2xl overflow-hidden bg-white border border-[#EADBCC] divide-y divide-[#EADBCC]/60 max-h-[600px] overflow-y-auto">
              {filteredPatrons.map((patron) => {
                const isSelected = selectedPatron?.id === patron.id;
                return (
                  <button
                    key={patron.id}
                    onClick={() => setSelectedPatron(patron)}
                    className={`w-full p-3.5 text-left transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected ? 'bg-[#FEF5ED] border-l-4 border-[#C2592B]' : 'hover:bg-[#FCFBF7]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-[#221F1E]">{patron.name}</div>
                      <div className="font-mono text-[10px] text-[#C2592B]">{patron.memberId} • {patron.tier}</div>
                      <div className="text-[10px] text-[#7A6E65]">{patron.phone}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      patron.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {patron.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: 360 Patron Inspector */}
          <div className="lg:col-span-7">
            {selectedPatron ? (
              <div className="heritage-card rounded-2xl bg-white border-2 border-[#DFB343]/60 p-6 space-y-6 shadow-sm">
                
                {/* Patron Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EADBCC] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif font-extrabold text-xl text-[#221F1E]">{selectedPatron.name}</h2>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedPatron.status === 'ACTIVE' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {selectedPatron.status}
                      </span>
                    </div>
                    <div className="font-mono text-xs text-[#C2592B] font-bold mt-0.5">
                      Member ID: {selectedPatron.memberId} • Role: {selectedPatron.role}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(selectedPatron.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedPatron.status === 'ACTIVE'
                          ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {selectedPatron.status === 'ACTIVE' ? 'Set Expired / Suspend' : 'Activate Membership'}
                    </button>
                  </div>
                </div>

                {/* Verified Attributes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#FCFBF7] p-4 rounded-xl border border-[#EADBCC]">
                  <div className="space-y-1">
                    <div className="text-[#7A6E65]">Mobile Number</div>
                    <div className="font-semibold text-[#221F1E] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#C69214]" />
                      <span>{selectedPatron.phone}</span>
                      {selectedPatron.phoneVerified ? (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1 rounded">Verified</span>
                      ) : (
                        <span className="text-[10px] text-amber-700 bg-amber-100 px-1 rounded">Unverified</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[#7A6E65]">Email Address</div>
                    <div className="font-semibold text-[#221F1E] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#C69214]" />
                      <span className="truncate">{selectedPatron.email}</span>
                      {selectedPatron.emailVerified && (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1 rounded">Verified</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[#7A6E65]">Membership Tier</div>
                    <div className="font-semibold text-[#C2592B]">{selectedPatron.tier}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[#7A6E65]">Validity Window</div>
                    <div className="font-semibold text-[#221F1E]">Until {selectedPatron.validUntil}</div>
                  </div>
                </div>

                {/* Section: Patron Loan History */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 font-serif font-bold text-xs uppercase tracking-wider text-[#C2592B]">
                    <BookOpen className="w-4 h-4" />
                    <span>Borrowing & Issue History ({patronLoans.length})</span>
                  </div>

                  {patronLoans.length > 0 ? (
                    <div className="space-y-1.5">
                      {patronLoans.map((loan) => (
                        <div key={loan.id} className="p-3 rounded-xl bg-white border border-[#EADBCC] text-xs flex items-center justify-between">
                          <div>
                            <div className="font-bold text-[#221F1E]">{loan.bookTitle}</div>
                            <div className="text-[10px] text-[#7A6E65]">Acc: {loan.bookAccessionNo} • Issued: {loan.issuedDate}</div>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            loan.status === 'ISSUED' ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {loan.status} (Due: {loan.dueDate})
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#7A6E65] italic">No borrowing records on file.</p>
                  )}
                </div>

                {/* Section: Patron Payment & Receipt Ledger */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 font-serif font-bold text-xs uppercase tracking-wider text-[#C2592B]">
                    <Receipt className="w-4 h-4" />
                    <span>Payment History & Receipts ({patronPayments.length})</span>
                  </div>

                  {patronPayments.length > 0 ? (
                    <div className="space-y-1.5">
                      {patronPayments.map((pay) => (
                        <div key={pay.id} className="p-3 rounded-xl bg-white border border-[#EADBCC] text-xs flex items-center justify-between">
                          <div>
                            <div className="font-bold text-[#221F1E]">{pay.purpose} (₹{pay.amount})</div>
                            <div className="text-[10px] text-[#7A6E65]">Receipt: {pay.receiptNo} • Date: {pay.date} • {pay.paymentMethod}</div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                            {pay.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#7A6E65] italic">No financial transactions recorded.</p>
                  )}
                </div>

              </div>
            ) : (
              <div className="heritage-card rounded-2xl bg-white border border-[#EADBCC] p-12 text-center text-[#7A6E65] text-xs">
                Select a patron from the left list to inspect their 360° record.
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Membership Payment Ledger */}
      {activeTab === 'FINANCE' && (
        <div className="heritage-card rounded-2xl overflow-hidden bg-white border border-[#EADBCC] shadow-xs">
          <div className="p-4 bg-[#FAF7F0] border-b border-[#EADBCC] flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-[#221F1E]">All Membership & Renewal Payments</h3>
            <span className="text-xs font-bold text-[#C2592B]">Total: ₹{totalCollections.toLocaleString()}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] border-b border-[#EADBCC] text-[#8C6D23] uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-3 px-4">Receipt Number</th>
                  <th className="py-3 px-4">Patron Name</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADBCC]/60 text-[#3E3835]">
                {INITIAL_PAYMENTS.map((pay) => (
                  <tr key={pay.id} className="hover:bg-[#FCFBF7]">
                    <td className="py-3 px-4 font-mono font-bold text-[#C2592B]">{pay.receiptNo}</td>
                    <td className="py-3 px-4 font-semibold text-[#221F1E]">{pay.patronName}</td>
                    <td className="py-3 px-4">{pay.purpose}</td>
                    <td className="py-3 px-4">{pay.paymentMethod}</td>
                    <td className="py-3 px-4 text-[#7A6E65]">{pay.date}</td>
                    <td className="py-3 px-4 text-right font-bold text-[#221F1E]">₹{pay.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: 125th Jubilee Donations */}
      {activeTab === 'DONATIONS' && (
        <div className="heritage-card rounded-2xl overflow-hidden bg-white border border-[#EADBCC] shadow-xs">
          <div className="p-4 bg-[#FAF7F0] border-b border-[#EADBCC] flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-[#221F1E]">125th Quasquicentennial Jubilee Donors (80G Tax Exemption)</h3>
            <span className="text-xs font-bold text-[#C69214]">Total Fund: ₹{totalDonations.toLocaleString()}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] border-b border-[#EADBCC] text-[#8C6D23] uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-3 px-4">80G Certificate No</th>
                  <th className="py-3 px-4">Donor Name & Contact</th>
                  <th className="py-3 px-4">PAN Number</th>
                  <th className="py-3 px-4">Dedication / Message</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADBCC]/60 text-[#3E3835]">
                {INITIAL_DONATIONS.map((don) => (
                  <tr key={don.id} className="hover:bg-[#FCFBF7]">
                    <td className="py-3 px-4 font-mono font-bold text-[#C2592B]">{don.receiptNo}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#221F1E]">{don.donorName}</div>
                      <div className="text-[10px] text-[#7A6E65]">{don.phone} • {don.email}</div>
                    </td>
                    <td className="py-3 px-4 font-mono">{don.panNumber || 'N/A'}</td>
                    <td className="py-3 px-4 italic text-[#5A504B]">{don.message || '—'}</td>
                    <td className="py-3 px-4 text-[#7A6E65]">{don.date}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-700">₹{don.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
