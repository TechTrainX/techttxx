import React, { useState } from 'react';
import { GALLERY_DATA } from '../data/galleryData';
import { GalleryItem } from '../types';
import { Image as ImageIcon, Sparkles, X, Maximize2, Layers } from 'lucide-react';
import { getOptimizedImageUrl } from '../services/imagekitService';

export const CampusGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Campus & Labs', 'Hackathons', 'Certifications', 'Placement Celebrations', 'Industrial Visits'];

  const filteredItems = GALLERY_DATA.filter(
    item => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <section id="gallery" className="py-20 px-4 bg-[#050811] relative border-t border-b border-slate-850">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-inner">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> Production Labs & Hackathon Archives
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Campus Ecosystem <span className="gradient-text-cyan">& Engineering Labs</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            High-density development centers, electronics workbenches, annual 36-hour hackathons, and tier-1 recruitment celebration archives.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-slate-950 font-black shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
                  : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800/90 group cursor-pointer relative bg-slate-900/90 shadow-xl hover:border-cyan-500/40 transition-all"
            >
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <img
                  src={getOptimizedImageUrl(item.imageUrl, { width: 800 })}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="bg-slate-950/90 backdrop-blur-md text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-cyan-500/30">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-2 rounded-xl text-cyan-300 border border-cyan-500/30">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl border border-cyan-500/40 overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6">
              
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer border border-slate-700 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden max-h-[70vh] flex items-center justify-center bg-slate-950 border border-slate-800">
                <img
                  src={activeLightboxItem.imageUrl}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto object-contain rounded-xl"
                />
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <span className="bg-cyan-950 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/40">
                    {activeLightboxItem.category}
                  </span>
                  {activeLightboxItem.date && (
                    <span className="text-xs text-slate-400 font-mono">
                      {activeLightboxItem.date}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-white">{activeLightboxItem.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeLightboxItem.description}</p>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
