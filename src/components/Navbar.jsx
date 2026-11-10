import React from 'react';
import { Compass, Sparkles, MapPin, Utensils, Users, BookOpen, Bookmark, PlusCircle, Settings, School, FolderUp } from 'lucide-react';

export default function Navbar({ 
  audienceMode, 
  setAudienceMode, 
  activeTab, 
  setActiveTab, 
  savedItemsCount, 
  campusInfo,
  onOpenSavedModal,
  onOpenAIModal,
  onOpenAddSpotModal,
  onOpenSettingsModal,
  onOpenImportExportModal
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & College Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('spots')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">
                CampusCompass
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSettingsModal();
                }}
                className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200 transition-all cursor-pointer"
                title="Click to customize college branding"
              >
                {campusInfo.shortName} Guide ⚙️
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('spots')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                activeTab === 'spots'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Campus Spots
            </button>

            <button
              onClick={() => setActiveTab('food')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                activeTab === 'food'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Utensils className="w-4 h-4" />
              Food Radar
            </button>

            <button
              onClick={() => setActiveTab('clubs')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                activeTab === 'clubs'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              Clubs & Events
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                activeTab === 'map'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              Interactive Map
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                activeTab === 'guide'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Survival Guide
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Audience Toggle (Fresher vs Visitor) */}
            <div className="hidden xl:flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setAudienceMode('fresher')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                  audienceMode === 'fresher'
                    ? 'bg-white text-indigo-700 font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎒 Fresher
              </button>
              <button
                onClick={() => setAudienceMode('visitor')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                  audienceMode === 'visitor'
                    ? 'bg-white text-indigo-700 font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🏛️ Visitor
              </button>
            </div>

            {/* Add Spot Button */}
            <button
              onClick={onOpenAddSpotModal}
              title="Submit a secret spot or senior tip"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold px-2.5 py-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-all"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>Add Spot</span>
            </button>

            {/* Project History & Files Button */}
            <button
              onClick={onOpenImportExportModal}
              title="Project History, Saved Campuses & File Manager"
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-all"
            >
              <FolderUp className="w-4 h-4 text-indigo-600" />
              <span className="hidden xl:inline">Projects & Files</span>
            </button>

            {/* Settings button */}
            <button
              onClick={onOpenSettingsModal}
              title="Customize College Branding"
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl border border-slate-200 transition-all"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Saved Itinerary button */}
            <button
              onClick={onOpenSavedModal}
              title="View your saved itinerary"
              className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-slate-200"
            >
              <Bookmark className="w-4 h-4" />
              {savedItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white rounded-full text-xs font-bold flex items-center justify-center animate-bounce">
                  {savedItemsCount}
                </span>
              )}
            </button>

            {/* Ask Senior AI button */}
            <button
              onClick={onOpenAIModal}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Ask Senior AI</span>
              <span className="sm:hidden">Senior AI</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs font-medium text-slate-600 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('spots')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'spots' ? 'bg-indigo-100 text-indigo-700 font-bold' : ''
            }`}
          >
            📍 Spots
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'food' ? 'bg-indigo-100 text-indigo-700 font-bold' : ''
            }`}
          >
            🍔 Food
          </button>
          <button
            onClick={() => setActiveTab('clubs')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'clubs' ? 'bg-indigo-100 text-indigo-700 font-bold' : ''
            }`}
          >
            🎯 Clubs
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'map' ? 'bg-indigo-100 text-indigo-700 font-bold' : ''
            }`}
          >
            🗺️ Map
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'guide' ? 'bg-indigo-100 text-indigo-700 font-bold' : ''
            }`}
          >
            💡 Guide
          </button>
          <button
            onClick={onOpenAddSpotModal}
            className="px-2 py-1.5 rounded-lg text-indigo-600 font-bold border border-indigo-200 whitespace-nowrap"
          >
            + Add
          </button>
          <button
            onClick={onOpenImportExportModal}
            className="px-2 py-1.5 rounded-lg text-slate-700 font-bold border border-slate-200 whitespace-nowrap bg-slate-50"
          >
            📁 Projects
          </button>
        </div>
      </div>
    </header>
  );
}
