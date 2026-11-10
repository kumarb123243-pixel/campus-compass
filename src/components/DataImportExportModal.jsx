import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Upload, Download, FileText, CheckCircle2, AlertCircle, 
  RotateCcw, Sparkles, FolderUp, FileSpreadsheet, Eye, Info,
  History, Clock, Plus, Trash2, ArrowRightLeft, Check
} from 'lucide-react';
import { CAMPUS_INFO, CAMPUS_SPOTS } from '../data/campusData';

export default function DataImportExportModal({
  isOpen,
  onClose,
  campusInfo,
  spotsList,
  onImportData,
  onResetData
}) {
  const [activeTab, setActiveTab] = useState('history'); // 'history', 'import', 'export', 'templates'
  const [importMode, setImportMode] = useState('merge'); // 'merge' or 'replace'
  const [fileError, setFileError] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [rawJsonInput, setRawJsonInput] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // New Snapshot Name for saving current project
  const [newSnapshotName, setNewSnapshotName] = useState('');
  const [isSavingSnapshot, setIsSavingSnapshot] = useState(false);

  // Persistent Project List History
  const [projectHistory, setProjectHistory] = useState(() => {
    try {
      const stored = localStorage.getItem('campus_compass_project_history');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    // Default baseline project history
    return [
      {
        id: 'proj-default-apex',
        name: 'Apex Institute of Technology & Science',
        shortName: 'AITS',
        spotsCount: CAMPUS_SPOTS.length,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        campusInfo: CAMPUS_INFO,
        spots: CAMPUS_SPOTS,
        note: 'Default pre-loaded baseline campus directory'
      },
      {
        id: 'proj-sample-mit',
        name: 'MIT World Peace University',
        shortName: 'MIT-WPU',
        spotsCount: 3,
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        campusInfo: {
          name: "MIT World Peace University",
          shortName: "MIT-WPU",
          motto: "Transforming the World with Peace & Innovation",
          campusArea: "100 Acres",
          studentCount: "10,000+",
          emergencyContact: "+91 91234 56789",
          wifiSsid: "MITWPU-SecureStudent"
        },
        spots: [
          {
            id: "sample-spot-1",
            name: "Swami Vivekananda Library",
            category: "library",
            location: "Knowledge Hub, Building 4",
            zone: "Central Hub",
            timings: "7:30 AM - 11:30 PM",
            description: "State-of-the-art multi-tier library with digital repository and silent research cubicles.",
            seniorTip: "Floor 4 has soundproof pods ideal for team prep before symposiums.",
            rating: 4.9,
            reviewsCount: 210,
            visitorFriendly: true,
            amenities: ["Wi-Fi", "AC", "Quiet Zone"]
          },
          {
            id: "sample-spot-2",
            name: "Quantum AI & Robotics Foundry",
            category: "academic",
            location: "Engineering Block C, Floor 1",
            zone: "North Tech Zone",
            timings: "8:00 AM - 9:00 PM",
            description: "Hardware testing benches, NVIDIA GPU clusters, and student robotics arenas.",
            seniorTip: "Lab assistants conduct weekly hands-on ROS and PyTorch workshops.",
            rating: 4.8,
            reviewsCount: 165,
            visitorFriendly: true,
            amenities: ["Dual Monitors", "GPU Cloud", "3D Printers"]
          },
          {
            id: "sample-spot-3",
            name: "Open Sky Amphitheater",
            category: "hangout",
            location: "Near Central Lawn",
            zone: "Central Hub",
            timings: "Open 24/7",
            description: "Tiered open-air auditorium for musical jams, street plays, and relaxing.",
            seniorTip: "Sunset hours between 5:30 PM and 7:00 PM are the best for relaxing with friends.",
            rating: 4.9,
            reviewsCount: 380,
            visitorFriendly: true,
            amenities: ["Open Air Seating", "Stage", "Vending Machines"]
          }
        ],
        note: 'Sample imported university dataset'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('campus_compass_project_history', JSON.stringify(projectHistory));
    } catch (e) {
      console.error(e);
    }
  }, [projectHistory]);

  if (!isOpen) return null;

  // Simple CSV parser supporting quotes
  const parseCSV = (text) => {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) throw new Error("CSV file must contain a header row and at least one data row.");
    
    const parseLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' || char === "'") {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim().replace(/^["']|["']$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^["']|["']$/g, ''));
      return result;
    };

    const headers = parseLine(lines[0]).map(h => h.toLowerCase());
    const spots = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i]);
      if (values.length < headers.length && values.every(v => v === '')) continue;
      
      const row = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });

      const spot = {
        id: `imported-spot-${Date.now()}-${i}`,
        name: row.name || `Imported Spot #${i}`,
        category: row.category || 'academic',
        location: row.location || 'Campus Grounds',
        zone: row.zone || 'Central Hub',
        timings: row.timings || '9:00 AM - 6:00 PM',
        description: row.description || 'Imported campus location.',
        image: row.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
        amenities: row.amenities ? row.amenities.split(/[,;|]/).map(a => a.trim()).filter(Boolean) : ['Wi-Fi'],
        seniorTip: row.seniortip || row.tip || 'Explore this newly imported spot!',
        rating: parseFloat(row.rating) || 4.5,
        reviewsCount: parseInt(row.reviewscount, 10) || 50,
        visitorFriendly: true,
        coordinates: { x: Math.floor(Math.random() * 60) + 20, y: Math.floor(Math.random() * 60) + 20 }
      };
      spots.push(spot);
    }

    return { spots };
  };

  const handleProcessText = (content, filename = 'data') => {
    setFileError(null);
    try {
      if (filename.endsWith('.csv') || (!content.trim().startsWith('{') && !content.trim().startsWith('['))) {
        const result = parseCSV(content);
        setParsedData({
          type: 'csv',
          filename,
          spots: result.spots,
          campusInfo: null
        });
      } else {
        const json = JSON.parse(content);
        if (Array.isArray(json)) {
          setParsedData({
            type: 'json_spots',
            filename,
            spots: json.map((s, idx) => ({
              ...s,
              id: s.id || `imported-spot-${Date.now()}-${idx}`
            })),
            campusInfo: null
          });
        } else if (json.spots || json.campusInfo) {
          setParsedData({
            type: 'json_full',
            filename,
            spots: json.spots || [],
            campusInfo: json.campusInfo || null
          });
        } else if (json.name && json.shortName) {
          setParsedData({
            type: 'json_info',
            filename,
            spots: [],
            campusInfo: json
          });
        } else {
          throw new Error("Unrecognized JSON format. Must contain 'spots' array or 'campusInfo' object.");
        }
      }
    } catch (err) {
      setFileError(err.message || "Failed to parse file. Please verify format.");
      setParsedData(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        handleProcessText(text, file.name);
      }
    };
    reader.onerror = () => {
      setFileError("Error reading selected file.");
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          handleProcessText(text, file.name);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleConfirmImport = () => {
    if (!parsedData) return;

    // Also auto-add to Project History!
    const newProjectHistoryEntry = {
      id: `proj-import-${Date.now()}`,
      name: parsedData.campusInfo?.name || `Imported ${parsedData.filename}`,
      shortName: parsedData.campusInfo?.shortName || 'Import',
      spotsCount: parsedData.spots?.length || spotsList.length,
      createdAt: new Date().toISOString(),
      campusInfo: parsedData.campusInfo || campusInfo,
      spots: parsedData.spots?.length > 0 
        ? (importMode === 'replace' ? parsedData.spots : [...parsedData.spots, ...spotsList]) 
        : spotsList,
      note: `Imported from ${parsedData.filename}`
    };

    setProjectHistory(prev => [newProjectHistoryEntry, ...prev]);

    onImportData({
      spots: parsedData.spots,
      campusInfo: parsedData.campusInfo,
      mode: importMode
    });
    onClose();
  };

  // Save current active state to Project List History
  const handleSaveCurrentToHistory = (e) => {
    e.preventDefault();
    const name = newSnapshotName.trim() || `${campusInfo.name} Snapshot`;
    const newEntry = {
      id: `proj-snapshot-${Date.now()}`,
      name,
      shortName: campusInfo.shortName || 'Custom',
      spotsCount: spotsList.length,
      createdAt: new Date().toISOString(),
      campusInfo: { ...campusInfo },
      spots: [...spotsList],
      note: 'Saved manual snapshot'
    };
    setProjectHistory(prev => [newEntry, ...prev]);
    setNewSnapshotName('');
    setIsSavingSnapshot(false);
  };

  // Load a project from history
  const handleLoadProject = (project) => {
    onImportData({
      spots: project.spots,
      campusInfo: project.campusInfo,
      mode: 'replace'
    });
    onClose();
  };

  // Delete an entry from project history
  const handleDeleteHistoryEntry = (id) => {
    setProjectHistory(prev => prev.filter(p => p.id !== id));
  };

  // Export handlers
  const handleExportJSON = (customData = null) => {
    const payload = customData || {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      campusInfo,
      spots: spotsList
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campus_compass_${payload.campusInfo?.shortName || 'backup'}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const headers = ["name", "category", "location", "zone", "timings", "description", "seniorTip", "amenities", "rating", "reviewsCount"];
    const rows = spotsList.map(spot => [
      `"${(spot.name || '').replace(/"/g, '""')}"`,
      `"${(spot.category || '').replace(/"/g, '""')}"`,
      `"${(spot.location || '').replace(/"/g, '""')}"`,
      `"${(spot.zone || '').replace(/"/g, '""')}"`,
      `"${(spot.timings || '').replace(/"/g, '""')}"`,
      `"${(spot.description || '').replace(/"/g, '""')}"`,
      `"${(spot.seniorTip || '').replace(/"/g, '""')}"`,
      `"${(spot.amenities ? spot.amenities.join('; ') : '').replace(/"/g, '""')}"`,
      spot.rating || 4.5,
      spot.reviewsCount || 0
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campus_spots_${campusInfo.shortName || 'export'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <FolderUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 leading-tight">
                Project History & File Manager
              </h3>
              <p className="text-xs text-slate-500">
                Switch campus projects, import datasets, or manage saved versions
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 px-5 gap-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-indigo-600 text-indigo-700 font-bold bg-white -mb-px rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Project History</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-700 font-bold">
              {projectHistory.length}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('import')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'import'
                ? 'border-indigo-600 text-indigo-700 font-bold bg-white -mb-px rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            Import from File
          </button>
          
          <button
            onClick={() => setActiveTab('export')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'export'
                ? 'border-indigo-600 text-indigo-700 font-bold bg-white -mb-px rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Download className="w-4 h-4" />
            Export Backup
          </button>
          
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'templates'
                ? 'border-indigo-600 text-indigo-700 font-bold bg-white -mb-px rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Templates
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* TAB 0: PROJECT LIST HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              
              {/* Top Action Bar: Save Current Setup */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      Active: {campusInfo.name} ({campusInfo.shortName})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Currently tracking {spotsList.length} spots in your campus directory.
                  </p>
                </div>
                
                {!isSavingSnapshot ? (
                  <button
                    onClick={() => setIsSavingSnapshot(true)}
                    className="py-2 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save Current as Project</span>
                  </button>
                ) : (
                  <form onSubmit={handleSaveCurrentToHistory} className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Project / Campus Snapshot Name"
                      value={newSnapshotName}
                      onChange={(e) => setNewSnapshotName(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-white border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-48"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shrink-0"
                      title="Save"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSavingSnapshot(false)}
                      className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-all shrink-0"
                      title="Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>

              {/* Saved Projects List */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Saved Project History ({projectHistory.length})
                </div>

                {projectHistory.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                    No saved projects found in history. Import a file or save your current setup!
                  </div>
                ) : (
                  projectHistory.map((proj) => {
                    const isActive = proj.name === campusInfo.name;
                    return (
                      <div
                        key={proj.id}
                        className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isActive
                            ? 'bg-emerald-50/40 border-emerald-300 ring-1 ring-emerald-200'
                            : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {proj.name}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              {proj.shortName || 'Custom'}
                            </span>
                            {isActive && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Active
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500">
                            <span>{proj.spotsCount || proj.spots?.length || 0} Spots</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {new Date(proj.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {proj.note && (
                              <>
                                <span>•</span>
                                <span className="italic truncate max-w-[150px]">{proj.note}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          {!isActive && (
                            <button
                              onClick={() => handleLoadProject(proj)}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                            >
                              <ArrowRightLeft className="w-3.5 h-3.5" />
                              <span>Switch to This</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleExportJSON({ campusInfo: proj.campusInfo, spots: proj.spots })}
                            title="Export this project JSON"
                            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 rounded-xl transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteHistoryEntry(proj.id)}
                            title="Remove from history"
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-xl transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}

          {/* TAB 1: IMPORT */}
          {activeTab === 'import' && (
            <div className="space-y-4">
              
              {/* Dropzone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragOver 
                    ? 'border-indigo-500 bg-indigo-50/60 scale-[0.99]' 
                    : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.csv,application/json,text/csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="font-semibold text-slate-800 mb-1">
                  Click to select file or drag & drop here
                </div>
                <p className="text-xs text-slate-500">
                  Supports <span className="font-bold text-slate-700">.JSON</span> (Campus Compass backup or spots array) and <span className="font-bold text-slate-700">.CSV</span> spreadsheets
                </p>
              </div>

              {/* Error Message */}
              {fileError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{fileError}</span>
                </div>
              )}

              {/* Parsed Preview */}
              {parsedData && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Ready to Import: {parsedData.filename}</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      {parsedData.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                    <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Spots Count</span>
                      <span className="text-base font-bold text-slate-900">{parsedData.spots?.length || 0} Spots</span>
                    </div>
                    <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Campus Info</span>
                      <span className="text-base font-bold text-slate-900">
                        {parsedData.campusInfo?.shortName || (parsedData.campusInfo?.name ? 'Included' : 'Unchanged')}
                      </span>
                    </div>
                  </div>

                  {/* Sample items preview */}
                  {parsedData.spots?.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-600 block mb-1">Preview of spots to import:</span>
                      <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
                        {parsedData.spots.slice(0, 4).map((s, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white text-xs border border-slate-100">
                            <span className="font-semibold text-slate-800 truncate mr-2">{s.name}</span>
                            <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md shrink-0">
                              {s.category}
                            </span>
                          </div>
                        ))}
                        {parsedData.spots.length > 4 && (
                          <div className="text-center text-[11px] text-slate-500 italic">
                            ... and {parsedData.spots.length - 4} more spots
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mode Selector */}
                  <div className="pt-2 border-t border-emerald-100/80 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Import Strategy:</span>
                    <div className="flex gap-2">
                      <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="importMode"
                          value="merge"
                          checked={importMode === 'merge'}
                          onChange={() => setImportMode('merge')}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        Merge with existing
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer font-medium text-amber-700">
                        <input
                          type="radio"
                          name="importMode"
                          value="replace"
                          checked={importMode === 'replace'}
                          onChange={() => setImportMode('replace')}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        Replace all current spots
                      </label>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={handleConfirmImport}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Apply & Save to Project History</span>
                  </button>
                </div>
              )}

              {/* Manual JSON Paste option */}
              <div className="pt-3 border-t border-slate-100">
                <details className="group text-xs">
                  <summary className="font-bold text-slate-600 cursor-pointer flex items-center justify-between hover:text-indigo-600 py-1">
                    <span>Or paste raw JSON directly</span>
                    <span className="text-[10px] text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="pt-2 space-y-2">
                    <textarea
                      rows={4}
                      value={rawJsonInput}
                      onChange={(e) => setRawJsonInput(e.target.value)}
                      placeholder='[{"name": "New Innovation Lab", "category": "academic", "location": "Floor 2"}]'
                      className="w-full p-2.5 font-mono text-[11px] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleProcessText(rawJsonInput, 'pasted_data.json')}
                      disabled={!rawJsonInput.trim()}
                      className="py-1.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-semibold disabled:opacity-40 transition-all text-xs"
                    >
                      Parse Pasted JSON
                    </button>
                  </div>
                </details>
              </div>

            </div>
          )}

          {/* TAB 2: EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Export your current campus spots, custom additions, and college branding so you can back them up, share them with peers, or re-import later.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-slate-50/50 hover:bg-indigo-50/30 transition-all flex flex-col justify-between">
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <span>Full Backup (JSON)</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Complete archive including {spotsList.length} spots, college branding ({campusInfo.shortName}), and settings.
                    </p>
                  </div>
                  <button
                    onClick={() => handleExportJSON()}
                    className="py-2.5 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download .JSON Backup</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50/50 hover:bg-emerald-50/30 transition-all flex flex-col justify-between">
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                      <span>Spots Spreadsheet (CSV)</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Export all {spotsList.length} spots as a CSV spreadsheet compatible with Excel, Google Sheets, or Numbers.
                    </p>
                  </div>
                  <button
                    onClick={handleExportCSV}
                    className="py-2.5 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download .CSV File</span>
                  </button>
                </div>
              </div>

              {/* Reset Option */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-800">Reset to Default Data</div>
                  <div className="text-[11px] text-slate-500">Restore factory campus spots and initial settings.</div>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to restore default campus data? Your custom imported spots will be cleared.")) {
                      onResetData();
                      onClose();
                    }
                  }}
                  className="py-2 px-3 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 rounded-xl text-xs font-semibold border border-slate-200 hover:border-rose-200 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SAMPLE TEMPLATES */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  Use these ready-made sample template files to quickly prepare your own campus data. You can download, edit them in any spreadsheet or text editor, and import them right back.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="/samples/campus_compass_backup_sample.json"
                  download="campus_compass_backup_sample.json"
                  className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/20 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Sample JSON Backup</div>
                      <div className="text-[11px] text-slate-500">Full schema with info & spots</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </a>

                <a
                  href="/samples/campus_spots_sample.csv"
                  download="campus_spots_sample.csv"
                  className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-400 bg-white hover:bg-emerald-50/20 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Sample CSV Spreadsheet</div>
                      <div className="text-[11px] text-slate-500">Standard spreadsheet headers</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Campus Compass • Project Manager</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
