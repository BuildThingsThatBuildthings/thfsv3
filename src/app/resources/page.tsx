'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

const resources = [
  {
    title: 'Understanding Frequency Healing',
    description: 'Learn about the science behind frequency healing and how it can transform your well-being.',
    type: 'Article',
    readTime: '5 min read',
  },
  {
    title: 'Tesla Wellness Technology Explained',
    description: 'Discover how scalar wave technology works and why it\'s revolutionary for healing.',
    type: 'Guide',
    readTime: '8 min read',
  },
  {
    title: 'Preparing for Your First Session',
    description: 'Tips and guidance to maximize the benefits of your healing session experience.',
    type: 'Guide',
    readTime: '3 min read',
  },
  {
    title: 'Herbal Healing Fundamentals',
    description: 'Introduction to plant-based medicine and how herbs complement frequency healing.',
    type: 'Article',
    readTime: '7 min read',
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cream/10 to-white py-32">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          <h1 className="text-4xl md:text-5xl font-inter font-light text-amber-800 mb-6 tracking-tight">
            Healing{' '}
            <span className="italic text-sage font-normal">Resources</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Deepen your understanding of frequency healing and enhance your wellness journey 
            with our curated collection of educational resources.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-sage/10 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="bg-terracotta-100 text-terracotta-600 px-3 py-1 rounded-full text-sm font-medium">
                  {resource.type}
                </span>
                <span className="text-sm text-slate-500">{resource.readTime}</span>
              </div>
              
              <h3 className="text-xl font-inter font-medium text-amber-800 mb-3">
                {resource.title}
              </h3>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                {resource.description}
              </p>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full"
              >
                Coming Soon
              </Button>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-sage/5 via-cream/5 to-gold/5 rounded-2xl p-12 border border-sage/10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-inter font-light text-amber-800 mb-6">
            Ready to Begin Your{' '}
            <span className="italic text-terracotta-500 font-normal">Healing Journey</span>?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Schedule your consultation to discover how frequency healing can transform your life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/booking"
              variant="primary"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
            >
              Schedule Consultation
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
            >
              Ask Questions First
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}