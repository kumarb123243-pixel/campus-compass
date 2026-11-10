import React, { useState } from 'react';
import { CURATED_TOURS } from '../data/campusData';
import { Compass, X, CheckCircle, Clock, Trash2, ArrowRight, Share2, Check } from 'lucide-react';

export default function TourPlannerModal({ 
  isOpen, 
  onClose, 
  savedItems, 
  onRemoveSaved, 
  onClearSaved 
}) {
  const [activeTab, setActiveTab] = useState('curated');
  const [checkedStops, setCheckedStops] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const toggleCheck = (id) => {
    setCheckedStops(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 leading-none">
                Campus Tour Planner & Saved Spots
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Explore curated walks or create your personalized first-day checklist
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center border-b border-slate-100 px-6 bg-slate-50 text-xs font-bold">
          <button
            onClick={() => setActiveTab('curated')}
            className={`py-3 px-4 border-b-2 transition-all ${
              activeTab === 'curated'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🏛️ Curated Guided Tours
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>⭐ My Saved Checklist</span>
            {savedItems.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-black">
                {savedItems.length}
              </span>
            )}
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'curated' ? (
            <div className="space-y-4">
              {CURATED_TOURS.map(tour => (
                <div 
                  key={tour.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {tour.target === 'freshers' ? '🎒 Fresher Tour' : tour.target === 'visitors' ? '🏛️ Visitor Tour' : '🍽️ Food Tour'}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">
                        {tour.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-4">
                    {tour.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Stops in this route:</span>
                    <div className="flex flex-wrap gap-2">
                      {tour.stops.map((stop, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5"
                        >
                          <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-800 text-[10px] font-black flex items-center justify-center">
                            {sIdx + 1}
                          </span>
                          <span>{stop}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {savedItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto mb-3 flex items-center justify-center">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Your checklist is empty</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 mb-4">
                    Click the bookmark icon on any campus spot or eatery to build your personalized visit route.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                    <span>{savedItems.length} Saved Locations</span>
                    <button
                      onClick={onClearSaved}
                      className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  {savedItems.map((item, idx) => {
                    const isDone = checkedStops[item.id];

                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                          isDone 
                            ? 'bg-slate-50 border-slate-200 opacity-60' 
                            : 'bg-white border-slate-200 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleCheck(item.id)}
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                              isDone
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 hover:border-indigo-500'
                            }`}
                          >
                            {isDone && <Check className="w-3.5 h-3.5" />}
                          </button>
                          <div>
                            <div className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                              {item.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {item.location || item.category}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveSaved(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Tour Plan'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
