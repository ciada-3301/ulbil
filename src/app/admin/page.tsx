"use client";

import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  Clock,
  Sparkles,
  Users,
  Filter
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
import { Member } from '@/lib/members/store';

export default function AdminManagerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [activeTab, setActiveTab] = useState<'PENDING' | 'REGISTER' | 'FINANCE' | 'DONATIONS'>('PENDING');

  // Real member data from API
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusNotification, setStatusNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'LIFE' | 'GENERAL'>('ALL');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const fetchMembers = async () => {
    setLoadingMembers(true);
    try {
      const res = await fetch('/api/admin/members');
      const data = await res.json();
      if (res.ok && data.members) {
        setMembers(data.members);
        // Default select first pending or first member
        const pendingList = data.members.filter((m: Member) => m.status === 'PENDING_APPROVAL');
        if (pendingList.length > 0) {
          setSelectedMember(pendingList[0]);
        } else if (data.members.length > 0) {
          setSelectedMember(data.members[0]);
        }
      }
    } catch (e) {
      console.error('Failed to load members:', e);
    } finally {
      setLoadingMembers(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMembers();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'admin1902' || passcode.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Administrator security PIN. Unauthorized access is restricted.');
    }
  };

  const handleApprove = async (memberId: string) => {
    setActionLoading(memberId);
    setStatusNotification(null);
    try {
      const res = await fetch('/api/admin/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'APPROVE', memberId })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusNotification({ message: data.message || `Member ${memberId} approved!`, type: 'success' });
        // Update local state
        setMembers(prev => prev.map(m => m.memberId === memberId ? { ...m, status: 'ACTIVE', isApproved: true } : m));
        if (selectedMember?.memberId === memberId) {
          setSelectedMember(prev => prev ? { ...prev, status: 'ACTIVE', isApproved: true } : null);
        }
      } else {
        setStatusNotification({ message: data.error || 'Approval failed.', type: 'error' });
      }
    } catch {
      setStatusNotification({ message: 'Network error during approval.', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (memberId: string) => {
    if (!confirm(`Are you sure you want to reject application ${memberId}?`)) return;
    setActionLoading(memberId);
    setStatusNotification(null);
    try {
      const res = await fetch('/api/admin/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'REJECT', memberId })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusNotification({ message: data.message || `Application ${memberId} rejected.`, type: 'success' });
        setMembers(prev => prev.map(m => m.memberId === memberId ? { ...m, status: 'REJECTED', isApproved: false } : m));
        if (selectedMember?.memberId === memberId) {
          setSelectedMember(prev => prev ? { ...prev, status: 'REJECTED', isApproved: false } : null);
        }
      } else {
        setStatusNotification({ message: data.error || 'Rejection failed.', type: 'error' });
      }
    } catch {
      setStatusNotification({ message: 'Network error during rejection.', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  };

  const pendingMembers = members.filter(m => m.status === 'PENDING_APPROVAL');
  const activeMembers = members.filter(m => m.status === 'ACTIVE');

  const filteredRegisterMembers = members.filter(m => {
    if (filterType === 'LIFE' && m.membershipType !== 'Life Member') return false;
    if (filterType === 'GENERAL' && m.membershipType !== 'General Member') return false;

    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(term) ||
      m.memberId.toLowerCase().includes(term) ||
      (m.phone && m.phone.includes(term)) ||
      (m.address && m.address.toLowerCase().includes(term)) ||
      (m.email && m.email.toLowerCase().includes(term))
    );
  });

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
            <p className="text-xs text-[#7A6E65]">Enter the administrator PIN to approve reader signups, inspect the 462-member official register, and audit accounts.</p>
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
            Patron Management & Executive Approval
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMembers}
            disabled={loadingMembers}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#221F1E] bg-[#FCFBF7] border border-[#EADBCC] hover:bg-white transition-colors cursor-pointer"
          >
            {loadingMembers ? 'Refreshing...' : 'Refresh Register'}
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#8C6D23] bg-white border border-[#DFB343] hover:bg-[#FEF5ED] transition-colors cursor-pointer"
          >
            Lock Admin Portal
          </button>
        </div>
      </div>

      {statusNotification && (
        <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
          statusNotification.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <span>{statusNotification.message}</span>
          <button onClick={() => setStatusNotification(null)} className="text-xs hover:opacity-75 cursor-pointer">✕</button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTab('PENDING')}
          className={`heritage-card p-4 rounded-2xl bg-white border transition-all cursor-pointer ${
            activeTab === 'PENDING' ? 'border-[#C2592B] ring-2 ring-[#C2592B]/20' : 'border-[#EADBCC]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A6E65]">Pending Signups</span>
            {pendingMembers.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                Action Required
              </span>
            )}
          </div>
          <div className="font-serif font-extrabold text-2xl text-amber-600">
            {pendingMembers.length}
          </div>
          <p className="text-[10px] text-[#5A504B]">Awaiting admin approval</p>
        </div>

        <div 
          onClick={() => setActiveTab('REGISTER')}
          className={`heritage-card p-4 rounded-2xl bg-white border transition-all cursor-pointer ${
            activeTab === 'REGISTER' ? 'border-[#C2592B] ring-2 ring-[#C2592B]/20' : 'border-[#EADBCC]'
          }`}
        >
          <span className="text-xs font-bold text-[#7A6E65]">Official Member Register</span>
          <div className="font-serif font-extrabold text-2xl text-emerald-700">
            {activeMembers.length}
          </div>
          <p className="text-[10px] text-[#5A504B]">Synced from Excel Register (462+)</p>
        </div>

        <div 
          onClick={() => setActiveTab('FINANCE')}
          className={`heritage-card p-4 rounded-2xl bg-white border transition-all cursor-pointer ${
            activeTab === 'FINANCE' ? 'border-[#C2592B] ring-2 ring-[#C2592B]/20' : 'border-[#EADBCC]'
          }`}
        >
          <span className="text-xs font-bold text-[#7A6E65]">Membership Collections</span>
          <div className="font-serif font-extrabold text-2xl text-[#C2592B]">₹{totalCollections.toLocaleString()}</div>
          <p className="text-[10px] text-[#5A504B]">Annual fees & renewals</p>
        </div>

        <div 
          onClick={() => setActiveTab('DONATIONS')}
          className={`heritage-card p-4 rounded-2xl bg-white border transition-all cursor-pointer ${
            activeTab === 'DONATIONS' ? 'border-[#C2592B] ring-2 ring-[#C2592B]/20' : 'border-[#EADBCC]'
          }`}
        >
          <span className="text-xs font-bold text-[#7A6E65]">125th Jubilee Donations</span>
          <div className="font-serif font-extrabold text-2xl text-[#C69214]">₹{totalDonations.toLocaleString()}</div>
          <p className="text-[10px] text-[#5A504B]">80G Tax Exemption Fund</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EADBCC]">
        <button
          onClick={() => setActiveTab('PENDING')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'PENDING'
              ? 'border-[#C2592B] text-[#C2592B]'
              : 'border-transparent text-[#7A6E65] hover:text-[#221F1E]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Pending Approvals</span>
          {pendingMembers.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C2592B] text-white">
              {pendingMembers.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('REGISTER')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'REGISTER'
              ? 'border-[#C2592B] text-[#C2592B]'
              : 'border-transparent text-[#7A6E65] hover:text-[#221F1E]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Members Register (Synced Excel Data)</span>
          <span className="text-[10px] text-[#A69C94]">({members.length})</span>
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

      {/* Tab 1: PENDING APPROVALS */}
      {activeTab === 'PENDING' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#221F1E]">New Reader Applications Awaiting Council Approval</h2>
              <p className="text-xs text-[#7A6E65]">Each applicant has verified their phone number via WhatsApp OTP. Approve to grant instant dashboard and loan access.</p>
            </div>
            <span className="text-xs font-bold text-[#C2592B]">{pendingMembers.length} Application(s)</span>
          </div>

          {pendingMembers.length === 0 ? (
            <div className="heritage-card rounded-2xl bg-white border border-[#EADBCC] p-12 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif font-bold text-base text-[#221F1E]">All Signups Approved</h3>
              <p className="text-xs text-[#7A6E65]">There are no reader applications currently pending admin approval.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingMembers.map((applicant) => (
                <div key={applicant.memberId} className="heritage-card rounded-2xl bg-white border-2 border-amber-300 p-5 shadow-sm space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        PENDING APPROVAL
                      </span>
                      <h3 className="font-serif font-bold text-base text-[#221F1E] mt-1">{applicant.name}</h3>
                      <p className="text-[11px] font-mono text-[#C2592B]">{applicant.memberId}</p>
                    </div>
                    <span className="text-[10px] text-[#A69C94]">{applicant.createdAt ? applicant.createdAt.split('T')[0] : 'Today'}</span>
                  </div>

                  <div className="space-y-1 text-xs text-[#5A504B] pt-1 border-t border-[#EADBCC]/60">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C69214]" />
                      <span>+91 {applicant.phone} (WhatsApp Verified)</span>
                    </div>
                    {applicant.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#C69214]" />
                        <span>{applicant.email}</span>
                      </div>
                    )}
                    <div className="text-[11px] text-[#7A6E65] pt-0.5">
                      <strong>Address:</strong> {applicant.address}
                    </div>
                    <div className="text-[11px] text-[#C2592B] font-semibold">
                      <strong>Requested Tier:</strong> {applicant.tier}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-[#EADBCC]/60">
                    <button
                      onClick={() => handleApprove(applicant.memberId)}
                      disabled={actionLoading === applicant.memberId}
                      className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{actionLoading === applicant.memberId ? 'Approving...' : 'Approve Member'}</span>
                    </button>
                    <button
                      onClick={() => handleReject(applicant.memberId)}
                      disabled={actionLoading === applicant.memberId}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: OFFICIAL MEMBERS REGISTER (SYNCED EXCEL DATA) */}
      {activeTab === 'REGISTER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Search & Filter List */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C69214]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search 462 members by name, phone, L/01, G/01..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex gap-1.5 text-xs">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  filterType === 'ALL' ? 'bg-[#C2592B] text-white' : 'bg-white border border-[#EADBCC] text-[#7A6E65]'
                }`}
              >
                All ({members.length})
              </button>
              <button
                onClick={() => setFilterType('LIFE')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  filterType === 'LIFE' ? 'bg-[#C2592B] text-white' : 'bg-white border border-[#EADBCC] text-[#7A6E65]'
                }`}
              >
                Life Members (292)
              </button>
              <button
                onClick={() => setFilterType('GENERAL')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  filterType === 'GENERAL' ? 'bg-[#C2592B] text-white' : 'bg-white border border-[#EADBCC] text-[#7A6E65]'
                }`}
              >
                General Members (170)
              </button>
            </div>

            <div className="heritage-card rounded-2xl overflow-hidden bg-white border border-[#EADBCC] divide-y divide-[#EADBCC]/60 max-h-[600px] overflow-y-auto">
              {filteredRegisterMembers.map((member) => {
                const isSelected = selectedMember?.memberId === member.memberId;
                return (
                  <button
                    key={member.memberId}
                    onClick={() => setSelectedMember(member)}
                    className={`w-full text-left p-3.5 transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected ? 'bg-[#FEF5ED] border-l-4 border-l-[#C2592B]' : 'hover:bg-[#FCFBF7]'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#221F1E]">{member.name}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          member.membershipType === 'Life Member' ? 'bg-amber-100 text-amber-900' : 'bg-neutral-100 text-neutral-800'
                        }`}>
                          {member.memberId}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#7A6E65] truncate max-w-xs">
                        {member.phone ? `+91 ${member.phone}` : 'No phone recorded'} • {member.address}
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      member.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : member.status === 'PENDING_APPROVAL'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {member.status}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: Member 360 Inspector */}
          <div className="lg:col-span-7">
            {selectedMember ? (
              <div className="heritage-card rounded-2xl bg-white border-2 border-[#DFB343]/60 p-6 space-y-6 shadow-sm">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EADBCC] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#C2592B] bg-[#FEF5ED] px-2 py-0.5 rounded border border-[#DFB343]/40">
                        {selectedMember.memberId}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedMember.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {selectedMember.status}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FCFBF7] border border-[#EADBCC] text-[#7A6E65]">
                        {selectedMember.membershipType}
                      </span>
                    </div>
                    <h2 className="font-serif font-extrabold text-xl sm:text-2xl text-[#221F1E]">
                      {selectedMember.name}
                    </h2>
                    {selectedMember.fatherOrHusband && (
                      <p className="text-xs text-[#7A6E65]">S/O or W/O: {selectedMember.fatherOrHusband}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {selectedMember.status === 'PENDING_APPROVAL' ? (
                      <button
                        onClick={() => handleApprove(selectedMember.memberId)}
                        disabled={actionLoading === selectedMember.memberId}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors cursor-pointer"
                      >
                        Approve Application
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                        Verified Member
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] space-y-1">
                    <span className="font-bold text-[#8C6D23] uppercase text-[10px]">Contact Mobile (WhatsApp OTP)</span>
                    <div className="font-mono font-bold text-[#221F1E]">
                      {selectedMember.phone ? `+91 ${selectedMember.phone}` : 'Not provided'}
                    </div>
                    {selectedMember.phones && selectedMember.phones.length > 1 && (
                      <div className="text-[10px] text-[#7A6E65]">
                        Alt numbers: {selectedMember.phones.join(', ')}
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] space-y-1">
                    <span className="font-bold text-[#8C6D23] uppercase text-[10px]">Membership Tier & Validity</span>
                    <div className="font-bold text-[#221F1E]">{selectedMember.tier}</div>
                    <div className="text-[10px] text-[#7A6E65]">Valid: {selectedMember.validUntil}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] space-y-1 sm:col-span-2">
                    <span className="font-bold text-[#8C6D23] uppercase text-[10px]">Registered Residential Address</span>
                    <div className="text-[#221F1E]">{selectedMember.address}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] space-y-1">
                    <span className="font-bold text-[#8C6D23] uppercase text-[10px]">Date of Birth / Age</span>
                    <div className="text-[#221F1E]">{selectedMember.dob || 'Not recorded'}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] space-y-1">
                    <span className="font-bold text-[#8C6D23] uppercase text-[10px]">Enrolled / Joining Date</span>
                    <div className="text-[#221F1E]">{selectedMember.joiningDate || 'Archival Register'}</div>
                  </div>
                </div>

                {/* OTP Login Helper */}
                <div className="p-3.5 rounded-xl bg-[#FEF5ED] border border-[#DFB343]/60 text-xs text-[#8C6D23] space-y-1">
                  <div className="font-bold text-[#C2592B]">Member OTP Sign In Credentials</div>
                  <p className="text-[11px] leading-relaxed">
                    This patron can sign in at <code>/auth/signin</code> by entering their Member ID <strong>{selectedMember.memberId}</strong> or their mobile number <strong>{selectedMember.phone || 'N/A'}</strong>. The 6-digit one-time code will be dispatched to their WhatsApp.
                  </p>
                </div>

              </div>
            ) : (
              <div className="heritage-card rounded-2xl bg-white border border-[#EADBCC] p-12 text-center text-[#7A6E65] text-xs">
                Select a member from the register list to inspect their profile.
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 3: Membership Payment Ledger */}
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

      {/* Tab 4: 125th Jubilee Donations */}
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
