import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  History, 
  BookOpen, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { LIBRARY_INFO } from '@/data/libraryData';

export const metadata = {
  title: "About Us & History (Estd. 1902)",
  description: "Learn about the history, foundation, leadership, and institutional evolution of Uluberia Institute & Library across 125 years.",
};

export default function AboutPage() {
  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-[#F5F0E8] border-b border-[#E8E0D4] py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-[#D95D24] bg-white px-3.5 py-1 rounded-full border border-[#D4C5B0]/60 ">
            Heritage & Mission
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#2C2420]">
            About Uluberia Institute & Library
          </h1>
          <p className="text-sm sm:text-base text-[#6B635D] leading-relaxed">
            A luminous cultural pillar founded in 1902 in pre-independence Bengal, standing for 125 years as a beacon of mankind, society, and culture.
          </p>
        </div>
      </section>

      {/* Main Narrative & History */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Full History */}
          <div className="lg:col-span-8 space-y-6 text-[#4A4340] text-sm sm:text-base leading-relaxed">
            
            <div className="heritage-card p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0D4] space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#2C2420] text-[#D95D24] flex items-center gap-2">
                <History className="w-5 h-5" />
                <span>The Genesis: Victoria Institute & Library (1902)</span>
              </h2>
              <p>
                In the year <strong>1902</strong>, in the historic riverside town of Uluberia on the banks of the Hooghly River, visionary educators, magistrates, and local scholars gathered to establish what was originally named the <em>&ldquo;Victoria Institute and Library&rdquo;</em>. Initially functioning from the second floor of the <strong>Uluberia High English School</strong>, the library was conceived as a vibrant public forum for literature, intellectual discourse, and community fellowship.
              </p>
              <p>
                As India&apos;s freedom movement and the Bengal Renaissance gathered momentum, the institution evolved into an open, inclusive sanctuary for the entire populaceâ€”embracing teachers, youth, social reformers, and freedom fighters alike.
              </p>
            </div>

            <div className="heritage-card p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0D4] space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#2C2420] text-[#D95D24] flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                <span>Pioneering Uluberia College & Binapani Girls&apos; High School</span>
              </h2>
              <p>
                The leadership and patrons of Uluberia Institute & Library played an unforgettable role in shaping the educational landscape of Howrah district:
              </p>
              <ul className="space-y-2 pt-1 pl-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <span><strong>Uluberia College (Estd. 1948):</strong> The Institute&apos;s governing committee was instrumental in establishing Uluberia&apos;s first degree college to provide affordable higher education to local youth immediately following Indian Independence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <span><strong>Binapani Girls&apos; High School (Estd. 1955):</strong> Recognizing that women&apos;s education was paramount to social progress, the Institute&apos;s patrons spearheaded the founding of Binapani Girls&apos; High School.</span>
                </li>
              </ul>
            </div>

            <div className="heritage-card p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0D4] space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#2C2420] text-[#D95D24] flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>The Literary Mouthpiece: &apos;Satta&apos; & Cultural Sub-Committees</span>
              </h2>
              <p>
                To foster literary creativity, the library regularly publishes its official literary magazine, <em>&ldquo;Satta&rdquo;</em>, containing essays, poetry, historical studies, and reviews by renowned scholars as well as promising young writers from Uluberia.
              </p>
              <p>
                Today, the institution operates through <strong>eight specialized sub-committees</strong> overseeing library acquisitions, rare manuscript conservation, children&apos;s academies, drama summer workshops, cultural festivals (Basanta Utsab, Nabanna Utsab, Rabindra Jayanti), and digital resources.
              </p>
            </div>

          </div>

          {/* Right Column: Fact Sheet & Quick Info */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="heritage-card p-6 rounded-2xl bg-white border-2 border-[#D4C5B0]/60 shadow-sm space-y-4">
              <div className="text-center pb-3 border-b border-[#E8E0D4]">
                <span className="text-3xl font-serif font-extrabold text-[#D95D24]">125</span>
                <span className="block font-serif font-bold text-sm uppercase tracking-widest text-[#8B6508]">
                  Years of Unbroken Service
                </span>
                <span className="text-[11px] text-[#9A918A]">1902 â€“ 2027</span>
              </div>

              <div className="space-y-2 text-sm text-[#4A4340]">
                <p><strong>Official Name:</strong> Uluberia Institute & Library</p>
                <p><strong>Bengali Name:</strong> {LIBRARY_INFO.bengaliName}</p>
                <p><strong>Founded:</strong> 1902</p>
                <p><strong>Motto:</strong> {LIBRARY_INFO.tagline}</p>
                <p><strong>Affiliation:</strong> Public Library (Govt. of West Bengal Grant-in-Aid Supported)</p>
                <p><strong>Total Volumes:</strong> 55,000+ Books & Periodicals</p>
                <p><strong>Patron Community:</strong> 4,200+ Registered Readers</p>
              </div>

              <div className="pt-3 border-t border-[#E8E0D4] flex flex-col gap-2">
                <Link
                  href="/leadership"
                  className="w-full text-center py-2.5 rounded-lg text-sm font-bold text-white bg-[#D95D24] shadow-xs"
                >
                  View Governing Body
                </Link>
                <a
                  href="/home/About_us.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded-lg text-sm font-bold text-[#8B6508] bg-[#F5F0E8] border border-[#D4C5B0]"
                >
                  Download Original Archival PDF
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="heritage-card p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E0D4] text-sm space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#2C2420] flex items-center gap-1.5 text-[#D95D24]">
                <Clock className="w-4 h-4" />
                <span>Visiting & Reading Hours</span>
              </h4>
              <p><strong>Morning Session:</strong> {LIBRARY_INFO.timings.morning}</p>
              <p><strong>Evening Session:</strong> {LIBRARY_INFO.timings.evening}</p>
              <p className="text-[11px] text-[#9A918A] pt-1">Open daily throughout the year except statutory holidays.</p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
