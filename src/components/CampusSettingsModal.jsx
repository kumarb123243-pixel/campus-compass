import React, { useState } from 'react';
import { Settings, X, School, Building2, Check, RefreshCw, FolderUp } from 'lucide-react';
import { CAMPUS_INFO } from '../data/campusData';

export default function CampusSettingsModal({ 
  isOpen, 
  onClose, 
  campusInfo, 
  onUpdateCampusInfo,
  onOpenImportExportModal 
}) {
  const [formData, setFormData] = useState({
    name: campusInfo.name,
    shortName: campusInfo.shortName,
    motto: campusInfo.motto,
    campusArea: campusInfo.campusArea,
    studentCount: campusInfo.studentCount,
    wifiSsid: campusInfo.wifiSsid,
    emergencyContact: campusInfo.emergencyContact
  });

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateCampusInfo(formData);
    onClose();
  };

  const presetColleges = [
    {
      name: "Apex Institute of Technology & Science",
      shortName: "AITS",
      motto: "Knowledge, Innovation & Excellence",
      campusArea: "120 Acres",
      studentCount: "8,500+"
    },
    {
      name: "Indian Institute of Technology",
      shortName: "IIT",
      motto: "Dedicated to the Service of the Nation",
      campusArea: "550 Acres",
      studentCount: "12,000+"
    },
    {
      name: "National Institute of Technology",
      shortName: "NIT",
      motto: "Engineering the Future",
      campusArea: "320 Acres",
      studentCount: "9,000+"
    },
    {
      name: "Stanford University",
      shortName: "Stanford",
      motto: "The Wind of Freedom Blows",
      campusArea: "8,180 Acres",
      studentCount: "17,000+"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 leading-tight">
                College Campus Branding
              </h3>
              <p className="text-xs text-slate-500">
                Customize this app for your college or hackathon demo
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs sm:text-sm overflow-y-auto max-h-[70vh]">
          
          {/* File Import & Export Prompt */}
          {onOpenImportExportModal && (
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <FolderUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">Import or Backup from Files</div>
                  <div className="text-[11px] text-slate-500">Upload JSON/CSV files or export data</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenImportExportModal();
                }}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
              >
                File Manager
              </button>
            </div>
          )}

          {/* Preset 1-Click Pickers */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Quick Presets:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presetColleges.map((col, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    name: col.name,
                    shortName: col.shortName,
                    motto: col.motto,
                    campusArea: col.campusArea,
                    studentCount: col.studentCount
                  }))}
                  className="p-2.5 rounded-xl border border-slate-200 text-left hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-xs"
                >
                  <div className="font-bold text-slate-900">{col.shortName}</div>
                  <div className="text-[11px] text-slate-500 truncate">{col.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Full University / College Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Code</label>
                <input
                  type="text"
                  required
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Campus Area</label>
                <input
                  type="text"
                  value={formData.campusArea}
                  onChange={(e) => setFormData({ ...formData, campusArea: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Campus Motto / Tagline</label>
              <input
                type="text"
                value={formData.motto}
                onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Student Wi-Fi SSID</label>
              <input
                type="text"
                value={formData.wifiSsid}
                onChange={(e) => setFormData({ ...formData, wifiSsid: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Apply & Rebrand Website</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
