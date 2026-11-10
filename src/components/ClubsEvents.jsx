import React, { useState } from 'react';
import { CLUBS_DATA } from '../data/campusData';
import { Users, Calendar, Trophy, Sparkles, MessageCircle, ArrowRight, Globe, CheckCircle2, Bookmark } from 'lucide-react';

export default function ClubsEvents({ searchQuery, onRSVP }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [rsvpList, setRsvpList] = useState({});

  const categories = [
    { id: 'all', label: 'All Clubs & Events' },
    { id: 'technical', label: '💻 Coding & Tech' },
    { id: 'cultural', label: '🎵 Music & Dance' },
    { id: 'arts', label: '📸 Arts & Photography' },
    { id: 'entrepreneurship', label: '🚀 E-Cell & Startups' },
    { id: 'sports', label: '🏆 Sports & Adventure' },
  ];

  const filteredClubs = CLUBS_DATA.filter(club => {
    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.upcomingEvent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleRSVP = (clubId, eventName) => {
    setRsvpList(prev => ({
      ...prev,
      [clubId]: !prev[clubId]
    }));
    if (onRSVP) {
      onRSVP(eventName);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Campus Life & Communities</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Student Clubs, Societies & Upcoming Fests
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Find your tribe, build real projects, perform on stage, and compete in hackathons.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map(club => {
          const isRSVPed = rsvpList[club.id];

          return (
            <div
              key={club.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Category & Members */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                    {club.category}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {club.members}
                  </span>
                </div>

                {/* Club Title & Tagline */}
                <h3 className="text-xl font-bold text-slate-900 leading-snug mb-1">
                  {club.name}
                </h3>
                <div className="text-xs font-semibold text-indigo-600 mb-3 italic">
                  "{club.tagline}"
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {club.description}
                </p>

                {/* Upcoming Event Box */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50/50 rounded-2xl p-4 border border-indigo-100 mb-4">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span>Next Major Event</span>
                    </div>
                    <span className="text-[10px] bg-indigo-200/60 text-indigo-800 px-2 py-0.5 rounded-full">
                      {club.upcomingEvent.date}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {club.upcomingEvent.name}
                  </h4>

                  <div className="text-xs text-slate-600 mb-2">
                    📍 {club.upcomingEvent.venue} • 🏆 {club.upcomingEvent.prize}
                  </div>

                  <button
                    onClick={() => handleRSVP(club.id, club.upcomingEvent.name)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isRSVPed
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    {isRSVPed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Registered / RSVP'd</span>
                      </>
                    ) : (
                      <>
                        <span>Remind Me / Register</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* How to Join */}
                <div className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4">
                  <span className="font-bold text-slate-800 block mb-0.5">How Freshers Can Join:</span>
                  <span>{club.howToJoin}</span>
                </div>
              </div>

              {/* Footer Links */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                  <Globe className="w-3.5 h-3.5 text-pink-500" />
                  <span>{club.instagram}</span>
                </span>

                <span className="text-[11px] text-slate-400">
                  Lead: {club.lead}
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
