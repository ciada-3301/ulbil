"use client";

import React, { useState } from 'react';
import { MessageSquareQuote, Send, Heart, User, CheckCircle2 } from 'lucide-react';

interface MemoryItem {
  id: string;
  name: string;
  location: string;
  association: string;
  message: string;
  date: string;
}

const initialMemories: MemoryItem[] = [
  {
    id: 'm-1',
    name: 'Debabrata Mukherjee',
    location: 'Uluberia Bazaar',
    association: 'Member since 1974',
    message: 'I prepared for my civil services examinations in the quiet serenity of the second-floor reference room back in the 70s. This library is not just a building; it shaped my entire life and career. Long live Uluberia Institute & Library!',
    date: 'February 2026'
  },
  {
    id: 'm-2',
    name: 'Ananya Roy Chowdhury',
    location: 'Kolkata (Alumna, Binapani Girls High)',
    association: 'Student Reader (1998–2004)',
    message: 'Heartiest congratulations on 125 glorious years! Growing up in Uluberia, spending weekends exploring Sukumar Ray and Sarat Chandra novels here was my favorite childhood ritual.',
    date: 'January 2026'
  },
  {
    id: 'm-3',
    name: 'Prof. Subhasish Chattopadhyay',
    location: 'Howrah',
    association: 'Life Member & Research Patron',
    message: 'The rare collection of pre-independence Bengali periodicals preserved here is a goldmine for regional history scholars. Proud to see our institution entering its 125th year with such vitality.',
    date: 'December 2025'
  }
];

export default function MemoryWall() {
  const [memories, setMemories] = useState<MemoryItem[]>(initialMemories);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [association, setAssociation] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const newMemory: MemoryItem = {
      id: `m-${Date.now()}`,
      name,
      location: location || 'Uluberia',
      association: association || 'Patron & Well-Wisher',
      message,
      date: 'Just now'
    };

    setMemories([newMemory, ...memories]);
    setName('');
    setLocation('');
    setAssociation('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div id="memory-wall" className="space-y-12">
      
      {/* Submission Form Card */}
      <div className="heritage-card rounded-2xl bg-white border-2 border-[#B8860B]/60 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#FEF0EA] text-[#D95D24] flex items-center justify-center border border-[#B8860B]/40">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#2C2420]">
              Share Your Memory or Congratulatory Message
            </h3>
            <p className="text-sm text-[#9A918A]">
              Your heartfelt words will be published on the 125th Jubilee digital guestbook.
            </p>
          </div>
        </div>

        {submitted && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Thank you! Your commemorative message has been posted on the 125th Jubilee Memory Wall.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#4A4340] mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Soumitra Sen"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F0E8] border border-[#E8E0D4] text-sm focus:border-[#D95D24] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#4A4340] mb-1">City / Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Uluberia / Kolkata"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F0E8] border border-[#E8E0D4] text-sm focus:border-[#D95D24] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#4A4340] mb-1">Your Association</label>
              <input
                type="text"
                value={association}
                onChange={(e) => setAssociation(e.target.value)}
                placeholder="e.g. Life Member / Reader / Alumnus"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F0E8] border border-[#E8E0D4] text-sm focus:border-[#D95D24] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#4A4340] mb-1">Your Message or Memory *</label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your personal memories, impressions, or anniversary greetings for the library..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F0E8] border border-[#E8E0D4] text-sm focus:border-[#D95D24] focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#D95D24] hover:opacity-95 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Message</span>
            </button>
          </div>
        </form>
      </div>

      {/* Memory Wall Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memories.map((mem) => (
          <div
            key={mem.id}
            className="heritage-card p-5 rounded-2xl bg-white border border-[#E8E0D4] flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FEF0EA] border border-[#B8860B]/60 flex items-center justify-center text-[#D95D24]">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#2C2420]">{mem.name}</h4>
                    <p className="text-[10px] text-[#8B6508]">{mem.association}</p>
                  </div>
                </div>
                <span className="text-[10px] text-[#8B6508]">{mem.date}</span>
              </div>

              <p className="text-sm text-[#6B635D] leading-relaxed italic bg-[#FAF7F0] p-3 rounded-lg border border-[#E8E0D4]/40">
                &ldquo;{mem.message}&rdquo;
              </p>
            </div>

            <div className="pt-3 mt-2 border-t border-[#E8E0D4]/40 flex items-center justify-between text-[10px] text-[#9A918A]">
              <span>Location: {mem.location}</span>
              <Heart className="w-3 h-3 text-[#D95D24]" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
