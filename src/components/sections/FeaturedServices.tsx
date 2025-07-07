'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';

const featuredServices = [
  {
    id: 'tesla-wellness-table',
    name: 'Tesla Wellness Table',
    tagline: "Nashville's Only Tesla Wellness Experience",
    description: 'Experience the revolutionary Tesla Wellness Table - the only one in Nashville. This cutting-edge technology combines energy, frequency, and light to promote cellular regeneration and deep healing.',
    benefits: [
      'Cellular regeneration and repair',
      'Enhanced energy and vitality',
      'Stress reduction and relaxation',
      'Improved sleep quality',
      'Pain relief and inflammation reduction',
      'Accelerated recovery'
    ],
    duration: '60-90 minutes',
    price: 'Starting at $150',
    image: '/images/placeholder.svg',
    color: 'terracotta'
  },
  {
    id: 'roxiva-light-therapy',
    name: 'RoXiva Light Therapy',
    tagline: 'Advanced Brainwave Entrainment',
    description: 'Immerse yourself in the transformative power of RoXiva light therapy. This advanced system uses precise frequencies and light patterns to guide your brain into optimal states for healing and consciousness expansion.',
    benefits: [
      'Deep meditation and relaxation',
      'Enhanced creativity and focus',
      'Emotional balance and clarity',
      'Reduced anxiety and stress',
      'Improved cognitive function',
      'Spiritual awakening'
    ],
    duration: '45-60 minutes',
    price: 'Starting at $125',
    image: '/images/placeholder.svg',
    color: 'sage'
  }
];

export function FeaturedServices() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-slate-50/30 to-white">
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
            Featured Healing Technologies
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-inter font-light text-slate-900 mt-4 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Revolutionary{' '}
            <span className="italic text-sage font-normal">Frequency Healing</span>{' '}
            Experiences
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Discover Nashville&apos;s most advanced healing technologies, exclusively available at 
            The Healing Frequency Space. Each session is carefully customized to your unique needs.
          </motion.p>
        </motion.div>

        {/* Featured Services */}
        <div className="space-y-32">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div>
                  <span className={`text-${service.color}-500 font-medium text-sm uppercase tracking-wider`}>
                    {service.tagline}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-inter font-light text-slate-900 mt-2 mb-4">
                    {service.name}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-lg font-medium text-slate-700 mb-4">Key Benefits:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-1.5 h-1.5 bg-${service.color}-500 rounded-full mt-2 flex-shrink-0`} />
                        <span className="text-slate-600">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Session Info */}
                <div className={`bg-${service.color}-50 rounded-lg p-6 border border-${service.color}-100`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Session Duration</div>
                      <div className="font-medium text-slate-900">{service.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Investment</div>
                      <div className={`font-medium text-${service.color}-600 text-lg`}>{service.price}</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href={`/booking?service=${service.id}`}
                    variant="primary"
                    size="lg"
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    Book {service.name} Session
                  </Button>
                  <Button
                    href={`/services/${service.id}`}
                    variant="outline"
                    size="lg"
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Image */}
              <motion.div
                className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={service.image}
                    alt={`${service.name} healing session at The Healing Frequency Space`}
                    fill
                    className="object-cover"
                  />
                  {/* Elegant overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-${service.color}-500/20 via-transparent to-transparent`} />
                </div>

                {/* Floating badge */}
                <motion.div
                  className={`absolute -bottom-4 -right-4 bg-${service.color}-500 text-white px-6 py-3 rounded-full shadow-xl`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.0, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <span className="font-medium text-sm">Exclusive to Nashville</span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20 pt-16 border-t border-sage/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-inter font-light text-slate-900 mb-6">
            Ready to Experience{' '}
            <span className="italic text-terracotta-500 font-normal">Revolutionary Healing</span>?
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Book your personalized consultation to discover which healing technology 
            is perfect for your unique journey to wellness.
          </p>
          <Button
            href="/booking"
            variant="primary"
            size="lg"
            className="hover:scale-105 transition-transform duration-300 shadow-xl"
          >
            Schedule Your Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}