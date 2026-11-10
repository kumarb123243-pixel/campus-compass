import React, { useState } from 'react';
import { PlusCircle, X, Sparkles, MapPin, Check, Camera, MessageSquare } from 'lucide-react';

export default function AddSpotModal({ isOpen, onClose, onAddSpot }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'hangout',
    zone: 'Central Hub',
    location: '',
    description: '',
    seniorTip: '',
    amenities: 'Wi-Fi, Quiet, Charging',
    rating: 5.0
  });

  const [imageOption, setImageOption] = useState(
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'
  );

  const sampleImages = [
    { label: 'Study Spot', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80' },
    { label: 'Campus Garden', url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80' },
    { label: 'Cafe / Hangout', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' },
    { label: 'Tech Lab', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' }
  ];

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim()) return;

    const newSpot = {
      id: `spot-custom-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      location: formData.location,
      zone: formData.zone,
      timings: "Open daily for students",
      description: formData.description || "A student-recommended spot on campus.",
      image: imageOption,
      amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean),
      seniorTip: formData.seniorTip || "Discovered and verified by students.",
      rating: 4.9,
      reviewsCount: 1,
      visitorFriendly: true,
      coordinates: { x: 50, y: 50 }
    };

    onAddSpot(newSpot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 leading-tight">
                Submit a Secret Campus Spot or Tip
              </h3>
              <p className="text-xs text-slate-500">
                Help freshers discover hidden gems, quiet corners, and budget eats
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
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
          
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Spot Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 4th Floor Sky Lounge, Hidden Coffee Kiosk"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="hangout">🌳 Hangout & Chill</option>
                <option value="library">📚 Study & Quiet</option>
                <option value="academic">💻 Tech & Labs</option>
                <option value="sports">⚽ Sports & Fitness</option>
                <option value="admin">🏛️ Services & Admin</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Campus Zone</label>
              <select
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Central Hub">Central Hub</option>
                <option value="North Tech Zone">North Tech Zone</option>
                <option value="South Sports Hub">South Sports Hub</option>
                <option value="Main Gate Zone">Main Gate Zone</option>
                <option value="Residential Zone">Residential Zone</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Exact Location / Landmark *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Behind Mechanical Workshop, near Water Cooler #2"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Senior Insider Hack / Pro Tip
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Plugs are active on the east wall; best to visit between 3 PM and 5 PM..."
              value={formData.seniorTip}
              onChange={(e) => setFormData({ ...formData, seniorTip: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="What makes this place special for students or visitors?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Select a Cover Photo Style
            </label>
            <div className="grid grid-cols-4 gap-2">
              {sampleImages.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImageOption(img.url)}
                  className={`relative rounded-xl overflow-hidden h-16 border-2 transition-all ${
                    imageOption === img.url
                      ? 'border-indigo-600 ring-2 ring-indigo-400/50 scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center py-0.5">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-bold shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Publish Spot to Campus Directory</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
