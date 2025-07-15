'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

const valuePropositions = [
  {
    icon: '⚡',
    title: 'Exclusive Technologies',
    description: 'Nashville\'s only Tesla Wellness Table and advanced RoXiva light therapy systems.',
    details: 'Access cutting-edge healing technologies available nowhere else in Middle Tennessee.'
  },
  {
    icon: '👥',
    title: '30+ Years Expertise',
    description: 'Victoria\'s decades of experience in holistic healing and energy medicine.',
    details: 'Benefit from deep wisdom combined with the latest scientific breakthroughs.'
  },
  {
    icon: '🎯',
    title: 'Personalized Approach',
    description: 'Every session is customized using kinesiology and intuitive assessment.',
    details: 'No one-size-fits-all solutions - your healing journey is uniquely yours.'
  },
  {
    icon: '🏆',
    title: 'Proven Results',
    description: '95% success rate with over 1000 lives transformed through frequency healing.',
    details: 'Join countless clients who have experienced profound transformation.'
  },
  {
    icon: '🌟',
    title: 'Holistic Integration',
    description: 'Combining ancient wisdom with modern frequency healing technologies.',
    details: 'Address root causes, not just symptoms, for lasting transformation.'
  },
  {
    icon: '🏡',
    title: 'Sanctuary Environment',
    description: 'A carefully designed healing space that promotes deep relaxation and renewal.',
    details: 'Step into a true sanctuary away from the chaos of everyday life.'
  }
];

export function WhyChooseUs() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-cream/10 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-terracotta-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-sage/5 rounded-full blur-3xl" />
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
            Why The Healing Frequency Space
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-inter font-light text-amber-800 mt-4 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Nashville&apos;s Most{' '}
            <span className="italic text-sage font-normal">Trusted</span>{' '}
            Healing Sanctuary
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Discover what sets us apart and why discerning clients choose The Healing Frequency Space 
            for their transformation journey.
          </motion.p>
        </motion.div>

        {/* Value Propositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {valuePropositions.map((prop, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-sage/10 hover:border-terracotta-500/30 transition-all duration-500 hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <motion.div
                className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {prop.icon}
              </motion.div>
              
              {/* Content */}
              <h3 className="text-xl font-inter font-medium text-amber-800 mb-3 group-hover:text-terracotta-500 transition-colors duration-300">
                {prop.title}
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                {prop.description}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                {prop.details}
              </p>
              
              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-terracotta-500 to-sage transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl" />
            </motion.div>
          ))}
        </div>

        {/* Credentials & Certifications */}
        <motion.div
          className="bg-gradient-to-r from-sage/5 via-cream/5 to-gold/5 rounded-2xl p-8 md:p-12 border border-sage/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-inter font-light text-amber-800 mb-4">
              Trusted{' '}
              <span className="italic text-terracotta-500 font-normal">Credentials</span>{' '}
              & Certifications
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Victoria&apos;s extensive training and certifications ensure you receive the highest quality care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Certified Holistic Practitioner',
              'Tesla Wellness Technology Certified',
              'RoXiva Light Therapy Specialist',
              'Applied Kinesiology Expert'
            ].map((credential, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-sage/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-terracotta-500 to-sage rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">✓</span>
                </div>
                <h4 className="font-medium text-amber-700 text-sm leading-tight">
                  {credential}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-inter font-light text-amber-800 mb-6">
            Experience the{' '}
            <span className="italic text-sage font-normal">Difference</span>{' '}
            for Yourself
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join the thousands who have discovered true healing at Nashville&apos;s premier frequency healing sanctuary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/booking"
              variant="primary"
              size="lg"
              className="hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Schedule Your First Session
            </Button>
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
            >
              Learn About Our Approach
            </Button>
          </div>
          
          {/* Trust indicators */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 pt-8 border-t border-sage/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-2 h-2 bg-gold rounded-full" />
              <span className="text-sm">30+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-2 h-2 bg-gold rounded-full" />
              <span className="text-sm">1000+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-2 h-2 bg-gold rounded-full" />
              <span className="text-sm">Nashville&apos;s Only Tesla Wellness Table</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}