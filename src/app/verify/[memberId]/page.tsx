"use client";

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  BookOpen, 
  Phone, 
  Clock, 
  ArrowLeft,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { INITIAL_PATRONS, INITIAL_LOANS } from '@/data/mockStore';

export default function MemberVerificationPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const resolvedParams = use(params);
  const rawId = decodeURIComponent(resolvedParams.memberId);

  const patron = INITIAL_PATRONS.find(
    (p) => p.memberId.toLowerCase() === rawId.toLowerCase()
  );

  const activeLoans = patron 
    ? INITIAL_LOANS.filter((l) => l.memberId === patron.memberId && l.status !== 'RETURNED')
    : [];

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-8 bg-gradient-to-b from-[#FCFBF7] via-[#FAF6ED] to-[#F5EFE0] flex items-center justify-center">
      <div className="max-w-md w-full heritage-card rounded-3xl bg-white border-2 border-[#DFB343] p-6 sm:p-8 shadow-xl space-y-6 text-center">
        
        {/* Verification Status Header */}
        <div className="space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-md bg-emerald-50 border-2 border-emerald-500 text-emerald-600">
            {patron && patron.status === 'ACTIVE' ? (
              <CheckCircle2 className="w-10 h-10" />
            ) : (
              <XCircle className="w-10 h-10 text-red-500" />
            )}
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]/60">
              Official Verification Record
            </span>
            <h1 className="font-serif font-extrabold text-xl text-[#221F1E] mt-2">
              {patron ? 'Member Authenticated' : 'Record Not Found'}
            </h1>
            <p className="text-xs text-[#7A6E65]">
              Uluberia Institute & Library • Estd. 1902
            </p>
          </div>
        </div>

        {/* Member Details or Not Found */}
        {patron ? (
          <div className="space-y-4 text-left border-y border-[#EADBCC] py-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#FAF7F0] border-2 border-[#DFB343] shrink-0 relative flex items-center justify-center">
                {patron.photoUrl ? (
                  <Image
                    src={patron.photoUrl}
                    alt={patron.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="font-serif font-bold text-2xl text-[#C2592B]">
                    {patron.name.charAt(0)}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-[#221F1E] leading-tight">
                  {patron.name}
                </h3>
                <div className="font-mono text-xs font-bold text-[#C2592B]">
                  ID: {patron.memberId}
                </div>
                <div className="text-xs text-[#8C6D23] font-semibold">
                  {patron.tier}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Patron • {patron.status}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs space-y-1 text-[#3E3835]">
              <p><strong>Mobile:</strong> {patron.phone} {patron.phoneVerified && '✓'}</p>
              <p><strong>Member Since:</strong> {patron.joinedDate}</p>
              <p><strong>Valid Until:</strong> <span className="font-bold text-[#C2592B]">{patron.validUntil}</span></p>
            </div>

            {/* Currently Borrowed Books */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#C2592B] flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Currently Issued Books ({activeLoans.length})</span>
              </h4>

              {activeLoans.length > 0 ? (
                <div className="space-y-1.5">
                  {activeLoans.map((loan) => (
                    <div key={loan.id} className="p-2.5 rounded-lg bg-white border border-[#EADBCC] text-xs space-y-0.5">
                      <div className="font-bold text-[#221F1E] line-clamp-1">{loan.bookTitle}</div>
                      <div className="flex items-center justify-between text-[10px] text-[#7A6E65]">
                        <span>Acc: {loan.bookAccessionNo}</span>
                        <span className={loan.status === 'OVERDUE' ? 'text-red-600 font-bold' : 'text-[#C69214]'}>
                          Due: {loan.dueDate} ({loan.status})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#7A6E65] italic">No active books currently checked out.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-2">
            <p>No verified patron record corresponds to member ID: <strong>{rawId}</strong>.</p>
            <p>Please check the membership card or consult the library circulation desk.</p>
          </div>
        )}

        {/* Footer Helpline */}
        <div className="space-y-2 pt-2">
          <div className="text-[11px] text-[#7A6E65]">
            Counter Helpline: (+91) 98363 30911 • ulu.ins.library@ulbil.org
          </div>
          <Link
            href="/"
            className="w-full py-2.5 rounded-xl text-xs font-bold text-[#8C6D23] bg-[#FCFBF7] border border-[#DFB343] hover:bg-[#FEF5ED] transition-colors flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Library Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
