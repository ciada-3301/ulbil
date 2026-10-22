import React from "react";
import Image from "next/image";
import { Wrench, Clock, MapPin, Phone, Mail, BookOpen } from "lucide-react";

export default function MaintenanceScreen() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F0] text-[#2C2420]">
      {/* Top Banner / Header */}
      <header className="border-b border-[#E8DFD0] bg-[#FAF7F0]/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D95D24]/30 shadow-sm bg-white shrink-0">
              <Image
                src="/images/jubilee_125_logo.jpg"
                alt="Uluberia Institute & Library 125th Jubilee"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg sm:text-xl text-[#2C2420] leading-tight">
                Uluberia Institute &amp; Library
              </h1>
              <p className="font-indic text-xs text-[#7A6E65]">
                উলুবেড়িয়া ইনস্টিটিউট ও লাইব্রেরি • Estd. 1902
              </p>
            </div>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF0EA] text-[#D95D24] border border-[#FADCD0]">
            <span className="w-2 h-2 rounded-full bg-[#D95D24] animate-pulse" />
            125th Jubilee Year
          </div>
        </div>
      </header>

      {/* Main Maintenance Message Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Animated maintenance icon badge */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#FEF0EA] border-2 border-[#FADCD0] flex items-center justify-center shadow-lg shadow-[#D95D24]/10 transform hover:scale-105 transition-transform duration-300">
              <Wrench className="w-10 h-10 sm:w-12 sm:h-12 text-[#D95D24] animate-[spin_10s_linear_infinite]" />
            </div>
            <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#D95D24] text-white shadow-sm">
              Notice
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#ECE5D8] text-[#5A4F46]">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Scheduled Maintenance
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C2420] tracking-tight">
              This Site is Under Maintenance
            </h2>
            <p className="font-indic text-base sm:text-lg text-[#7A6E65]">
              ওয়েবসাইট সাময়িক রক্ষণাবেক্ষণাধীন রয়েছে
            </p>
          </div>

          {/* Detailed polite message */}
          <div className="bg-white/80 backdrop-blur-sm border border-[#E8DFD0] rounded-2xl p-6 sm:p-8 shadow-sm text-left sm:text-center space-y-4">
            <p className="text-base sm:text-lg text-[#5A4F46] leading-relaxed">
              We are currently performing essential system updates and enhancements to improve the library portal and better serve our members, researchers, and public patrons.
            </p>
            <p className="text-sm text-[#7A6E65]">
              We apologize for any temporary inconvenience. The website will be restored and updated shortly.
            </p>
          </div>

          {/* Physical Library Contact & Operational Info */}
          <div className="bg-[#FAF7F0] border border-[#E8DFD0] rounded-2xl p-6 text-left space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2C2420] border-b border-[#E8DFD0] pb-2">
              <BookOpen className="w-4 h-4 text-[#D95D24]" />
              <span>Offline Services &amp; Physical Library Access</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#5A4F46]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D95D24] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C2420] block">Reading Room Hours:</strong>
                  <span>Morning: 09:00 AM – 12:00 PM</span>
                  <br />
                  <span>Evening: 04:00 PM – 07:00 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D95D24] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C2420] block">Address:</strong>
                  <span>Institute Road, Uluberia, Howrah, WB - 711315</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D95D24] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C2420] block">Helpline:</strong>
                  <a href="tel:+919836330911" className="hover:text-[#D95D24] transition-colors">
                    +91-9836330911
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D95D24] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C2420] block">Email Inquiries:</strong>
                  <a href="mailto:ulu.ins.library@gmail.com" className="hover:text-[#D95D24] transition-colors">
                    ulu.ins.library@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8DFD0] py-6 text-center text-xs text-[#7A6E65]">
        <div className="max-w-5xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Uluberia Institute &amp; Library. All Rights Reserved.</p>
          <p className="mt-1 font-indic text-[#998B80]">
            মানবতা • সমাজ • সংস্কৃতি (Mankind • Society • Culture)
          </p>
        </div>
      </footer>
    </div>
  );
}
