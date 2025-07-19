'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const transformationStories = [
  {
    id: 1,
    name: 'James B.',
    location: 'Franklin, TN',
    condition: 'Family Wellness Experience',
    service: 'Tesla Wellness Table',
    story: 'Thank you so much for inviting my wife, my daughter, and me to your home. We truly appreciated your warm hospitality and all the valuable insights you shared with us. It was a delightful experience, and we left with a sense of joy and positivity. We\'re especially grateful for the opportunity to sit at the Tesla table. We felt energized and inspired by the wonderful atmosphere you created. Your home exudes a welcoming spirit, and we left with high spirits and a renewed sense of purpose.',
    result: 'Family left energized with renewed purpose',
    rating: 5,
    image: '/images/placeholder.svg'
  },
  {
    id: 2,
    name: 'Michael R.',
    location: 'Franklin, TN',
    condition: 'Anxiety & Mental Clarity',
    service: 'RoXiva Light Therapy',
    story: 'The RoXiva sessions with Victoria were transformative. As someone who struggled with anxiety and scattered thinking, the light therapy helped me find a calm, focused state I hadn\'t experienced in years. It\'s like meditation amplified.',
    result: 'Anxiety reduced by 80% in 4 sessions',
    rating: 5,
    image: '/images/placeholder.svg'
  },
  {
    id: 3,
    name: 'Jennifer L.',
    location: 'Brentwood, TN',
    condition: 'Recovery & Pain Management',
    service: 'Combined Therapy',
    story: 'Following surgery, traditional pain management wasn\'t working. Victoria\'s combination of Tesla Wellness and personalized frequency healing accelerated my recovery beyond what doctors expected. I\'m now pain-free and stronger than before.',
    result: 'Full recovery in half the expected time',
    rating: 5,
    image: '/images/placeholder.svg'
  }
];

export function TransformationStories() {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <section className="relative py-32 bg-gradient-to-b from-sage/5 via-cream/10 to-sage/5">
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
            Real Stories, Real Transformations
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-inter font-light text-amber-800 mt-4 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Lives{' '}
            <span className="italic text-sage font-normal">Transformed</span>{' '}
            Through Healing
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Discover how our clients have experienced profound healing and transformation 
            through personalized frequency healing sessions.
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
          {transformationStories.map((story, index) => (
            <motion.button
              key={story.id}
              onClick={() => setActiveStory(index)}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                activeStory === index
                  ? 'bg-terracotta-500 border-terracotta-500 text-white shadow-lg'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-terracotta-300 hover:text-terracotta-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center">
                <div className="font-medium text-sm">{story.name}</div>
                <div className="text-xs opacity-75">{story.condition}</div>
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
                {[...Array(transformationStories[activeStory].rating)].map((_, i) => (
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
                &quot;{transformationStories[activeStory].story}&quot;
              </blockquote>
              
              {/* Client Info */}
              <div className="border-t border-sage/20 pt-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="text-center md:text-left">
                    <div className="font-medium text-lg text-amber-800">
                      {transformationStories[activeStory].name}
                    </div>
                    <div className="text-slate-600">
                      {transformationStories[activeStory].location}
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-px h-12 bg-sage/20" />
                  
                  <div className="text-center md:text-left">
                    <div className="text-sm text-slate-500 uppercase tracking-wider mb-1">
                      Treatment
                    </div>
                    <div className="font-medium text-amber-700">
                      {transformationStories[activeStory].service}
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-px h-12 bg-sage/20" />
                  
                  <div className="text-center md:text-left">
                    <div className="text-sm text-slate-500 uppercase tracking-wider mb-1">
                      Result
                    </div>
                    <div className="font-medium text-terracotta-500">
                      {transformationStories[activeStory].result}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-sage/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-inter font-light text-terracotta-500 mb-2">1000+</div>
            <div className="text-slate-600 font-medium">Lives Transformed</div>
          </motion.div>
          
          <motion.div
            className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-sage/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-inter font-light text-sage mb-2">95%</div>
            <div className="text-slate-600 font-medium">Success Rate</div>
          </motion.div>
          
          <motion.div
            className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-sage/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-inter font-light text-gold mb-2">30+</div>
            <div className="text-slate-600 font-medium">Years Experience</div>
          </motion.div>
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
            Ready to Write{' '}
            <span className="italic text-terracotta-500 font-normal">Your Transformation Story</span>?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-terracotta-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-terracotta-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Your Consultation
            </motion.button>
            <motion.button
              className="border-2 border-sage text-sage px-8 py-4 rounded-lg font-medium hover:bg-sage hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More Stories
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}