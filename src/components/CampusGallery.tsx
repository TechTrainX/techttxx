import React, { useState } from 'react';
import { GALLERY_DATA } from '../data/galleryData';
import { GalleryItem } from '../types';
import { Image as ImageIcon, X, Maximize2 } from 'lucide-react';
import { getOptimizedImageUrl } from '../services/imagekitService';

export const CampusGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Campus & Labs', 'Hackathons', 'Certifications', 'Placement Celebrations'];

  const filteredItems = GALLERY_DATA.filter(
    item => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <section id="gallery" className="py-16 px-4 bg-[#f0f8ff] border-b border-blue-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-[#0066cc] text-xs font-bold uppercase tracking-wider border border-blue-200">
            Life at TechTrainX
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00061a]">
            Campus Labs & <span className="text-[#0066cc]">Hackathon Gallery</span>
          </h2>
          <p className="text-sm text-[#555555]">
            High-speed coding labs, hardware testing workbenches, and student placement celebration moments.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0066cc] text-white shadow-xs'
                  : 'bg-white text-[#333333] hover:bg-blue-50 hover:text-[#0066cc] border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="bg-white rounded-[20px] overflow-hidden border border-blue-100 group cursor-pointer relative shadow-xs hover:shadow-md transition-all"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={getOptimizedImageUrl(item.imageUrl, { width: 800 })}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-white/95 text-[#0066cc] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="text-sm font-bold line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-200 line-clamp-1 font-normal mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="relative max-w-3xl w-full bg-white rounded-[20px] overflow-hidden shadow-2xl p-4 space-y-3">
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-gray-700 hover:bg-gray-100 cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-96 w-full rounded-[14px] overflow-hidden bg-black">
                <img
                  src={getOptimizedImageUrl(activeLightboxItem.imageUrl, { width: 1200 })}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="px-2 pb-2">
                <span className="text-[11px] font-bold text-[#0066cc] uppercase tracking-wider">
                  {activeLightboxItem.category}
                </span>
                <h3 className="text-lg font-bold text-[#00061a] mt-0.5">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs text-[#555] mt-1">
                  {activeLightboxItem.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
