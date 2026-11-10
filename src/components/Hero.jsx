import React, { useState, useEffect } from 'react';
import { Search, MapPin, Coffee, Sparkles, BookOpen, Clock, ShieldCheck, Compass, ArrowRight, Flame } from 'lucide-react';

export default function Hero({ 
  audienceMode, 
  searchQuery, 
  setSearchQuery, 
  campusInfo,
  onSelectTag,
  onOpenTourModal,
  onOpenAIModal 
}) {
  const quickTags = [
    { label: "Best Cold Coffee", query: "coffee", icon: "☕" },
    { label: "Quiet Study Rooms", query: "library", icon: "🤫" },
    { label: "Wi-Fi Login Setup", query: "wifi", icon: "📶" },
    { label: "Tech Clubs & Hackathons", query: "coding", icon: "🚀" },
    { label: "Budget Lunch < ₹60", query: "thali", icon: "🍛" },
    { label: "Gym & Sports Turf", query: "sports", icon: "⚽" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 shadow-xl">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        
        {/* Top Announcement Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-indigo-200 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{campusInfo.shortName} • {campusInfo.motto}</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
          {audienceMode === 'fresher' ? (
            <>
              Explore {campusInfo.shortName} Like a <span className="bg-gradient-to-r from-amber-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Senior</span>.
            </>
          ) : (
            <>
              Discover Every Corner of Our <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">{campusInfo.campusArea} Campus</span>.
            </>
          )}
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-8 font-normal leading-relaxed">
          {audienceMode === 'fresher'
            ? `Find hidden study spots, best canteen dishes, club recruitments, senior survival hacks, and get answers from our AI Mentor at ${campusInfo.name}.`
            : `Effortlessly locate academic blocks, auditoriums, guest dining halls, parking spots, and scenic walking gardens across ${campusInfo.name}.`}
        </p>

        {/* Global Instant Search Bar */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spots, food, clubs, Wi-Fi passwords, printing shops, or locations..."
              className="w-full pl-12 pr-28 py-4 bg-white/95 backdrop-blur-md rounded-2xl text-slate-900 placeholder-slate-400 text-sm sm:text-base font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-400/50 transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg"
              >
                Clear
              </button>
            ) : (
              <button
                onClick={onOpenAIModal}
                className="absolute right-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Ask AI</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-1">Trending:</span>
          {quickTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTag(tag.query)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-medium text-slate-200 transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <span>{tag.icon}</span>
              <span>{tag.label}</span>
            </button>
          ))}
        </div>

        {/* Curated Tour Action Banner */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 p-2 sm:p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 px-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Short on time? Pick a curated campus tour</span>
          </div>
          <button
            onClick={onOpenTourModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all"
          >
            <span>Explore Curated Tours</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Highlights Bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-300">45+</div>
          <div className="text-xs text-slate-300 font-medium">Mapped Spots & Labs</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300">₹15 - ₹75</div>
          <div className="text-xs text-slate-300 font-medium">Student Friendly Meals</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-pink-300">24 Active</div>
          <div className="text-xs text-slate-300 font-medium">Clubs & Societies</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300">24/7 AI</div>
          <div className="text-xs text-slate-300 font-medium">Senior Peer Guidance</div>
        </div>
      </div>

    </div>
  );
}
