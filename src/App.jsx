import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpotsExplorer from './components/SpotsExplorer';
import FoodRadar from './components/FoodRadar';
import ClubsEvents from './components/ClubsEvents';
import CampusMap from './components/CampusMap';
import SurvivalGuide from './components/SurvivalGuide';
import SeniorAIAssistant from './components/SeniorAIAssistant';
import TourPlannerModal from './components/TourPlannerModal';
import SpotDetailModal from './components/SpotDetailModal';
import AddSpotModal from './components/AddSpotModal';
import CampusSettingsModal from './components/CampusSettingsModal';
import DataImportExportModal from './components/DataImportExportModal';
import Footer from './components/Footer';
import { CAMPUS_INFO, CAMPUS_SPOTS } from './data/campusData';
import { Sparkles, Compass, CheckCircle } from 'lucide-react';

export default function App() {
  const [audienceMode, setAudienceMode] = useState('fresher'); // 'fresher' or 'visitor'
  const [activeTab, setActiveTab] = useState('spots'); // 'spots', 'food', 'clubs', 'map', 'guide'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dynamic customizable campus information
  const [campusInfo, setCampusInfo] = useState(() => {
    try {
      const stored = localStorage.getItem('campus_compass_info');
      return stored ? JSON.parse(stored) : CAMPUS_INFO;
    } catch {
      return CAMPUS_INFO;
    }
  });

  // Dynamic spots list (including student-contributed spots)
  const [spotsList, setSpotsList] = useState(() => {
    try {
      const stored = localStorage.getItem('campus_compass_spots');
      return stored ? JSON.parse(stored) : CAMPUS_SPOTS;
    } catch {
      return CAMPUS_SPOTS;
    }
  });

  // Persistent saved items for the personalized itinerary
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const stored = localStorage.getItem('campus_compass_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isAddSpotModalOpen, setIsAddSpotModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedSpotDetail, setSelectedSpotDetail] = useState(null);
  const [highlightedMapSpot, setHighlightedMapSpot] = useState(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  useEffect(() => {
    try {
      localStorage.setItem('campus_compass_saved', JSON.stringify(savedItems));
    } catch (e) {
      console.error(e);
    }
  }, [savedItems]);

  useEffect(() => {
    try {
      localStorage.setItem('campus_compass_info', JSON.stringify(campusInfo));
    } catch (e) {
      console.error(e);
    }
  }, [campusInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('campus_compass_spots', JSON.stringify(spotsList));
    } catch (e) {
      console.error(e);
    }
  }, [spotsList]);

  const handleToggleSave = (item, type = 'spot') => {
    setSavedItems(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (exists) {
        showToast(`Removed "${item.name}" from your itinerary`);
        return prev.filter(i => i.id !== item.id);
      } else {
        showToast(`Added "${item.name}" to your itinerary!`);
        return [...prev, { ...item, savedType: type }];
      }
    });
  };

  const handleRemoveSaved = (id) => {
    setSavedItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearSaved = () => {
    setSavedItems([]);
    showToast("Cleared your saved checklist");
  };

  const handleAddCustomSpot = (newSpot) => {
    setSpotsList(prev => [newSpot, ...prev]);
    showToast(`"${newSpot.name}" published to Campus Directory!`);
    setActiveTab('spots');
  };

  const handleUpdateCampusInfo = (newInfo) => {
    setCampusInfo(newInfo);
    showToast(`Rebranded site to ${newInfo.name}!`);
  };

  const handleImportData = ({ spots, campusInfo: newCampusInfo, mode }) => {
    if (newCampusInfo) {
      setCampusInfo(prev => ({ ...prev, ...newCampusInfo }));
    }
    if (spots && spots.length > 0) {
      if (mode === 'replace') {
        setSpotsList(spots);
        showToast(`Replaced campus directory with ${spots.length} imported spots!`);
      } else {
        setSpotsList(prev => {
          const existingIds = new Set(prev.map(s => s.id));
          const newSpots = spots.filter(s => !existingIds.has(s.id));
          return [...newSpots, ...prev];
        });
        showToast(`Imported ${spots.length} spots into Campus Directory!`);
      }
    } else if (newCampusInfo) {
      showToast(`Updated college branding to ${newCampusInfo.name || newCampusInfo.shortName}!`);
    }
  };

  const handleResetData = () => {
    try {
      localStorage.removeItem('campus_compass_spots');
      localStorage.removeItem('campus_compass_info');
      localStorage.removeItem('campus_compass_saved');
    } catch (e) {
      console.error(e);
    }
    setSpotsList(CAMPUS_SPOTS);
    setCampusInfo(CAMPUS_INFO);
    setSavedItems([]);
    showToast("Restored factory default campus configuration!");
  };

  const handleNavigateToMap = (spot) => {
    setHighlightedMapSpot(spot);
    setActiveTab('map');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleTagSearch = (tagQuery) => {
    setSearchQuery(tagQuery);
    if (tagQuery === 'coffee' || tagQuery === 'thali') {
      setActiveTab('food');
    } else if (tagQuery === 'coding') {
      setActiveTab('clubs');
    } else if (tagQuery === 'wifi') {
      setActiveTab('guide');
    } else {
      setActiveTab('spots');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        audienceMode={audienceMode}
        setAudienceMode={setAudienceMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedItemsCount={savedItems.length}
        campusInfo={campusInfo}
        onOpenSavedModal={() => setIsTourModalOpen(true)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onOpenAddSpotModal={() => setIsAddSpotModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenImportExportModal={() => setIsImportModalOpen(true)}
      />

      {/* Hero with Global Search, Tags & Live College Info */}
      <Hero
        audienceMode={audienceMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        campusInfo={campusInfo}
        onSelectTag={handleTagSearch}
        onOpenTourModal={() => setIsTourModalOpen(true)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
      />

      {/* Active Main View Content */}
      <main className="flex-1 pb-16">
        {activeTab === 'spots' && (
          <SpotsExplorer
            spots={spotsList}
            searchQuery={searchQuery}
            savedItems={savedItems}
            onToggleSave={handleToggleSave}
            onSelectSpotDetail={(spot) => setSelectedSpotDetail(spot)}
            onNavigateToMap={handleNavigateToMap}
            onOpenAddSpotModal={() => setIsAddSpotModalOpen(true)}
            onOpenImportExportModal={() => setIsImportModalOpen(true)}
          />
        )}

        {activeTab === 'food' && (
          <FoodRadar
            searchQuery={searchQuery}
            savedItems={savedItems}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'clubs' && (
          <ClubsEvents
            searchQuery={searchQuery}
            onRSVP={(eventName) => showToast(`Registered for ${eventName}!`)}
          />
        )}

        {activeTab === 'map' && (
          <CampusMap
            spots={spotsList}
            highlightedSpot={highlightedMapSpot}
            onSelectSpot={(spot) => setSelectedSpotDetail(spot)}
          />
        )}

        {activeTab === 'guide' && (
          <SurvivalGuide
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Floating Senior AI Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="group flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm px-4 py-3 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
          title="Chat with Senior AI Buddy"
        >
          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-amber-300">
            <Sparkles className="w-4 h-4 animate-spin [animation-duration:4s]" />
          </div>
          <span className="hidden sm:inline">Ask Senior AI</span>
          <span className="sm:hidden">Senior AI</span>
        </button>
      </div>

      {/* Modals */}
      <SeniorAIAssistant
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />

      <TourPlannerModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        savedItems={savedItems}
        onRemoveSaved={handleRemoveSaved}
        onClearSaved={handleClearSaved}
      />

      <AddSpotModal
        isOpen={isAddSpotModalOpen}
        onClose={() => setIsAddSpotModalOpen(false)}
        onAddSpot={handleAddCustomSpot}
      />

      <CampusSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        campusInfo={campusInfo}
        onUpdateCampusInfo={handleUpdateCampusInfo}
        onOpenImportExportModal={() => setIsImportModalOpen(true)}
      />

      <DataImportExportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        campusInfo={campusInfo}
        spotsList={spotsList}
        onImportData={handleImportData}
        onResetData={handleResetData}
      />

      <SpotDetailModal
        spot={selectedSpotDetail}
        isOpen={!!selectedSpotDetail}
        onClose={() => setSelectedSpotDetail(null)}
        isSaved={selectedSpotDetail ? savedItems.some(i => i.id === selectedSpotDetail.id) : false}
        onToggleSave={handleToggleSave}
        onNavigate={handleNavigateToMap}
      />

      {/* Footer */}
      <Footer
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onSelectTab={setActiveTab}
      />

    </div>
  );
}
