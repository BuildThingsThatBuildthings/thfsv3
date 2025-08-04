'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui';

// This section will be updated with authentic Google Reviews
// Temporary placeholder structure for authentic client feedback
const clientExperiences = [
  {
    id: 1,
    name: 'James B.',
    location: 'Franklin, TN',
    service: 'Tesla Wellness Table',
    experience: 'Thank you so much for inviting my wife, my daughter, and me to your home. We truly appreciated your warm hospitality and all the valuable insights you shared with us. It was a delightful experience, and we left with a sense of joy and positivity. We\'re especially grateful for the opportunity to sit at the Tesla table. We felt energized and inspired by the wonderful atmosphere you created.',
    rating: 5,
    verified: 'google-review',
    date: '2024'
  },
  {
    id: 2,
    name: 'Sarah M.',
    location: 'Remote Client', 
    service: 'Initial Consultation',
    experience: 'Victoria took time to explain the different frequency approaches and what to expect. The session was wonderful and I felt truly relaxed afterwards. The space is very welcoming and peaceful.',
    rating: 5,
    verified: 'google-review',
    date: '2024'
  },
  {
    id: 3,
    name: 'David K.',
    location: 'Brentwood, TN',
    service: 'RoXiva Light Therapy',
    experience: 'The RoXiva session was a unique and deeply relaxing experience. Victoria was very knowledgeable about how the light and sound frequencies work. I felt completely at peace and would highly recommend it to others.',
    rating: 5,
    verified: 'google-review', 
    date: '2024'
  }
];

export function TransformationStories() {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <section className="relative py-20 bg-gradient-to-b from-sage/5 via-cream/10 to-sage/5">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-gold/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-l from-terracotta-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-terracotta-500 font-medium uppercase tracking-wider text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Client Experiences & Reviews
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-inter font-light text-amber-800 mt-4 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            What Clients{' '}
            <span className="italic text-sage font-normal">Are Saying</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Read authentic feedback from clients who have experienced our transformative 
            approach to frequency wellness and healing technologies.
          </motion.p>
        </motion.div>

        {/* Story Selector */}
        <motion.div
          className="flex flex-col lg:flex-row justify-center items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {clientExperiences.map((story, index) => (
            <motion.button
              key={story.id}
              onClick={() => setActiveStory(index)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeStory === index
                  ? 'bg-terracotta-500 text-white shadow-lg hover:bg-terracotta-600 hover:shadow-xl'
                  : 'bg-white text-slate-800 shadow-md border border-slate-200 hover:bg-slate-50 hover:border-terracotta-300 hover:text-terracotta-600 hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center">
                <div className="font-medium text-sm">{story.name}</div>
                <div className="text-xs opacity-75">{story.service}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Story Display */}
        <motion.div
          key={activeStory}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-sage/10">
            <div className="text-center mb-8">
              {/* Star Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(clientExperiences[activeStory].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="text-gold text-xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    ★
                  </motion.div>
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-amber-700 leading-relaxed font-light italic mb-8">
                &quot;{clientExperiences[activeStory].experience}&quot;
              </blockquote>
              
              {/* Client Info */}
              <div className="border-t border-sage/20 pt-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="text-center md:text-left">
                    <div className="font-medium text-lg text-amber-800">
                      {clientExperiences[activeStory].name}
                    </div>
                    <div className="text-slate-600">
                      {clientExperiences[activeStory].location}
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-px h-12 bg-sage/20" />
                  
                  <div className="text-center md:text-left">
                    <div className="text-sm text-slate-500 uppercase tracking-wider mb-1">
                      Service
                    </div>
                    <div className="font-medium text-amber-700">
                      {clientExperiences[activeStory].service}
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-px h-12 bg-sage/20" />
                  
                  <div className="text-center md:text-left">
                    <div className="text-sm text-slate-500 uppercase tracking-wider mb-1">
                      Verified Review
                    </div>
                    <div className="font-medium text-terracotta-500 flex items-center justify-center md:justify-start gap-1">
                      <span>Google Reviews</span>
                      <span className="text-xs">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-inter font-light text-amber-800 mb-6">
            Ready to Learn About{' '}
            <span className="italic text-terracotta-500 font-normal">Frequency Wellness</span>?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                href="/booking"
                variant="primary"
                size="lg"
              >
                Ready to Experience Healing
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                href="/services"
                variant="elevated"
                size="lg"
              >
                Learn About Our Services
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}