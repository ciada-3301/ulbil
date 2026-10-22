"use client";

import React, { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import {
  Inbox,
  Send,
  Trash2,
  Mail,
  Lock,
  Search,
  RefreshCw,
  Star,
  ArrowLeft,
  Reply,
  Forward,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Building2,
  Eye,
  EyeOff,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { DEPARTMENTS, DepartmentAccount } from '@/lib/emails/config';
import { StoredEmail } from '@/lib/emails/store';

export default function WebmailPage() {
  // Auth state
  const [currentUser, setCurrentUser] = useState<DepartmentAccount | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('secretary@ulbil.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [, startTransition] = useTransition();

  // Mail state
  const [folder, setFolder] = useState<'inbox' | 'sent' | 'trash'>('inbox');
  const [emails, setEmails] = useState<StoredEmail[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState<StoredEmail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStarredOnly, setFilterStarredOnly] = useState(false);
  const [mailLoading, setMailLoading] = useState(false);

  // Compose state
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeMessage, setComposeMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch emails when user or folder changes
  useEffect(() => {
    if (currentUser) {
      fetchEmails();
    }
  }, [currentUser, folder]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/emails/auth');
      const data = await res.json();
      if (data.authenticated && data.user) {
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.error('Error checking auth:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginPassword) {
      setLoginError('Please enter the password.');
      return;
    }

    try {
      const res = await fetch('/api/emails/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Login failed.');
        return;
      }

      setCurrentUser(data.user);
      setLoginPassword('');
      showToast(`Signed in to ${data.user.name} (${data.user.email})`);
    } catch (err: any) {
      setLoginError(err.message || 'Network error during sign in.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/emails/auth', { method: 'DELETE' });
      setCurrentUser(null);
      setSelectedEmail(null);
      setEmails([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const fetchEmails = async () => {
    setMailLoading(true);
    try {
      const res = await fetch(`/api/emails?folder=${folder}&search=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (res.ok) {
        setEmails(data.emails || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Error fetching emails:', err);
    } finally {
      setMailLoading(false);
    }
  };

  const handleSelectEmail = async (email: StoredEmail) => {
    setSelectedEmail(email);
    if (!email.isRead) {
      // Mark as read
      try {
        await fetch('/api/emails', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: email.id, isRead: true })
        });
        setEmails((prev) =>
          prev.map((e) => (e.id === email.id ? { ...e, isRead: true } : e))
        );
        setUnreadCount((c) => Math.max(0, c - 1));
      } catch (err) {
        console.error('Failed to mark email read:', err);
      }
    }
  };

  const handleToggleStar = async (e: React.MouseEvent, email: StoredEmail) => {
    e.stopPropagation();
    const newStarred = !email.isStarred;
    try {
      await fetch('/api/emails', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: email.id, isStarred: newStarred })
      });
      setEmails((prev) =>
        prev.map((item) => (item.id === email.id ? { ...item, isStarred: newStarred } : item))
      );
      if (selectedEmail?.id === email.id) {
        setSelectedEmail((prev) => prev ? { ...prev, isStarred: newStarred } : null);
      }
    } catch (err) {
      console.error('Failed to star email:', err);
    }
  };

  const handleMoveToTrash = async (emailId: string) => {
    try {
      if (folder === 'trash') {
        // Permanently delete
        await fetch(`/api/emails?id=${emailId}`, { method: 'DELETE' });
        showToast('Email permanently deleted.');
      } else {
        // Move to trash
        await fetch('/api/emails', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: emailId, folder: 'trash' })
        });
        showToast('Email moved to Trash.');
      }
      setEmails((prev) => prev.filter((e) => e.id !== emailId));
      if (selectedEmail?.id === emailId) {
        setSelectedEmail(null);
      }
    } catch (err) {
      console.error('Failed to delete email:', err);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo || !composeSubject || !composeMessage) {
      showToast('Please fill out all fields before sending.', 'error');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: composeTo,
          subject: composeSubject,
          message: composeMessage
        })
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed to dispatch email.', 'error');
        return;
      }

      setIsComposeOpen(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeMessage('');

      if (data.mode === 'resend-live') {
        showToast(`Email dispatched successfully via Resend to ${composeTo}!`);
      } else {
        showToast(`Email recorded in mailbox for ${composeTo}! (Resend live key pending in Vercel)`);
      }

      // Refresh if in sent folder
      if (folder === 'sent') {
        fetchEmails();
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to send message.', 'error');
    } finally {
      setSending(false);
    }
  };

  const openReply = (email: StoredEmail) => {
    setComposeTo(email.from);
    setComposeSubject(email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`);
    setComposeMessage(`\n\n--- On ${new Date(email.createdAt).toLocaleString()}, ${email.from} wrote: ---\n${email.text || ''}`);
    setIsComposeOpen(true);
  };

  const openForward = (email: StoredEmail) => {
    setComposeTo('');
    setComposeSubject(email.subject.startsWith('Fwd:') ? email.subject : `Fwd: ${email.subject}`);
    setComposeMessage(`\n\n---------- Forwarded message ---------\nFrom: ${email.from}\nSubject: ${email.subject}\nDate: ${new Date(email.createdAt).toLocaleString()}\n\n${email.text || ''}`);
    setIsComposeOpen(true);
  };

  // Filtered emails
  const displayedEmails = emails.filter((e) => {
    if (filterStarredOnly && !e.isStarred) return false;
    return true;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#D95D24] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-[#6B635D]">Loading UIL Webmail Portal...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 1: LOGIN PORTAL (UNAUTHENTICATED)
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#2C2420] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
        {/* Top Header */}
        <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-2 border-b border-[#E8DFD0]">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-12 bg-white rounded-lg border border-[#D4C5B0] p-1 flex items-center justify-center shrink-0">
              <Image
                src="/images/Logo/logo_digital.png"
                alt="UIL Emblem"
                width={32}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="font-serif font-bold text-base sm:text-lg text-[#2C2420] leading-tight">
                Uluberia Institute &amp; Library
              </h1>
              <p className="text-xs text-[#8B6508] font-medium font-indic">
                অভ্যন্তরীণ ইমেল সার্ভিস • Internal Webmail
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#FEF0EA] text-[#D95D24] border border-[#FADCD0]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D95D24]" />
            @ulbil.com Private
          </span>
        </header>

        {/* Center Login Form */}
        <main className="flex-1 flex items-center justify-center py-10 px-2">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#E8DFD0] shadow-xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-[#FEF0EA] rounded-2xl border border-[#FADCD0] text-[#D95D24] flex items-center justify-center mx-auto shadow-sm">
                <Mail className="w-7 h-7" />
              </div>
              <h2 className="font-serif font-bold text-2xl text-[#2C2420]">
                Departmental Webmail
              </h2>
              <p className="text-xs text-[#7A6E65]">
                Select your official department account to sign in to the Resend mail system.
              </p>
            </div>

            {/* Department quick selector tabs */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6E65]">
                Select Department Account
              </label>
              <div className="grid grid-cols-1 gap-2">
                {Object.values(DEPARTMENTS).map((dept) => {
                  const isSelected = loginEmail === dept.email;
                  return (
                    <button
                      type="button"
                      key={dept.id}
                      onClick={() => setLoginEmail(dept.email)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#D95D24] bg-[#FEF0EA] shadow-sm ring-2 ring-[#D95D24]/10'
                          : 'border-[#E8DFD0] bg-white hover:bg-[#FAF7F0] hover:border-[#D4C5B0]'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl ${dept.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                        {dept.id.toUpperCase().slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#2C2420] truncate">
                          {dept.name}
                        </div>
                        <div className="text-[11px] text-[#8B6508] font-mono">
                          {dept.email}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#D95D24] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Password and submit form */}
            <form onSubmit={handleLogin} className="space-y-4 pt-1">
              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6E65]">
                  Department Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#998B80]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF7F0] border border-[#D4C5B0] rounded-xl text-sm text-[#2C2420] placeholder:text-[#998B80] focus:outline-none focus:border-[#D95D24] focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#998B80] hover:text-[#5A4F46] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-[#9A918A]">
                  Default key: <span className="font-mono text-[#D95D24] font-semibold">Institute@2026</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D95D24] hover:bg-[#B84A18] text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In to {loginEmail}</span>
              </button>
            </form>

            {/* Hostinger & Resend DNS Indicator Note */}
            <div className="border-t border-[#E8DFD0] pt-4 text-[11px] text-[#7A6E65] text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[#8B6508] font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>Hostinger DNS Verified • Resend Mail Gateway</span>
              </div>
              <p className="text-[#998B80]">
                Private service for Uluberia Institute &amp; Library leadership.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-xs text-[#998B80] py-2">
          © {new Date().getFullYear()} Uluberia Institute &amp; Library • Encrypted Mail Portal
        </footer>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: GMAIL-STYLE WEBMAIL CLIENT
  // ==========================================
  return (
    <div className="h-screen flex flex-col bg-white text-[#2C2420] overflow-hidden">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm transition-all ${
          notification.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-800'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-16 border-b border-[#E8DFD0] bg-[#FAF7F0] px-4 flex items-center justify-between gap-4 shrink-0">
        {/* Left: Branding */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-8 h-10 bg-white rounded-lg border border-[#D4C5B0] p-0.5 flex items-center justify-center">
            <Image
              src="/images/Logo/logo_digital.png"
              alt="UIL Emblem"
              width={26}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-base text-[#2C2420]">
                UIL Mail
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FEF0EA] text-[#D95D24]">
                @ulbil.com
              </span>
            </div>
            <p className="text-[10px] text-[#7A6E65] hidden sm:block">
              Uluberia Institute &amp; Library
            </p>
          </div>
        </div>

        {/* Center: Search Box */}
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-[#998B80] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                startTransition(() => {
                  fetchEmails();
                });
              }}
              placeholder={`Search in ${folder}...`}
              className="w-full pl-9 pr-8 py-2 bg-white border border-[#D4C5B0] rounded-xl text-xs sm:text-sm text-[#2C2420] placeholder:text-[#998B80] focus:outline-none focus:border-[#D95D24] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  fetchEmails();
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#998B80] hover:text-[#2C2420]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Active Department & User Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-bold text-[#2C2420] leading-tight">
              {currentUser.name}
            </span>
            <span className="text-[11px] font-mono text-[#D95D24]">
              {currentUser.email}
            </span>
          </div>

          <div className={`w-9 h-9 rounded-xl ${currentUser.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow-xs`}>
            {currentUser.id.toUpperCase().slice(0, 2)}
          </div>

          <button
            onClick={handleLogout}
            title="Sign out of Webmail"
            className="p-2 rounded-xl text-[#7A6E65] hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Mail Workspace (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-56 sm:w-64 border-r border-[#E8DFD0] bg-[#FAF7F0] p-3 flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            {/* Compose Button */}
            <button
              onClick={() => {
                setSelectedEmail(null);
                setIsComposeOpen(true);
              }}
              className="w-full py-3 px-4 bg-[#D95D24] hover:bg-[#B84A18] text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>Compose</span>
            </button>

            {/* Folder Navigation */}
            <nav className="space-y-1">
              <button
                onClick={() => {
                  setFolder('inbox');
                  setSelectedEmail(null);
                }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  folder === 'inbox'
                    ? 'bg-[#FEF0EA] text-[#D95D24] shadow-xs'
                    : 'text-[#5A4F46] hover:bg-[#F0EBE1]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4" />
                  <span>Inbox</span>
                </div>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D95D24] text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setFolder('sent');
                  setSelectedEmail(null);
                }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  folder === 'sent'
                    ? 'bg-[#FEF0EA] text-[#D95D24] shadow-xs'
                    : 'text-[#5A4F46] hover:bg-[#F0EBE1]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4" />
                  <span>Sent</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setFolder('trash');
                  setSelectedEmail(null);
                }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  folder === 'trash'
                    ? 'bg-[#FEF0EA] text-[#D95D24] shadow-xs'
                    : 'text-[#5A4F46] hover:bg-[#F0EBE1]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Trash2 className="w-4 h-4" />
                  <span>Trash</span>
                </div>
              </button>
            </nav>

            {/* Starred filter toggle */}
            <div className="pt-2 border-t border-[#E8DFD0]">
              <button
                onClick={() => setFilterStarredOnly(!filterStarredOnly)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                  filterStarredOnly ? 'bg-amber-50 text-amber-800' : 'text-[#7A6E65] hover:bg-[#F0EBE1]'
                }`}
              >
                <Star className={`w-4 h-4 ${filterStarredOnly ? 'text-amber-500 fill-amber-500' : ''}`} />
                <span>Starred only</span>
              </button>
            </div>
          </div>

          {/* Bottom Department Switcher */}
          <div className="border-t border-[#E8DFD0] pt-3 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#998B80] px-1 block">
              Department Desks
            </span>
            <div className="space-y-1">
              {Object.values(DEPARTMENTS).map((dept) => {
                const isActive = currentUser.email === dept.email;
                return (
                  <button
                    key={dept.id}
                    onClick={() => {
                      if (!isActive) {
                        setLoginEmail(dept.email);
                        // Trigger fast switch or prompt login
                        fetch('/api/emails/auth', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: dept.email, password: 'Institute@2026' })
                        }).then((res) => {
                          if (res.ok) {
                            setCurrentUser(dept);
                            setSelectedEmail(null);
                            showToast(`Switched account to ${dept.name}`);
                          }
                        });
                      }
                    }}
                    className={`w-full p-2 rounded-xl text-left flex items-center gap-2 text-[11px] font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#2C2420] border border-[#D4C5B0] shadow-xs'
                        : 'text-[#7A6E65] hover:bg-[#EFE8DD]'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#D95D24]' : 'bg-[#D4C5B0]'}`} />
                    <span className="truncate">{dept.name.split(' ')[0]} ({dept.email.split('@')[0]})</span>
                  </button>
                );
              })}
            </div>

            <div className="p-2 rounded-xl bg-white border border-[#E8DFD0] text-[10px] text-[#7A6E65] space-y-0.5">
              <div className="font-bold text-[#2C2420] flex items-center gap-1">
                <Building2 className="w-3 h-3 text-[#D95D24]" />
                <span>Hostinger &amp; Resend</span>
              </div>
              <p>DNS active on @ulbil.com</p>
            </div>
          </div>
        </aside>

        {/* Right: Email List or Email Detail Pane */}
        <main className="flex-1 flex flex-col bg-white overflow-hidden">
          
          {/* Subheader Toolbar */}
          <div className="h-12 border-b border-[#E8DFD0] px-4 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2">
              {selectedEmail ? (
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-[#D95D24] hover:bg-[#FEF0EA] rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to {folder}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm uppercase tracking-wide text-[#2C2420]">
                    {folder}
                  </span>
                  <span className="text-xs text-[#998B80]">
                    ({displayedEmails.length} messages)
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchEmails}
                disabled={mailLoading}
                title="Refresh mail"
                className="p-1.5 rounded-lg text-[#7A6E65] hover:text-[#2C2420] hover:bg-[#FAF7F0] border border-[#E8DFD0] transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${mailLoading ? 'animate-spin text-[#D95D24]' : ''}`} />
              </button>

              {selectedEmail && (
                <button
                  onClick={() => handleMoveToTrash(selectedEmail.id)}
                  title={folder === 'trash' ? 'Delete permanently' : 'Move to trash'}
                  className="p-1.5 rounded-lg text-[#7A6E65] hover:text-red-600 hover:bg-red-50 border border-[#E8DFD0] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Content Pane */}
          <div className="flex-1 overflow-y-auto">
            {selectedEmail ? (
              // ==========================================
              // EMAIL DETAIL READING PANE
              // ==========================================
              <div className="p-6 max-w-4xl mx-auto space-y-6">
                {/* Email Subject Header */}
                <div className="space-y-3 pb-4 border-b border-[#E8DFD0]">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2C2420] leading-tight">
                      {selectedEmail.subject}
                    </h2>
                    <button
                      onClick={(e) => handleToggleStar(e, selectedEmail)}
                      className="text-[#998B80] hover:text-amber-500 shrink-0 cursor-pointer p-1"
                    >
                      <Star className={`w-5 h-5 ${selectedEmail.isStarred ? 'text-amber-500 fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* Sender & Recipient Metadata */}
                  <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FEF0EA] border border-[#FADCD0] text-[#D95D24] flex items-center justify-center font-bold text-sm shrink-0">
                        {selectedEmail.from.slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[#2C2420]">
                          {selectedEmail.fromName || selectedEmail.from}
                        </div>
                        <div className="text-[#7A6E65] font-mono text-[11px]">
                          From: {selectedEmail.from}
                        </div>
                        <div className="text-[#998B80] text-[11px]">
                          To: {selectedEmail.to.join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-[#998B80] text-[11px]">
                      {new Date(selectedEmail.createdAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                {/* Email Body Content */}
                <div className="text-sm text-[#4A4340] leading-relaxed whitespace-pre-wrap font-sans bg-[#FAF7F0]/40 p-6 rounded-2xl border border-[#E8DFD0]/60 min-h-[220px]">
                  {selectedEmail.text || (
                    <div dangerouslySetInnerHTML={{ __html: selectedEmail.html || '' }} />
                  )}
                </div>

                {/* Action Buttons: Reply, Forward */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => openReply(selectedEmail)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#D4C5B0] hover:border-[#D95D24] hover:text-[#D95D24] text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </button>
                  <button
                    onClick={() => openForward(selectedEmail)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#D4C5B0] hover:border-[#D95D24] hover:text-[#D95D24] text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Forward className="w-3.5 h-3.5" />
                    <span>Forward</span>
                  </button>
                  <button
                    onClick={() => handleMoveToTrash(selectedEmail.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 text-xs font-bold rounded-xl transition-colors cursor-pointer ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              // ==========================================
              // EMAIL LIST TABLE VIEW
              // ==========================================
              <div>
                {displayedEmails.length === 0 ? (
                  <div className="text-center py-20 px-4 space-y-3">
                    <div className="w-12 h-12 bg-[#FAF7F0] rounded-2xl border border-[#E8DFD0] text-[#998B80] flex items-center justify-center mx-auto">
                      <Mail className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-[#5A4F46]">
                      No messages found in {folder}
                    </p>
                    <p className="text-xs text-[#998B80]">
                      {searchQuery ? 'Try clearing your search query.' : 'Your department inbox is all clear!'}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#F0EBE1]">
                    {displayedEmails.map((email) => {
                      return (
                        <div
                          key={email.id}
                          onClick={() => handleSelectEmail(email)}
                          className={`flex items-center gap-3 px-4 py-3 hover:bg-[#FAF7F0] cursor-pointer transition-colors text-xs ${
                            !email.isRead && folder === 'inbox'
                              ? 'bg-amber-50/40 font-bold text-[#1C1816]'
                              : 'text-[#4A4340]'
                          }`}
                        >
                          {/* Star */}
                          <button
                            onClick={(e) => handleToggleStar(e, email)}
                            className="text-[#D4C5B0] hover:text-amber-500 shrink-0 p-0.5 cursor-pointer"
                          >
                            <Star className={`w-4 h-4 ${email.isStarred ? 'text-amber-500 fill-amber-500' : ''}`} />
                          </button>

                          {/* Sender / Recipient */}
                          <div className="w-36 sm:w-48 truncate shrink-0">
                            {folder === 'sent'
                              ? `To: ${email.to.join(', ')}`
                              : email.fromName || email.from}
                          </div>

                          {/* Subject & Snippet */}
                          <div className="flex-1 min-w-0 flex items-center gap-2">
                            <span className="truncate font-semibold text-[#2C2420]">
                              {email.subject}
                            </span>
                            <span className="text-[#998B80] font-normal truncate hidden sm:inline">
                              — {email.snippet}
                            </span>
                          </div>

                          {/* Timestamp */}
                          <div className="text-[11px] text-[#998B80] font-mono shrink-0 whitespace-nowrap pl-2">
                            {new Date(email.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ==========================================
          COMPOSE MODAL (GMAIL-STYLE FLOATING POPUP)
         ========================================== */}
      {isComposeOpen && (
        <div className="fixed bottom-0 right-0 sm:right-6 w-full sm:w-[540px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#D4C5B0] z-50 overflow-hidden flex flex-col max-h-[85vh]">
          {/* Modal Header */}
          <div className="bg-[#2C2420] text-white px-4 py-3 flex items-center justify-between shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider">
              New Message • {currentUser.email}
            </span>
            <button
              onClick={() => setIsComposeOpen(false)}
              className="text-white/70 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick-Pick Recipients for other departments */}
          <div className="px-4 py-2 bg-[#FAF7F0] border-b border-[#E8DFD0] flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-[#7A6E65] font-semibold shrink-0">Quick Add:</span>
            {Object.values(DEPARTMENTS)
              .filter((d) => d.email !== currentUser.email)
              .map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setComposeTo(d.email)}
                  className="px-2 py-0.5 rounded-full bg-white border border-[#D4C5B0] hover:border-[#D95D24] text-[#D95D24] font-medium shrink-0 cursor-pointer transition-colors"
                >
                  {d.email}
                </button>
              ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSendEmail} className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
            <div className="flex items-center gap-2 border-b border-[#E8DFD0] pb-2">
              <span className="text-xs font-bold text-[#7A6E65] w-12 shrink-0">From:</span>
              <span className="text-xs font-mono text-[#2C2420] font-semibold">{currentUser.email}</span>
            </div>

            <div className="flex items-center gap-2 border-b border-[#E8DFD0] pb-2">
              <span className="text-xs font-bold text-[#7A6E65] w-12 shrink-0">To:</span>
              <input
                type="email"
                required
                value={composeTo}
                onChange={(e) => setComposeTo(e.target.value)}
                placeholder="recipient@example.com"
                className="flex-1 text-xs text-[#2C2420] placeholder:text-[#998B80] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 border-b border-[#E8DFD0] pb-2">
              <span className="text-xs font-bold text-[#7A6E65] w-12 shrink-0">Subject:</span>
              <input
                type="text"
                required
                value={composeSubject}
                onChange={(e) => setComposeSubject(e.target.value)}
                placeholder="Subject of message"
                className="flex-1 text-xs text-[#2C2420] placeholder:text-[#998B80] focus:outline-none"
              />
            </div>

            <div className="flex-1">
              <textarea
                required
                value={composeMessage}
                onChange={(e) => setComposeMessage(e.target.value)}
                placeholder="Write your email message here..."
                rows={9}
                className="w-full text-xs text-[#2C2420] placeholder:text-[#998B80] focus:outline-none resize-none"
              />
            </div>

            {/* Bottom Send Toolbar */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD0]">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D95D24] hover:bg-[#B84A18] text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending via Resend...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsComposeOpen(false)}
                title="Discard draft"
                className="p-2 text-[#998B80] hover:text-red-600 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
