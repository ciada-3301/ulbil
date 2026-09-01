"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Unlock, 
  Clock, 
  Calendar, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import { INITIAL_LOANS, INITIAL_PATRONS, BookLoan } from '@/data/mockStore';
import { SAMPLE_CATALOGUE } from '@/data/libraryData';

export default function LibrarianDeskPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [loans, setLoans] = useState<BookLoan[]>(INITIAL_LOANS);
  const [filter, setFilter] = useState<'ALL' | 'ISSUED' | 'OVERDUE'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Quick Issue state
  const [issueAccession, setIssueAccession] = useState('');
  const [issueMemberId, setIssueMemberId] = useState('');
  const [issueSuccess, setIssueSuccess] = useState('');
  const [issueError, setIssueError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'uil1902' || passcode.toLowerCase() === 'staff') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid staff security PIN. Please contact the Head Librarian.');
    }
  };

  const handleReturn = (loanId: string) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        return {
          ...loan,
          status: 'RETURNED',
          returnDate: new Date().toISOString().split('T')[0]
        };
      }
      return loan;
    }));
  };

  const handleQuickIssue = (e: React.FormEvent) => {
    e.preventDefault();
    setIssueSuccess('');
    setIssueError('');

    const patron = INITIAL_PATRONS.find(p => p.memberId.toLowerCase() === issueMemberId.trim().toLowerCase());
    if (!patron) {
      setIssueError(`Patron with ID "${issueMemberId}" was not found.`);
      return;
    }
    if (patron.status !== 'ACTIVE') {
      setIssueError(`Patron "${patron.name}" status is ${patron.status}. Cannot issue book.`);
      return;
    }

    const book = SAMPLE_CATALOGUE.find(b => b.accessionNo.toLowerCase() === issueAccession.trim().toLowerCase());
    const title = book ? book.title : `Volume (${issueAccession})`;
    const author = book ? book.author : 'Catalogue Record';

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 14);

    const newLoan: BookLoan = {
      id: `loan-${Date.now()}`,
      userId: patron.id,
      memberId: patron.memberId,
      borrowerName: patron.name,
      borrowerPhone: patron.phone,
      bookAccessionNo: issueAccession.trim().toUpperCase(),
      bookTitle: title,
      author: author,
      issuedDate: today.toISOString().split('T')[0],
      dueDate: due.toISOString().split('T')[0],
      status: 'ISSUED'
    };

    setLoans([newLoan, ...loans]);
    setIssueSuccess(`Successfully issued "${title}" to ${patron.name} (Due: ${due.toISOString().split('T')[0]}).`);
    setIssueAccession('');
    setIssueMemberId('');
  };

  const filteredLoans = loans.filter(l => {
    const matchesFilter = filter === 'ALL' || l.status === filter;
    const matchesSearch = 
      l.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.bookAccessionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.borrowerPhone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const activeCount = loans.filter(l => l.status === 'ISSUED').length;
  const overdueCount = loans.filter(l => l.status === 'OVERDUE').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-gradient-to-b from-[#FCFBF7] to-[#FAF6ED]">
        <div className="max-w-md w-full heritage-card rounded-3xl bg-white border-2 border-[#DFB343] p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FEF5ED] border border-[#DFB343]/60 flex items-center justify-center text-[#C2592B]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B]">Staff Access Only</span>
            <h1 className="font-serif font-extrabold text-2xl text-[#221F1E]">Librarian Circulation Desk</h1>
            <p className="text-xs text-[#7A6E65]">Enter the library circulation terminal PIN to manage daily loans.</p>
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
                placeholder="Enter Staff Terminal PIN..."
                className="w-full px-4 py-3 rounded-xl bg-[#FCFBF7] border-2 border-[#DFB343]/60 text-center font-mono text-lg tracking-widest focus:border-[#C2592B] focus:outline-hidden"
              />
              <p className="text-[11px] text-[#A0720A] mt-1.5 font-medium">Default staff terminal passcode: <strong>uil1902</strong></p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Circulation Desk</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 space-y-10 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EADBCC] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-bold shadow-2xs mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Circulation Terminal Active (Staff Mode)</span>
          </div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#221F1E]">
            Librarian Desk & Loan Registry
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#8C6D23] bg-white border border-[#DFB343] hover:bg-[#FEF5ED] transition-colors cursor-pointer"
          >
            Lock Terminal
          </button>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="heritage-card p-5 rounded-2xl bg-white border border-[#EADBCC] space-y-1">
          <span className="text-xs font-bold text-[#7A6E65]">Active Loans</span>
          <div className="font-serif font-extrabold text-3xl text-[#C2592B]">{activeCount}</div>
          <p className="text-[11px] text-[#5A504B]">Books currently in circulation</p>
        </div>

        <div className="heritage-card p-5 rounded-2xl bg-white border border-[#EADBCC] space-y-1">
          <span className="text-xs font-bold text-red-600">Overdue Loans</span>
          <div className="font-serif font-extrabold text-3xl text-red-600">{overdueCount}</div>
          <p className="text-[11px] text-[#5A504B]">Action required (fine accumulating)</p>
        </div>

        <div className="heritage-card p-5 rounded-2xl bg-white border border-[#EADBCC] space-y-1">
          <span className="text-xs font-bold text-emerald-700">Total Registry Entries</span>
          <div className="font-serif font-extrabold text-3xl text-[#8C6D23]">{loans.length}</div>
          <p className="text-[11px] text-[#5A504B]">Active & historical loan records</p>
        </div>
      </div>

      {/* Quick Issue Bar */}
      <div className="heritage-card p-6 rounded-2xl bg-white border-2 border-[#DFB343]/60 shadow-xs space-y-4">
        <div className="flex items-center gap-2 font-serif font-bold text-base text-[#221F1E]">
          <PlusCircle className="w-5 h-5 text-[#C2592B]" />
          <span>Quick Book Checkout / Issue Console</span>
        </div>

        {issueSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{issueSuccess}</span>
          </div>
        )}

        {issueError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{issueError}</span>
          </div>
        )}

        <form onSubmit={handleQuickIssue} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#3E3835] mb-1">Book Accession No *</label>
            <input
              type="text"
              required
              value={issueAccession}
              onChange={(e) => setIssueAccession(e.target.value)}
              placeholder="e.g. UIL-LIT-00104"
              className="w-full px-3 py-2 rounded-lg bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3E3835] mb-1">Member ID *</label>
            <input
              type="text"
              required
              value={issueMemberId}
              onChange={(e) => setIssueMemberId(e.target.value)}
              placeholder="e.g. UIL-2026-0142"
              className="w-full px-3 py-2 rounded-lg bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Issue Book (14 Days)</span>
            </button>
          </div>
        </form>
      </div>

      {/* Loan Records Filter & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {(['ALL', 'ISSUED', 'OVERDUE'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filter === f
                    ? 'bg-[#C2592B] text-white shadow-xs'
                    : 'bg-white border border-[#EADBCC] text-[#5A504B] hover:bg-[#FEF5ED]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C69214]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search loans by title, borrower, ID..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Loan Records Table */}
        <div className="heritage-card rounded-2xl overflow-hidden bg-white border border-[#EADBCC] shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] border-b border-[#EADBCC] text-[#8C6D23] uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Book Title & Accession</th>
                  <th className="py-3 px-4">Borrower & Member ID</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADBCC]/60 text-[#3E3835]">
                {filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-[#FCFBF7] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#221F1E] line-clamp-1">{loan.bookTitle}</div>
                      <div className="font-mono text-[10px] text-[#7A6E65]">{loan.bookAccessionNo} • {loan.author}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#221F1E]">{loan.borrowerName}</div>
                      <div className="font-mono text-[10px] text-[#C2592B]">{loan.memberId}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#5A504B]">
                      {loan.borrowerPhone}
                    </td>
                    <td className="py-3 px-4 text-[#7A6E65]">
                      {loan.issuedDate}
                    </td>
                    <td className="py-3 px-4">
                      <span className={loan.status === 'OVERDUE' ? 'text-red-600 font-bold' : 'text-[#221F1E]'}>
                        {loan.dueDate}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        loan.status === 'ISSUED'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : loan.status === 'OVERDUE'
                            ? 'bg-red-50 text-red-700 border border-red-200 animate-pulse'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {loan.status} {loan.fineAmount ? `(Fine: ₹${loan.fineAmount})` : ''}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {loan.status !== 'RETURNED' ? (
                        <button
                          onClick={() => handleReturn(loan.id)}
                          className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                          Mark Returned
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#7A6E65]">Returned on {loan.returnDate}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
