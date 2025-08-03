'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import { FramedLayout } from '@/components/layout';
import { Service } from '@/types';
import servicesData from '@/content/services.json';

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const popularDuration = service.durations.find(d => d.isPopular) || service.durations[0];
  const bestPackage = service.packages.length > 0 ? service.packages[service.packages.length - 1] : null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card hover className="overflow-hidden h-full">
        {/* Service Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src="/images/placeholder.svg"
            alt={service.displayName}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Service Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              service.category === 'in-person' 
                ? 'bg-terracotta-500 text-white' 
                : 'bg-sage text-white'
            }`}>
              {service.category === 'in-person' ? 'In-Person' : 'Remote Available'}
            </span>
          </div>
          
          {/* Price Display */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-sm px-3 py-2">
            <div className="text-right">
              <div className="text-sm text-slate-600">Starting at</div>
              <div className="text-lg font-semibold text-terracotta-500">
                ${popularDuration.price}
              </div>
            </div>
          </div>
        </div>
        
        {/* Service Content */}
        <div className="p-6">
          <h3 className="text-xl font-inter font-semibold text-amber-800 mb-3">
            {service.displayName}
          </h3>
          
          <p className="text-slate-600 mb-4 leading-relaxed">
            {service.description}
          </p>
          
          {/* Benefits Preview */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-amber-700 mb-2">Key Benefits:</h4>
            <ul className="space-y-1">
              {service.benefits.slice(0, isExpanded ? service.benefits.length : 3).map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            {service.benefits.length > 3 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-terracotta-500 text-sm hover:text-terracotta-600 transition-colors mt-2"
              >
                {isExpanded ? 'Show Less' : `+${service.benefits.length - 3} More Benefits`}
              </button>
            )}
          </div>
          
          {/* Duration Options */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-amber-700 mb-2">Session Options:</h4>
            <div className="space-y-2">
              {service.durations.map((duration, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">
                    {duration.minutes} min {duration.description && `(${duration.description})`}
                    {duration.isPopular && (
                      <span className="ml-2 bg-terracotta-100 text-terracotta-600 px-2 py-0.5 rounded-sm text-xs">
                        Popular
                      </span>
                    )}
                  </span>
                  <span className="font-medium text-amber-800">${duration.price}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Package Savings */}
          {bestPackage && (
            <div className="bg-sage/10 rounded-sm p-3 mb-4">
              <div className="text-sm text-sage font-medium">
                💰 Save ${bestPackage.savings} with {bestPackage.sessionCount}-session package
              </div>
              <div className="text-xs text-slate-600 mt-1">
                {bestPackage.discountPercent}% discount • Valid {bestPackage.expirationDays} days
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              href="/remote-healing"
              variant="primary"
              className="flex-1"
            >
              Discover Remote Healing
            </Button>
            <Button
              href={`/services/${service.name}`}
              variant="outline"
              className="flex-1"
            >
              Learn More
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Services() {
  const services = servicesData.services as Service[];
  
  return (
    <div className="bg-gradient-to-b from-white via-cream/10 to-white py-32">
      <FramedLayout padding="xl" className="bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header with enhanced spacing */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-inter font-light text-amber-800 mb-8 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Transform Your{' '}
              <span className="italic text-sage font-normal">Well-Being</span>
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Experience the transformative power of frequency healing through our carefully curated 
              selection of cutting-edge technologies and personalized therapeutic approaches.
            </motion.p>
          </motion.div>
        
        {/* Services Grid with enhanced spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        
        {/* Call-to-Action Section with elegant design */}
        <motion.div
          className="text-center bg-gradient-to-r from-sage/5 via-cream/5 to-gold/5 rounded-lg p-16 border border-sage/10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-4xl md:text-5xl font-inter font-light text-amber-800 mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Begin Your{' '}
            <span className="italic text-sage font-normal">Healing Journey</span>?
          </motion.h3>
          <motion.p 
            className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore our remote healing options available worldwide, including Tesla Quantum protocols, 
            pet healing, and EMF protection - all delivered from the comfort of your home.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              href="/remote-healing"
              variant="primary"
              size="lg"
              className="px-10 py-4 text-lg hover:scale-105 transition-transform duration-300"
            >
              Explore Remote Options
            </Button>
            <Button
              href="/about"
              variant="secondary"
              size="lg"
              className="px-10 py-4 text-lg hover:scale-105 transition-transform duration-300"
            >
              Meet Victoria
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </FramedLayout>
    </div>
  );
}