'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'practitioners', label: 'Fellow Practitioners' },
    { id: 'treatments', label: 'Treatment Sessions' },
    { id: 'remote', label: 'Remote Sessions' },
    { id: 'team', label: 'Our Team' }
  ];

  // Placeholder data - to be replaced with actual photos
  const galleryItems = [
    {
      id: 1,
      category: 'practitioners',
      title: 'Tesla Table Practitioner - California',
      location: 'San Francisco, CA',
      description: 'Experienced practitioner offering Tesla Wellness Table sessions',
      image: '/images/placeholder-practitioner.jpg',
      contact: 'Contact: (555) 123-4567'
    },
    {
      id: 2,
      category: 'treatments',
      title: 'Tesla Wellness Table Session',
      description: 'Client experiencing the healing frequencies',
      image: '/images/placeholder-treatment.jpg'
    },
    {
      id: 3,
      category: 'remote',
      title: 'Remote Healing Session',
      description: 'Distance healing session documentation',
      image: '/images/placeholder-remote.jpg'
    },
    {
      id: 4,
      category: 'team',
      title: 'Bodhi',
      description: 'Our healing companion',
      image: '/images/placeholder-bodhi.jpg'
    },
    {
      id: 5,
      category: 'team',
      title: 'With Paul and Ash',
      description: 'Collaborative healing work',
      image: '/images/placeholder-team.jpg'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-sage-50">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-inter font-light text-charcoal mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Gallery
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our healing community - from fellow Tesla Table practitioners around the country 
            to treatment sessions and the special moments that make our sanctuary unique.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-terracotta-500 text-white shadow-lg'
                    : 'bg-white/80 text-slate-600 hover:bg-terracotta-100 hover:text-terracotta-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-inter font-medium text-charcoal mb-2">
                    {item.title}
                  </h3>
                  {item.location && (
                    <p className="text-terracotta-500 font-medium mb-2">
                      {item.location}
                    </p>
                  )}
                  <p className="text-slate-600 mb-4">
                    {item.description}
                  </p>
                  {item.contact && (
                    <p className="text-sm text-slate-500 bg-sage-50 px-3 py-2 rounded-lg">
                      {item.contact}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                No photos available in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Upload Section for Admin */}
      <section className="bg-sage-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-inter font-light text-charcoal mb-6">
              Share Your Healing Journey
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Have photos from your Tesla Table sessions or want to connect with other practitioners? 
              We&apos;d love to feature your healing story in our gallery.
            </p>
            <button className="bg-terracotta-500 text-white px-8 py-3 rounded-lg hover:bg-terracotta-600 transition-colors duration-300">
              Contact Us to Share
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}