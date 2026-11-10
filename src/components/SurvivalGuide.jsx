import React, { useState } from 'react';
import { SURVIVAL_GUIDE, CAMPUS_INFO } from '../data/campusData';
import { BookOpen, ShieldAlert, Phone, HelpCircle, ChevronDown, ChevronUp, Copy, Check, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

export default function SurvivalGuide({ searchQuery }) {
  const [openAccordion, setOpenAccordion] = useState('faq-1');
  const [copiedKey, setCopiedKey] = useState(null);

  const filteredFaqs = SURVIVAL_GUIDE.filter(item => {
    return searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const dosAndDonts = {
    dos: [
      "Carry your physical ID card everywhere (required for Library, SAC, and Gate entry).",
      "Join at least one technical and one cultural club in your first semester.",
      "Borrow reference textbooks from Central Library Digital Commons rather than buying new ones.",
      "Bookmark the student ERP portal on your mobile home screen for quick timetable updates.",
      "Explore the Night Canteen behind Hostel 3 for late-night exam group study sessions."
    ],
    donts: [
      "Don't let your attendance drop below 75% — professors strictly enforce exam eligibility.",
      "Don't forget to submit medical certificates within 3 days of returning to campus.",
      "Don't fall for fake WhatsApp groups asking for unverified event registration fees.",
      "Don't enter academic blocks without adhering to lab footwear safety regulations."
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Freshers' Handbook</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Senior Survival Kit & FAQs
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Everything seniors wished they knew on Day 1. Campus hacks, Wi-Fi configs, rules, and 24/7 helplines.
        </p>
      </div>

      {/* Emergency Helplines Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-red-900 uppercase">Campus Medical Health Center</div>
              <div className="text-sm font-black text-red-700">{CAMPUS_INFO.medicalCenter}</div>
              <div className="text-[11px] text-red-600">24/7 Ambulance & Free Doctor</div>
            </div>
          </div>
          <button
            onClick={() => handleCopy(CAMPUS_INFO.medicalCenter, 'med')}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title="Copy number"
          >
            {copiedKey === 'med' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-900 uppercase">Main Security Gate 1</div>
              <div className="text-sm font-black text-indigo-700">{CAMPUS_INFO.securityGate}</div>
              <div className="text-[11px] text-indigo-600">24/7 Campus Patrol & Lost Found</div>
            </div>
          </div>
          <button
            onClick={() => handleCopy(CAMPUS_INFO.securityGate, 'sec')}
            className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
            title="Copy number"
          >
            {copiedKey === 'sec' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-900 uppercase">Anti-Ragging Squad</div>
              <div className="text-sm font-black text-emerald-700">1800-180-5522</div>
              <div className="text-[11px] text-emerald-600">Zero Tolerance • 100% Confidential</div>
            </div>
          </div>
          <button
            onClick={() => handleCopy('1800-180-5522', 'rag')}
            className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
            title="Copy number"
          >
            {copiedKey === 'rag' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Split: FAQs and Dos/Donts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Accordion FAQs (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>Essential Campus Questions</span>
          </h3>

          {filteredFaqs.map(faq => {
            const isOpen = openAccordion === faq.id;

            return (
              <div 
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dos and Don'ts Column */}
        <div className="space-y-6">
          {/* Senior Dos */}
          <div className="bg-white rounded-3xl border border-emerald-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-3">
              <CheckCircle2 className="w-5 h-5" />
              <span>Campus Dos (Pro Tips)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {dosAndDonts.dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Senior Don'ts */}
          <div className="bg-white rounded-3xl border border-rose-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-3">
              <XCircle className="w-5 h-5" />
              <span>Campus Don'ts (Avoid Mistakes)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {dosAndDonts.donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
