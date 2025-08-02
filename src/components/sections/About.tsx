"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui";

export function About() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-cream/5 to-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-terracotta-500 font-medium uppercase tracking-wider text-sm">
                Meet Victoria
              </span>
              <h2 className="text-4xl md:text-5xl font-inter font-light text-amber-800 mt-4 mb-6 tracking-tight">
                Founder of{" "}
                <span className="italic text-sage font-normal">
                  The Healing Frequency Space
                </span>
              </h2>
            </motion.div>

            <motion.div
              className="space-y-6 text-lg text-slate-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p>
                Victoria is the founder of The Healing Frequency Space, where
                she blends decades of experience in holistic healing, energy
                work, and the creative arts to support clients on their wellness
                journeys. She holds a BFA in Fine Arts from The George
                Washington University and began her professional path in Los
                Angeles, working in the natural health industry while selling
                her art on commission. During this time, she received training
                in nutritional supplementation and basic nutrition.
              </p>
              <p>
                Raised in the Greek Orthodox faith, Victoria&apos;s earliest
                spiritual influences came from her grandmother, whose guidance
                and presence instilled in her a deep sense of devotion and
                reverence for the unseen. This spiritual foundation was later
                enriched through her immersion in various forms of meditation,
                beginning in the early 1990s, where she studied with prominent
                teachers and integrated advanced contemplative practices into
                her daily life. In 1994, a transformative meeting with an
                internationally renowned spiritual leader sparked a powerful
                awakening experience that profoundly shaped her spiritual
                journey.
              </p>
              <p>
                While raising two children, Victoria became a Reiki Master,
                studied energy medicine, and built a successful decorative
                design and real estate career. She is currently completing a
                master certification in herbalism from the National Health
                Institute in Maui, Hawaii, further expanding her expertise in
                natural health and plant-based remedies. Throughout her journey,
                Victoria has drawn inspiration from universal ideals of love,
                compassion, and forgiveness, which continue to shape her
                approach to healing and connection.
              </p>
              <p>
                Victoria&apos;s passion for higher consciousness and holistic living
                led her to open The Healing Frequency Space, where she now
                offers advanced energy frequency therapies using Rife &
                Solfeggio frequencies, Nikola Tesla technology with the Tesla
                Wellness Table, and RoXiva light therapy. Her integrative
                approach empowers clients to experience profound transformation
                in body, mind, and soul.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                href="/about"
                variant="primary"
                size="lg"
                className="hover:scale-105 transition-transform duration-300"
              >
                Learn About Victoria&apos;s Journey
              </Button>
              <Button
                href="/booking"
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-transform duration-300"
              >
                Book a Consultation
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/victoria-colorful-chair.jpg"
                alt="Victoria - The Healing Frequency Space founder sitting in a vibrant colorful chair"
                fill
                className="object-cover"
                priority
              />
              {/* Elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sage/20 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
