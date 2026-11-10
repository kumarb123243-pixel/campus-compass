import React, { useState } from 'react';
import { FOOD_SPOTS } from '../data/campusData';
import { Utensils, Coffee, Clock, Sparkles, Star, Bookmark, Flame, DollarSign, Users, CheckCircle, Info } from 'lucide-react';

export default function FoodRadar({ 
  searchQuery, 
  savedItems, 
  onToggleSave 
}) {
  const [foodFilter, setFoodFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');

  const filteredFood = FOOD_SPOTS.filter(spot => {
    const matchesCategory = foodFilter === 'all' || 
      (foodFilter === 'canteen' && spot.category === 'canteen') ||
      (foodFilter === 'cafe' && spot.category === 'cafe') ||
      (foodFilter === 'night' && spot.category === 'street');

    const matchesBudget = budgetFilter === 'all' || spot.budget === budgetFilter;

    const matchesSearch = searchQuery.trim() === '' ||
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.mustTry.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesBudget && matchesSearch;
  });

  const getRushBadge = (rush) => {
    if (rush.toLowerCase().includes('low')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Low Rush Now</span>
        </span>
      );
    }
    if (rush.toLowerCase().includes('moderate')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>Moderate Crowd</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
        <Flame className="w-3.5 h-3.5 text-purple-600" />
        <span>Night Rush</span>
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm uppercase tracking-wider mb-1">
            <Utensils className="w-4 h-4" />
            <span>Campus Foodie Radar</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Where & What to Eat on Campus
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            From ₹15 midnight chai to gourmet paninis. Tested and recommended by seniors.
          </p>
        </div>

        {/* Budget Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold uppercase">Budget:</span>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setBudgetFilter('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                budgetFilter === 'all' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setBudgetFilter('₹')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                budgetFilter === '₹' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Under ₹60"
            >
              ₹ (&lt;₹60)
            </button>
            <button
              onClick={() => setBudgetFilter('₹₹')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                budgetFilter === '₹₹' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="₹60 to ₹150"
            >
              ₹₹ (₹60-150)
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <button
          onClick={() => setFoodFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            foodFilter === 'all'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          🍽️ All Eateries
        </button>
        <button
          onClick={() => setFoodFilter('canteen')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            foodFilter === 'canteen'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          🍱 Mess & Main Canteens
        </button>
        <button
          onClick={() => setFoodFilter('cafe')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            foodFilter === 'cafe'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          ☕ Coffee & Quick Cafes
        </button>
        <button
          onClick={() => setFoodFilter('night')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            foodFilter === 'night'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          🌙 Night Owls (Till 2:30 AM)
        </button>
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFood.map(spot => {
          const isSaved = savedItems.some(item => item.id === spot.id);

          return (
            <div
              key={spot.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {spot.location}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {spot.dietary}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {spot.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => onToggleSave(spot, 'food')}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isSaved
                        ? 'bg-amber-500 border-amber-500 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-amber-600'
                    }`}
                    title={isSaved ? "Remove from my plan" : "Save this eatery"}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Status Bar */}
                <div className="flex flex-wrap items-center gap-3 py-2.5 border-y border-slate-100 mb-4 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold text-slate-900">{spot.rating}</span>
                    <span className="text-slate-400">({spot.reviewsCount})</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{spot.timings}</span>
                  </div>

                  <div className="ml-auto">
                    {getRushBadge(spot.currentRush)}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                  {spot.description}
                </p>

                {/* Must-Try Dishes Box */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>Must-Try Signature Items</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">Prices in ₹</span>
                  </div>

                  <div className="space-y-2">
                    {spot.mustTry.map((dish, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/60 shadow-2xs hover:border-amber-300 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-xs sm:text-sm font-semibold text-slate-800">{dish.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded-md border border-amber-200">
                            {dish.tag}
                          </span>
                        </div>
                        <span className="text-xs font-black text-indigo-700">{dish.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Senior Insider Tip */}
                <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-emerald-900 uppercase">Senior Tip: </span>
                      <span className="text-xs text-emerald-900 italic">
                        "{spot.seniorTip}"
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
