import React, { useState } from 'react';
import { CAMPUS_SPOTS } from '../data/campusData';
import { MapPin, Clock, Star, Sparkles, Bookmark, Check, Shield, Wifi, Wind, Zap, VolumeX, Printer, ExternalLink, FolderUp } from 'lucide-react';

export default function SpotsExplorer({ 
  spots = CAMPUS_SPOTS,
  searchQuery, 
  savedItems, 
  onToggleSave,
  onSelectSpotDetail,
  onNavigateToMap,
  onOpenAddSpotModal,
  onOpenImportExportModal
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');

  const categories = [
    { id: 'all', label: 'All Spots' },
    { id: 'library', label: '📚 Study & Library' },
    { id: 'academic', label: '💻 Labs & Tech' },
    { id: 'hangout', label: '🌳 Chill & Hangouts' },
    { id: 'sports', label: '⚽ Sports & Gym' },
    { id: 'admin', label: '🏛️ Admin & Services' },
  ];

  const zones = ['all', 'Central Hub', 'North Tech Zone', 'South Sports Hub', 'Main Gate Zone', 'Residential Zone'];

  // Filter spots based on category, zone, and search query
  const filteredSpots = spots.filter(spot => {
    const matchesCategory = selectedCategory === 'all' || spot.category === selectedCategory;
    const matchesZone = selectedZone === 'all' || spot.zone === selectedZone;
    const matchesSearch = searchQuery.trim() === '' || 
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.seniorTip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.amenities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesZone && matchesSearch;
  });

  const getAmenityIcon = (name) => {
    if (name.toLowerCase().includes('wi-fi') || name.toLowerCase().includes('ethernet')) return <Wifi className="w-3.5 h-3.5" />;
    if (name.toLowerCase().includes('ac') || name.toLowerCase().includes('air')) return <Wind className="w-3.5 h-3.5" />;
    if (name.toLowerCase().includes('port') || name.toLowerCase().includes('power') || name.toLowerCase().includes('charger')) return <Zap className="w-3.5 h-3.5" />;
    if (name.toLowerCase().includes('quiet') || name.toLowerCase().includes('silent')) return <VolumeX className="w-3.5 h-3.5" />;
    if (name.toLowerCase().includes('print')) return <Printer className="w-3.5 h-3.5" />;
    return <Sparkles className="w-3.5 h-3.5" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4" />
            <span>Campus Directory</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Explore Key Campus Spots
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Discover buildings, study sanctuaries, research labs, and popular student hangouts with verified senior tips.
          </p>
        </div>

        {/* Zone Selector and Add Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenImportExportModal && (
            <button
              onClick={onOpenImportExportModal}
              title="Import or export campus data from JSON or CSV files"
              className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold border border-slate-300 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <FolderUp className="w-3.5 h-3.5 text-indigo-600" />
              <span>Import Files</span>
            </button>
          )}

          <button
            onClick={onOpenAddSpotModal}
            className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs sm:text-sm font-semibold border border-indigo-200 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>+ Add Secret Spot</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-semibold uppercase">Zone:</span>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-white border border-slate-300 text-slate-700 text-xs sm:text-sm rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {zones.map(zone => (
                <option key={zone} value={zone}>
                  {zone === 'all' ? 'All Zones' : zone}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
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

      {/* Results Count */}
      <div className="text-xs text-slate-500 mb-6 font-medium">
        Showing <span className="font-bold text-slate-800">{filteredSpots.length}</span> spots {searchQuery && `matching "${searchQuery}"`}
      </div>

      {/* Spots Grid */}
      {filteredSpots.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <div className="w-16 h-16 mx-auto mb-4 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No campus spots found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
            We couldn't find any places matching your current filters. Try resetting the filters or searching for something else.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedZone('all'); }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map(spot => {
            const isSaved = savedItems.some(item => item.id === spot.id);

            return (
              <div 
                key={spot.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col group"
              >
                {/* Visual Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-indigo-800 shadow-xs">
                      {spot.zone}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(spot, 'spot');
                      }}
                      className={`p-2 rounded-full backdrop-blur-md transition-all ${
                        isSaved
                          ? 'bg-amber-400 text-slate-900 shadow-md'
                          : 'bg-white/80 text-slate-700 hover:bg-white'
                      }`}
                      title={isSaved ? "Remove from my itinerary" : "Save to my itinerary"}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold">{spot.rating}</span>
                      <span className="text-white/70">({spot.reviewsCount})</span>
                    </div>

                    <div className="flex items-center gap-1 bg-emerald-500/90 text-white font-medium px-2 py-1 rounded-md text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>Open Today</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location & Timings */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 mb-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{spot.location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-2">
                      {spot.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {spot.description}
                    </p>

                    {/* Amenities chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {spot.amenities.slice(0, 3).map((amenity, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </span>
                      ))}
                      {spot.amenities.length > 3 && (
                        <span className="text-[11px] font-medium text-slate-400 px-1 py-0.5">
                          +{spot.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Senior Insider Tip Box */}
                    <div className="bg-amber-50/80 border border-amber-200/70 rounded-xl p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wide">Senior Insider Tip:</div>
                          <p className="text-xs text-amber-900/90 italic leading-relaxed mt-0.5">
                            "{spot.seniorTip}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[130px]" title={spot.timings}>{spot.timings}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigateToMap(spot)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1"
                      >
                        <span>Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => onSelectSpotDetail(spot)}
                        className="text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-all shadow-xs"
                      >
                        Details
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
