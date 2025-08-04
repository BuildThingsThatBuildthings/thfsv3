'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';

// Animated benefit item with staggered reveal
const AnimatedBenefit = ({ benefit, index, color }: { benefit: string; index: number; color: string }) => (
  <motion.div
    className="flex items-start gap-3 group cursor-default"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ x: 4, transition: { duration: 0.2 } }}
  >
    <motion.div 
      className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
        color === 'terracotta' ? 'bg-terracotta-500' : 'bg-sage-500'
      }`}
      whileHover={{ scale: 1.5 }}
      transition={{ duration: 0.2 }}
    />
    <span className="text-slate-600 group-hover:text-slate-800 transition-colors duration-200">{benefit}</span>
  </motion.div>
);

const featuredServices = [
  {
    id: 'tesla-wellness-table',
    name: 'Tesla Wellness Table',
    tagline: "Tesla-Inspired Wellness Technology",
    description: 'Experience the Tesla Wellness Table, inspired by Nikola Tesla\'s research. This innovative frequency technology creates a restorative environment using multiple energy vectors—pulsed electromagnetic frequencies, plasma, sound, and light—designed to support the body\'s natural electromagnetic balance.',
    technicalFeatures: [
      'Tesla coil supported by a 12-pointed star for optimal energy flow',
      'Six noble gas-filled lightbulbs emitting plasma energy', 
      'Programmable frequency monitor with custom settings',
      'Vibrant LED array for chromotherapy treatments'
    ],
    benefits: [
      'May support relaxation and stress reduction',
      'Designed to support comfort and inflammatory response',
      'Intended to support cellular communication and energy',
      'May complement immune system function',
      'Aims to support energy center balance',
      'May support metabolic function and digestion',
      'Designed to support sense of wellbeing',
      'Intended to support recovery processes',
      'May support cellular renewal and mental clarity'
    ],
    duration: '60-90 minutes',
    image: '/images/tesla_table.PNG',
    color: 'terracotta'
  },
  {
    id: 'roxiva-light-therapy',
    name: 'RoXiva Light Therapy',
    tagline: 'Light-Based Brainwave Technology',
    description: 'Experience RoXiva light therapy technology. This system uses precise frequencies and light patterns designed to encourage brainwave entrainment toward relaxation states and meditative consciousness patterns.',
    benefits: [
      'May support deep meditation and relaxation',
      'Designed to encourage creativity and focus',
      'Intended to support emotional balance and clarity',
      'May help with anxiety and stress management',
      'Designed to support cognitive function',
      'May encourage meditative awareness'
    ],
    duration: 'Starting at 7 minutes',
    image: '/images/roxiva.jpg',
    color: 'sage'
  }
];

export function FeaturedServices() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-slate-50/30 to-white">
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
            Advanced Wellness Technologies
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-inter font-light text-amber-800 mt-4 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Experience{' '}
            <span className="italic text-sage font-normal">Frequency Healing</span>{' '}
            Technologies
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Experience transformative frequency wellness technologies at 
            The Healing Frequency Space. Each session is tailored to your individual wellness needs.
          </motion.p>
        </motion.div>

        {/* Featured Services */}
        <div className="space-y-32">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div className="space-y-8 md:col-span-3 lg:col-span-7">
                <div>
                  <span className={`font-medium text-sm uppercase tracking-wider ${
                    service.color === 'terracotta' ? 'text-terracotta-500' : 'text-sage-500'
                  }`}>
                    {service.tagline}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-inter font-light text-amber-800 mt-2 mb-4">
                    {service.name}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Technical Features for Tesla Table */}
                  {service.id === 'tesla-wellness-table' && (
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-amber-700 mb-3">Advanced Technology Features:</h4>
                      <div className="space-y-2">
                        {service.technicalFeatures?.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-terracotta-500" />
                            <span className="text-slate-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-4 bg-terracotta-50 rounded-sm border border-terracotta-100">
                        <p className="text-sm text-slate-700 italic">
                          <strong>Technology Foundation:</strong> The Tesla Table creates multiple energy vectors designed to support the body&apos;s natural electromagnetic field, encouraging a shift into a parasympathetic (rest and digest) state associated with relaxation and wellness.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-lg font-medium text-amber-700 mb-4">Key Benefits:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, i) => (
                      <AnimatedBenefit
                        key={i}
                        benefit={benefit}
                        index={i}
                        color={service.color}
                      />
                    ))}
                  </div>
                </div>

                {/* Session Info with hover effect */}
                <motion.div 
                  className={`rounded-lg p-6 border cursor-default transition-all duration-300 ${
                    service.color === 'terracotta' 
                      ? 'bg-terracotta-50 border-terracotta-100 hover:bg-terracotta-100/50' 
                      : 'bg-sage-50 border-sage-100 hover:bg-sage-100/50'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-center items-center">
                    <div className="text-center">
                      <motion.div 
                        className="text-sm text-slate-600 mb-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        Session Duration
                      </motion.div>
                      <motion.div 
                        className="font-medium text-amber-800"
                        whileHover={{ scale: 1.1, color: service.color === 'terracotta' ? '#c4714a' : '#86937a' }}
                        transition={{ duration: 0.2 }}
                      >
                        {service.duration}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA with enhanced animations */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      href={`/booking`}
                      variant="primary"
                      size="lg"
                    >
                      Book a Session
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      href={`/services/${service.id}`}
                      variant="soft"
                      size="lg"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Image with enhanced interactions */}
              <motion.div
                className="relative md:col-span-2 lg:col-span-5 group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl cursor-pointer"
                  whileHover={{ 
                    boxShadow: service.color === 'terracotta' 
                      ? '0 25px 50px rgba(196, 113, 82, 0.4)' 
                      : '0 25px 50px rgba(134, 147, 122, 0.4)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={service.image}
                    alt={service.id === 'tesla-wellness-table' 
                      ? 'Tesla Wellness Table - biofield frequency technology device with plasma energy lightbulbs at The Healing Frequency Space'
                      : 'RoXiva light therapy device - brainwave entrainment technology for meditation and relaxation at The Healing Frequency Space'
                    }
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Elegant overlay with hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent transition-opacity duration-300 ${
                    service.color === 'terracotta' 
                      ? 'from-terracotta-500/20 group-hover:from-terracotta-500/10' 
                      : 'from-sage-500/20 group-hover:from-sage-500/10'
                  }`} />
                  {/* Gentle glow effect on hover */}
                  <motion.div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${
                      service.color === 'terracotta'
                        ? 'bg-gradient-to-br from-terracotta-300/20 via-transparent to-warmGold/20'
                        : 'bg-gradient-to-br from-sage-300/20 via-transparent to-cream/20'
                    }`}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>

              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}