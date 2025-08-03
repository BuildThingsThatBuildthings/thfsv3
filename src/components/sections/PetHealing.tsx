'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export function PetHealing() {
  const petBenefits = [
    {
      title: 'Anxiety & Stress Relief',
      description: 'Calm nervous pets and reduce separation anxiety through gentle frequency healing.',
      icon: '🧘‍♀️'
    },
    {
      title: 'Pain Management', 
      description: 'Natural pain relief for arthritis, injuries, and chronic conditions in pets.',
      icon: '💊'
    },
    {
      title: 'Behavioral Balance',
      description: 'Address aggressive behavior, excessive barking, and hyperactivity naturally.',
      icon: '⚖️'
    },
    {
      title: 'Recovery Support',
      description: 'Accelerate healing after surgery, illness, or injury with frequency therapy.',
      icon: '🏥'
    },
    {
      title: 'Senior Pet Wellness',
      description: 'Support aging pets with increased vitality and improved quality of life.',
      icon: '👴'
    },
    {
      title: 'Emotional Trauma',
      description: 'Help rescue animals and pets overcome past trauma and abuse.',
      icon: '💚'
    }
  ];

  const animalTypes = [
    { name: 'Dogs', emoji: '🐕', description: 'All breeds and sizes benefit from frequency healing' },
    { name: 'Cats', emoji: '🐱', description: 'Feline-specific protocols for optimal wellness' },
    { name: 'Horses', emoji: '🐎', description: 'Equine healing for performance and recovery' },
    { name: 'Birds', emoji: '🦅', description: 'Gentle frequencies suitable for avian companions' },
    { name: 'Exotic Pets', emoji: '🦎', description: 'Rabbits, reptiles, and other beloved companions' },
    { name: 'Farm Animals', emoji: '🐄', description: 'Livestock wellness and healing support' }
  ];

  const testimonialQuotes = [
    {
      quote: "My anxious rescue dog became calm and peaceful after remote sessions. The change was remarkable!",
      author: "Sarah M., Dog Owner",
      location: "California"
    },
    {
      quote: "Our aging cat&apos;s arthritis improved dramatically. She&apos;s playful again at 15 years old.",
      author: "Michael R., Cat Parent", 
      location: "Texas"
    },
    {
      quote: "The whole barn of horses seemed more peaceful after the remote healing session.",
      author: "Jennifer L., Equestrian",
      location: "Kentucky"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-sage-50/30 via-white to-terracotta-50/20">
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
            className="text-sage-600 font-medium uppercase tracking-wider text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Animal Frequency Healing
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-inter font-light text-amber-800 mt-4 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Healing for Your{' '}
            <span className="italic text-terracotta-500 font-normal">Beloved Pets</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Animals are naturally receptive to frequency healing. Our remote sessions extend healing 
            benefits to your pets, addressing physical ailments, emotional trauma, and behavioral 
            challenges with gentle, non-invasive energy medicine.
          </motion.p>
        </motion.div>

        {/* Pet Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {petBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-sage-100 hover:border-terracotta-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-amber-800 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animal Types */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-inter font-light text-amber-800 text-center mb-12">
            All Animals{' '}
            <span className="italic text-sage-600 font-normal">Welcome</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {animalTypes.map((animal, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-sage-100"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-3">{animal.emoji}</div>
                <h4 className="font-semibold text-amber-800 mb-2">{animal.name}</h4>
                <p className="text-xs text-slate-600">{animal.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pet Healing Process */}
        <motion.div
          className="bg-gradient-to-r from-sage-50 to-terracotta-50 rounded-2xl p-12 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-inter font-light text-amber-800 text-center mb-8">
            How Pet{' '}
            <span className="italic text-terracotta-500 font-normal">Healing Works</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-sage-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4">🐾</div>
              <h4 className="font-semibold text-amber-800 mb-3">Natural Receptivity</h4>
              <p className="text-slate-600">Animals are naturally sensitive to energy and frequencies, making them excellent candidates for healing.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-terracotta-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4">📡</div>
              <h4 className="font-semibold text-amber-800 mb-3">Remote Connection</h4>
              <p className="text-slate-600">Distance is no barrier - healing frequencies reach your pet through quantum field technology.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-sage-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4">💚</div>
              <h4 className="font-semibold text-amber-800 mb-3">Gentle Healing</h4>
              <p className="text-slate-600">Non-invasive frequencies work naturally with your pet&apos;s energy system for safe, effective healing.</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-inter font-light text-amber-800 text-center mb-12">
            Pet Parent{' '}
            <span className="italic text-terracotta-500 font-normal">Success Stories</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialQuotes.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg border border-sage-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl text-terracotta-400 mb-4">&quot;</div>
                <p className="text-slate-600 mb-6 italic leading-relaxed">{testimonial.quote}</p>
                <div className="border-t border-sage-100 pt-4">
                  <div className="font-semibold text-amber-800">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.location}</div>
                </div>
              </motion.div>
            ))}
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
            Give Your Pet the Gift of{' '}
            <span className="italic text-terracotta-500 font-normal">Natural Healing</span>
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Remote pet healing sessions work alongside your veterinary care to support your 
            animal&apos;s overall wellness, emotional balance, and quality of life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Learn About Pet Healing Sessions
            </Button>
            <Button
              href="/remote-healing"
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
            >
              Explore Remote Healing Options
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}