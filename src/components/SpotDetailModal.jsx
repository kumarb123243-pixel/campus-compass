import React from 'react';
import { X, MapPin, Clock, Star, Sparkles, Wifi, Shield, Bookmark, Check, Navigation, Share2 } from 'lucide-react';

export default function SpotDetailModal({ spot, isOpen, onClose, isSaved, onToggleSave, onNavigate }) {
  if (!isOpen || !spot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Spot Hero Image Header */}
        <div className="relative h-60 w-full overflow-hidden shrink-0 bg-slate-900">
          <img
            src={spot.image}
            alt={spot.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top category badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-indigo-900 backdrop-blur-md shadow-sm">
              {spot.zone}
            </span>
          </div>

          {/* Bottom Title inside Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-200 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{spot.location}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-tight">
              {spot.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Key Quick Stats */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-slate-700">{spot.timings}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-slate-900">{spot.rating}</span>
              <span className="text-slate-400 font-normal">({spot.reviewsCount} reviews)</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">About This Place</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {spot.description}
            </p>
          </div>

          {/* Senior Insider Advice */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-amber-950 uppercase tracking-wide">Senior Insider Hack:</h5>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed mt-1 italic">
                  "{spot.seniorTip}"
                </p>
              </div>
            </div>
          </div>

          {/* Verified Amenities */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Available Amenities & Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {spot.amenities.map((amenity, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-800"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
          <button
            onClick={() => onToggleSave(spot, 'spot')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border transition-all ${
              isSaved
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved in Itinerary' : 'Save to Itinerary'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onNavigate) onNavigate(spot);
            }}
            className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>Show on Map</span>
          </button>
        </div>

      </div>
    </div>
  );
}
