import React from 'react';
import { Compass, Heart, Sparkles, MapPin, Phone, Shield } from 'lucide-react';
import { CAMPUS_INFO } from '../data/campusData';

export default function Footer({ onOpenAIModal, onSelectTab }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span>CampusCompass</span>
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              The all-in-one smart campus discovery platform designed for freshers, students, parents, and visitors at {CAMPUS_INFO.name}.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-indigo-400 border border-slate-700 text-[11px] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Hackathon 2026 Edition</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Explore</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('spots')} className="hover:text-white transition-colors">
                  Campus Directory & Spots
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('food')} className="hover:text-white transition-colors">
                  Food Radar & Canteens
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('clubs')} className="hover:text-white transition-colors">
                  Student Clubs & Hackathons
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('map')} className="hover:text-white transition-colors">
                  Interactive Campus Map
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('guide')} className="hover:text-white transition-colors">
                  Freshers' Survival Kit
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Contacts */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Campus Helplines</h4>
            <div className="space-y-1 text-slate-300">
              <div>🏥 Medical: <span className="font-mono text-white">{CAMPUS_INFO.medicalCenter}</span></div>
              <div>👮 Security: <span className="font-mono text-white">{CAMPUS_INFO.securityGate}</span></div>
              <div>🛡️ Anti-Ragging: <span className="font-mono text-white">1800-180-5522</span></div>
              <div className="pt-2">
                <button
                  onClick={onOpenAIModal}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Talk to Senior AI</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} CampusCompass • Built for Freshers & Campus Visitors
          </div>
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for the Hackathon</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
