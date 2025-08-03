'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export function EMFProtection() {
  const emfSources = [
    { name: 'WiFi Routers', icon: '📶', danger: 'high' },
    { name: 'Cell Phones', icon: '📱', danger: 'high' },
    { name: 'Smart Meters', icon: '⚡', danger: 'high' },
    { name: '5G Towers', icon: '📡', danger: 'extreme' },
    { name: 'Bluetooth Devices', icon: '🔵', danger: 'medium' },
    { name: 'Microwave Ovens', icon: '🔲', danger: 'high' },
    { name: 'Power Lines', icon: '⚡', danger: 'medium' },
    { name: 'Smart TVs', icon: '📺', danger: 'medium' }
  ];

  const protectionBenefits = [
    {
      title: 'Cellular Defense',
      description: 'Protect your cells from electromagnetic interference and oxidative stress.',
      icon: '🛡️'
    },
    {
      title: 'Sleep Quality',
      description: 'Reduce EMF-related sleep disruption and improve restorative rest.',
      icon: '😴'
    },
    {
      title: 'Mental Clarity',
      description: 'Clear brain fog and enhance cognitive function by reducing EMF exposure.',
      icon: '🧠'
    },
    {
      title: 'Energy Restoration',
      description: 'Restore natural energy levels depleted by constant electromagnetic exposure.',
      icon: '⚡'
    },
    {
      title: 'Immune Support',
      description: 'Strengthen immune function compromised by chronic EMF exposure.',
      icon: '💪'
    },
    {
      title: 'Family Protection',
      description: 'Extend protective benefits to your entire household and pets.',
      icon: '👨‍👩‍👧‍👦'
    }
  ];

  const symptoms = [
    'Chronic fatigue and exhaustion',
    'Difficulty sleeping or staying asleep',
    'Headaches and brain fog',
    'Anxiety and irritability',
    'Concentration problems',
    'Electromagnetic hypersensitivity',
    'Unexplained illness or inflammation',
    'Weakened immune system'
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-terracotta-50/30 via-white to-sage-50/20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-red-600 font-medium uppercase tracking-wider text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            viewport={{ once: true }}
          >
            EMF & Radiation Protection
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-inter font-light text-amber-800 mt-4 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Shield Against{' '}
            <span className="italic text-terracotta-500 font-normal">Electromagnetic Pollution</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            In our hyper-connected world, we&apos;re constantly bombarded by harmful electromagnetic fields. 
            Our remote healing sessions create protective frequency fields that neutralize EMF effects 
            and restore your body&apos;s natural electromagnetic balance.
          </motion.p>
        </motion.div>

        {/* EMF Sources */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-inter font-light text-amber-800 text-center mb-12">
            Common{' '}
            <span className="italic text-red-500 font-normal">EMF Sources</span>{' '}
            in Your Daily Life
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {emfSources.map((source, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-xl shadow-md transition-all duration-300 border-2 ${
                  source.danger === 'extreme' 
                    ? 'bg-red-50 border-red-200 hover:shadow-red-200' 
                    : source.danger === 'high'
                    ? 'bg-orange-50 border-orange-200 hover:shadow-orange-200'
                    : 'bg-yellow-50 border-yellow-200 hover:shadow-yellow-200'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-3">{source.icon}</div>
                <h4 className="font-semibold text-amber-800 mb-2">{source.name}</h4>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  source.danger === 'extreme' 
                    ? 'bg-red-200 text-red-800' 
                    : source.danger === 'high'
                    ? 'bg-orange-200 text-orange-800'
                    : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {source.danger.toUpperCase()} RISK
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Symptoms & Protection Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Symptoms */}
          <motion.div
            className="bg-red-50 rounded-2xl p-8 border border-red-100"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-red-700 mb-6 flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              EMF Exposure Symptoms
            </h3>
            <div className="space-y-3">
              {symptoms.map((symptom, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <span className="text-slate-700">{symptom}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Protection Benefits */}
          <motion.div
            className="bg-sage-50 rounded-2xl p-8 border border-sage-100"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-sage-700 mb-6 flex items-center gap-3">
              <span className="text-3xl">🛡️</span>
              Protection Benefits
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {protectionBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-sm border border-sage-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{benefit.icon}</div>
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* How EMF Protection Works */}
        <motion.div
          className="bg-gradient-to-r from-terracotta-50 to-sage-50 rounded-2xl p-12 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-inter font-light text-amber-800 text-center mb-8">
            How Remote{' '}
            <span className="italic text-terracotta-500 font-normal">EMF Protection</span>{' '}
            Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-terracotta-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4">🌊</div>
              <h4 className="font-semibold text-amber-800 mb-3">Frequency Neutralization</h4>
              <p className="text-slate-600">Healing frequencies create interference patterns that neutralize harmful EMF effects at the cellular level.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-sage-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4">🔄</div>
              <h4 className="font-semibold text-amber-800 mb-3">Field Restoration</h4>
              <p className="text-slate-600">Restore your body&apos;s natural electromagnetic field disrupted by artificial EMF pollution.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-terracotta-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4">🏠</div>
              <h4 className="font-semibold text-amber-800 mb-3">Environmental Shielding</h4>
              <p className="text-slate-600">Create protective fields around your home, extending benefits to family members and pets.</p>
            </div>
          </div>
        </motion.div>

        {/* Scientific Backing */}
        <motion.div
          className="bg-slate-50 rounded-2xl p-12 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-inter font-light text-amber-800 text-center mb-8">
            The Science Behind{' '}
            <span className="italic text-terracotta-500 font-normal">EMF Health Effects</span>
          </h3>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Thousands of peer-reviewed studies have documented the biological effects of EMF exposure, 
              including DNA damage, oxidative stress, disrupted sleep patterns, and weakened immune function. 
              The World Health Organization has classified radiofrequency EMFs as a possible carcinogen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-terracotta-500">2000+</div>
                <div className="text-sm text-slate-600">Published Studies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sage-600">WHO</div>
                <div className="text-sm text-slate-600">Classification 2B</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-terracotta-500">24/7</div>
                <div className="text-sm text-slate-600">EMF Exposure</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-inter font-light text-amber-800 mb-6">
            Protect Your Family from{' '}
            <span className="italic text-red-500 font-normal">Invisible Pollution</span>
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Remote EMF protection sessions create continuous protective fields around your home, 
            neutralizing harmful electromagnetic pollution and restoring natural cellular function.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Learn About EMF Protection
            </Button>
            <Button
              href="/remote-healing"
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
            >
              Explore All Remote Options
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}