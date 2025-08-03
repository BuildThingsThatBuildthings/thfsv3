'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export function RemoteHealing() {
  const remoteFeatures = [
    {
      title: 'Global Accessibility',
      description: 'Connect from anywhere in the world for personalized frequency healing sessions.',
      icon: '🌍'
    },
    {
      title: 'EMF & Radiation Protection',
      description: 'Our remote sessions create protective fields that mitigate harmful EMFs and radiation.',
      icon: '🛡️'
    },
    {
      title: 'Pet Healing Included',
      description: 'Remote sessions extend healing benefits to your beloved pets and animals.',
      icon: '🐾'
    },
    {
      title: 'Family Coverage',
      description: 'Healing frequencies can benefit your entire household during remote sessions.',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Quantum Field Technology',
      description: 'Advanced quantum entanglement principles enable distance healing effectiveness.',
      icon: '⚛️'
    },
    {
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule without travel time or location constraints.',
      icon: '⏰'
    }
  ];

  const healingProtocols = [
    {
      name: 'Tesla Quantum Remote',
      description: 'Full Tesla Table protocol delivered remotely with same healing benefits',
      duration: '30-60 minutes',
      benefits: ['Cellular regeneration', 'Energy enhancement', 'Stress reduction']
    },
    {
      name: 'Pet Wellness Protocol', 
      description: 'Specialized frequencies for animal healing and behavioral balance',
      duration: '20-30 minutes',
      benefits: ['Pet anxiety relief', 'Physical healing', 'Behavioral harmony']
    },
    {
      name: 'EMF Protection Shield',
      description: 'Continuous protective field against electromagnetic pollution',
      duration: 'Ongoing protection',
      benefits: ['EMF mitigation', 'Radiation defense', 'Cellular protection']
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-white via-sage-50/20 to-white">
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
            className="text-terracotta-500 font-medium uppercase tracking-wider text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Distance Healing Technology
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-inter font-light text-amber-800 mt-4 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Remote Frequency{' '}
            <span className="italic text-sage-600 font-normal">Healing Sessions</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Experience the same powerful healing frequencies from the comfort of your home. 
            Our quantum field technology transcends physical distance, delivering personalized 
            healing that includes EMF protection and extends benefits to your pets and family.
          </motion.p>
        </motion.div>

        {/* Remote Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {remoteFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-sage-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-amber-800 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Healing Protocols */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-inter font-light text-amber-800 text-center mb-12">
            Available Remote{' '}
            <span className="italic text-terracotta-500 font-normal">Healing Protocols</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {healingProtocols.map((protocol, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-sage-50 to-terracotta-50 rounded-xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold text-amber-800 mb-3">{protocol.name}</h4>
                <p className="text-slate-600 mb-4">{protocol.description}</p>
                <div className="text-sm text-terracotta-600 font-medium mb-4">
                  Duration: {protocol.duration}
                </div>
                <div className="space-y-2">
                  {protocol.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                      <span className="text-sm text-slate-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How Remote Healing Works */}
        <motion.div
          className="bg-gradient-to-r from-terracotta-50 to-sage-50 rounded-2xl p-12 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-inter font-light text-amber-800 text-center mb-8">
            How Remote{' '}
            <span className="italic text-terracotta-500 font-normal">Healing Works</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-terracotta-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Quantum Entanglement</h4>
                  <p className="text-slate-600">Advanced quantum physics principles allow healing frequencies to transcend physical distance.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-sage-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Personalized Frequency</h4>
                  <p className="text-slate-600">Victoria tunes into your unique energetic signature to deliver customized healing frequencies.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-terracotta-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Field Extension</h4>
                  <p className="text-slate-600">Healing fields extend to your environment, benefiting family members and pets in your space.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-full bg-gradient-to-br from-terracotta-200 to-sage-200 p-8 flex items-center justify-center">
                <div className="text-6xl">⚡</div>
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-terracotta-300 animate-spin [animation-duration:20s]"></div>
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
            Experience{' '}
            <span className="italic text-terracotta-500 font-normal">Global Healing</span>{' '}
            from Home
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join clients worldwide who experience the transformative power of remote frequency healing, 
            including specialized protocols for pet wellness and EMF protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Learn More About Remote Sessions
            </Button>
            <Button
              href="/testimonials"
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
            >
              Read Remote Healing Success Stories
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}