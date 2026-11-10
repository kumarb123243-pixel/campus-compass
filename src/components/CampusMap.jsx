import React, { useState } from 'react';
import { CAMPUS_SPOTS, FOOD_SPOTS } from '../data/campusData';
import { MapPin, Navigation, Compass, Star, Clock, Sparkles, Footprints, Layers, ArrowRight, Route, CheckCircle2 } from 'lucide-react';

export default function CampusMap({ spots = CAMPUS_SPOTS, highlightedSpot, onSelectSpot }) {
  const currentSpots = spots && spots.length > 0 ? spots : CAMPUS_SPOTS;
  const [selectedPin, setSelectedPin] = useState(highlightedSpot || currentSpots[0]);
  const [mapLayer, setMapLayer] = useState('all'); // 'all', 'academic', 'food', 'sports'

  // Route finder state
  const [startPoint, setStartPoint] = useState('gate-1');
  const [endPoint, setEndPoint] = useState(highlightedSpot?.id || currentSpots[0]?.id || 'spot-1');
  const [showRoute, setShowRoute] = useState(false);

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'library': return 'bg-indigo-600';
      case 'academic': return 'bg-blue-600';
      case 'hangout': return 'bg-emerald-600';
      case 'sports': return 'bg-amber-600';
      case 'admin': return 'bg-purple-600';
      default: return 'bg-cyan-600';
    }
  };

  // Pin coordinates on a 100x100 grid (dynamic from spots)
  const pins = currentSpots.map((spot, idx) => ({
    ...spot,
    x: spot.coordinates?.x ?? ((idx * 23 + 15) % 70 + 15),
    y: spot.coordinates?.y ?? ((idx * 31 + 20) % 70 + 15),
    type: spot.category || 'academic',
    color: getCategoryColor(spot.category)
  }));

  const locationsForSelect = [
    { id: 'gate-1', name: 'Main Gate & Entrance Quad', x: 15, y: 70 },
    ...pins
  ];

  const filteredPins = pins.filter(pin => {
    if (mapLayer === 'all') return true;
    if (mapLayer === 'academic') return pin.type === 'academic' || pin.type === 'library';
    if (mapLayer === 'sports') return pin.type === 'sports';
    if (mapLayer === 'admin') return pin.type === 'admin';
    return true;
  });

  const currentDestination = pins.find(p => p.id === endPoint) || pins[0];

  const getRouteDetails = () => {
    return {
      distance: '340 meters',
      time: '4.5 mins walk',
      calories: '28 kcal',
      steps: [
        'Start at Main Entrance Arch and head northeast past Admin Block',
        'Walk through the shaded path alongside Pine Grove garden (120m)',
        'Arrive at the destination entrance on your right'
      ]
    };
  };

  const routeDetails = getRouteDetails();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Interactive Campus Wayfinder</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Campus Wayfinding & Navigation Map
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Click pins to inspect places or generate turn-by-turn walking directions across campus.
          </p>
        </div>

        {/* Map Layers */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setMapLayer('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mapLayer === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Pins
          </button>
          <button
            onClick={() => setMapLayer('academic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mapLayer === 'academic' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Academic & Labs
          </button>
          <button
            onClick={() => setMapLayer('sports')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mapLayer === 'sports' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Sports & Chill
          </button>
          <button
            onClick={() => setMapLayer('admin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mapLayer === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Admin & Health
          </button>
        </div>
      </div>

      {/* Quick Route Generator Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1.5">
            <Route className="w-4 h-4 text-indigo-600" />
            <span>Directions:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-normal">From:</span>
            <select
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
            >
              <option value="gate-1">🚪 Main Entrance Gate 1</option>
              <option value="spot-5">🏛️ Administrative Block</option>
              <option value="spot-1">📚 Central Library</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-normal">To:</span>
            <select
              value={endPoint}
              onChange={(e) => {
                setEndPoint(e.target.value);
                const found = pins.find(p => p.id === e.target.value);
                if (found) setSelectedPin(found);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
            >
              {pins.map(pin => (
                <option key={pin.id} value={pin.id}>
                  📍 {pin.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowRoute(!showRoute)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
            showRoute
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{showRoute ? 'Showing Live Route' : 'Find Best Walking Path'}</span>
        </button>
      </div>

      {/* Main Map + Detail Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Map Visualizer */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-xl relative min-h-[480px] overflow-hidden flex flex-col justify-between">
          
          {/* Map Top Bar */}
          <div className="flex items-center justify-between z-10 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">Live Campus Wayfinder</span>
              {showRoute && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/40">
                  Route Active
                </span>
              )}
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              GPS: 13.0827° N, 80.2707° E
            </div>
          </div>

          {/* Graphical Map Campus Canvas */}
          <div className="relative w-full h-[400px] my-4 rounded-2xl overflow-hidden bg-radial from-slate-800 via-slate-900 to-slate-950 border border-slate-800/80">
            
            {/* Campus Grid Walkways */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="campus-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#campus-grid)" />
              
              {/* Campus Walkways */}
              <path d="M 120 320 L 220 280 L 360 210 L 520 180 L 680 240" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="4" strokeDasharray="6 6" fill="none" />
              <path d="M 220 280 L 260 120 L 320 90" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="4" strokeDasharray="6 6" fill="none" />
              <path d="M 360 210 L 450 320 L 620 350" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="4" strokeDasharray="6 6" fill="none" />

              {/* Animated Route Path when route is active */}
              {showRoute && (
                <path
                  d="M 120 320 Q 240 260 360 210"
                  stroke="#38bdf8"
                  strokeWidth="5"
                  strokeDasharray="8 8"
                  className="animate-pulse"
                  fill="none"
                />
              )}
            </svg>

            {/* Zone Labels */}
            <div className="absolute top-6 left-8 text-xs font-black tracking-widest text-slate-700 uppercase pointer-events-none">
              [North Tech Zone]
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-black tracking-widest text-slate-700 uppercase pointer-events-none">
              [Central Academic Quad]
            </div>
            <div className="absolute bottom-6 right-8 text-xs font-black tracking-widest text-slate-700 uppercase pointer-events-none">
              [South Sports Complex]
            </div>
            <div className="absolute bottom-8 left-8 text-xs font-black tracking-widest text-slate-700 uppercase pointer-events-none">
              [Main Gate & Admin]
            </div>

            {/* Main Entrance Pin */}
            <div
              style={{ top: '80%', left: '15%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-800 text-white z-20 flex items-center justify-center border border-white/20 shadow-md"
              title="Main Gate Entrance"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-[10px] font-black flex items-center justify-center">
                IN
              </span>
            </div>

            {/* Render Campus Pins */}
            {filteredPins.map(pin => {
              const isSelected = selectedPin?.id === pin.id;
              const isDestination = endPoint === pin.id;

              return (
                <button
                  key={pin.id}
                  onClick={() => {
                    setSelectedPin(pin);
                    setEndPoint(pin.id);
                  }}
                  style={{ top: `${pin.y}%`, left: `${pin.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all group z-20 ${
                    isSelected
                      ? 'scale-125 ring-4 ring-indigo-400 bg-white text-indigo-900 shadow-2xl'
                      : 'hover:scale-110 bg-slate-800 text-white hover:bg-white hover:text-slate-900'
                  }`}
                  title={pin.name}
                >
                  <div className={`w-7 h-7 rounded-full ${pin.color} text-white flex items-center justify-center text-xs font-bold shadow-md`}>
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Tooltip on Hover */}
                  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/90 text-[11px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    {pin.name}
                  </span>
                </button>
              );
            })}

          </div>

          {/* Map Footer Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Academic & Labs
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Library
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Hangouts
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Sports
              </span>
            </div>
            <span className="text-[11px] text-slate-500">Tap pin to view info & directions</span>
          </div>

        </div>

        {/* Selected Spot / Route Details Panel */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md flex flex-col justify-between">
          
          {showRoute ? (
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Walking Route Active</h3>
                    <p className="text-[11px] text-slate-500">To {selectedPin?.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRoute(false)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Close Route
                </button>
              </div>

              {/* Route Stat Badges */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Distance</div>
                  <div className="text-xs font-black text-slate-800">{routeDetails.distance}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Time</div>
                  <div className="text-xs font-black text-emerald-600">{routeDetails.time}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Burn</div>
                  <div className="text-xs font-black text-amber-600">{routeDetails.calories}</div>
                </div>
              </div>

              {/* Turn-by-Turn Steps */}
              <div className="space-y-3 mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Turn-by-turn Navigation Steps:
                </span>
                {routeDetails.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-900">
                <span className="font-bold">Senior Shortcut Tip:</span> Use the shaded Pine Grove walkway to avoid direct sunlight in the afternoon.
              </div>
            </div>
          ) : selectedPin ? (
            <div>
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img
                  src={selectedPin.image}
                  alt={selectedPin.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-indigo-800 shadow-xs uppercase tracking-wide">
                    {selectedPin.zone}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-xs font-semibold text-indigo-200">{selectedPin.location}</div>
                  <div className="text-base font-bold">{selectedPin.name}</div>
                </div>
              </div>

              {/* Timings & Rating */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 mb-4 text-xs font-medium">
                <div className="flex items-center gap-1 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{selectedPin.timings}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{selectedPin.rating}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {selectedPin.description}
              </p>

              {/* Walking Estimation */}
              <div className="bg-indigo-50/70 rounded-2xl p-3 border border-indigo-100 mb-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-indigo-900 font-semibold">
                  <Footprints className="w-4 h-4 text-indigo-600" />
                  <span>From Main Gate:</span>
                </div>
                <span className="font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-lg border border-indigo-200">
                  ~4 mins walk (260m)
                </span>
              </div>

              {/* Senior tip */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 mb-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-900/90 italic">
                    "{selectedPin.seniorTip}"
                  </p>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1.5">
                {selectedPin.amenities.map((amenity, idx) => (
                  <span 
                    key={idx}
                    className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              Select any spot on the map to inspect
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => setShowRoute(!showRoute)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>{showRoute ? 'View Spot Details' : 'Calculate Walking Route'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
