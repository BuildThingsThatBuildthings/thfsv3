# Website Update Todo List
*Generated from agent_update.md requirements - Organized by sprint-prioritizer agent*

## Core Objective
Transform website to **informational tone** - removing promotional language and focusing on education over conversion.

---

## 🎯 CRITICAL PATH UPDATES (Must Complete First)

### Navigation & Header
- [ ] **Fix header inconsistent behavior** - Make static instead of disappear/reappear on scroll
  - *File: `src/components/layout/Navigation.tsx`*
  - *Lines 14-23: Remove scroll-based visibility logic*

### Hero Section Overhaul
- [ ] **Remove "Elevate Every Cell" tagline**
  - *File: `src/components/sections/Hero.tsx`*
  - *Lines 92-94: Remove entire tagline section*
- [ ] **Remove small bottom text from hero section**
  - *File: `src/components/sections/Hero.tsx`*
  - *Lines 122-152: Remove trust indicators section*
- [ ] **Change hero background to leaves and nature theme**
  - *Replace current video with nature/leaves video*
  - *Update video source path*

---

## 📝 CONTENT & MESSAGING UPDATES

### Tesla Wellness Table Content
- [ ] **Define Tesla Wellness Table - DRIVE CONTEXT**
  - *Use first 2 paragraphs and benefit bullets only*
  - *File: `src/components/sections/FeaturedServices.tsx`*
- [ ] **Replace "Nashville's Only" with "Nashville's First Tesla Quantum Table"**
  - *Multiple files: Hero.tsx, WhyChooseUs.tsx, FeaturedServices.tsx*
- [ ] **Add "Tesla Quantum to your wellness protocol" section**

### Victoria's Bio & About Section  
- [ ] **Update Victoria's title to "Frequency Healing Practitioner"**
  - *File: `src/components/sections/About.tsx`*
  - *Line 25: Change "Meet Victoria" subtitle*
- [ ] **Rewrite Victoria's bio - USE REAL WORDS ONLY**
  - *Remove academic jargon, use conversational language*
- [ ] **Remove certificates and experience section**
  - *File: `src/components/sections/WhyChooseUs.tsx`*
  - *Lines 135-178: Remove credentials section*
- [ ] **Replace Victoria image with Victoria on RoXiva chair**
  - *File: `src/components/sections/About.tsx`*
  - *Update image path and alt text*

### RoXiva Updates
- [ ] **Add "RoXiva starting at 7 minutes" information**
  - *File: `src/content/services.json`*
  - *Update RoXiva duration options*
- [ ] **Add RoXiva wake up testimonials**
- [ ] **Picture of Victoria on RoXiva** (duplicate - see above)

---

## 🗑️ REMOVAL TASKS

### Pricing & Commercial Elements
- [ ] **Remove ALL prices from homepage**
  - *File: `src/components/sections/FeaturedServices.tsx`*
  - *Lines 142-159: Remove pricing display sections*
  - *Keep pricing in services.json but hide from UI*
- [ ] **Remove "Schedule consultation" buttons**
  - *Replace with informational CTAs*
- [ ] **Remove "Nashville's most trusted healing sanctuary" text**
  - *File: `src/components/sections/WhyChooseUs.tsx`*
  - *Lines 79-82: Update heading*

### Statistics & Claims
- [ ] **Remove stats section (1000+ lives, 95% success, etc.)**
  - *File: `src/components/sections/TransformationStories.tsx`*
  - *Lines 192-231: Remove entire stats grid*

### Testimonials Restructure
- [ ] **Move testimonials down the page** (after services)
  - *File: `src/app/page.tsx`*
  - *Reorder component placement*
- [ ] **Replace testimonials with real ones from Google Reviews**
  - *File: `src/components/sections/TransformationStories.tsx`*
  - *Replace current stories array with authentic testimonials*
- [ ] **Push new testimonial section lower on page**

---

## ➕ NEW CONTENT ADDITIONS

### Remote/Distance Healing Section
- [ ] **Create "Learn more about Remote/Distant healing" section**
  - *Replace booking buttons with educational content*
- [ ] **Add pet/remote healing benefits section**
  - *"Additional section focused on all other benefits to include specifically, Pet/remote"*
- [ ] **Add EMF/radiation mitigation information**
  - *"Radiation/EMFs are mitigated with remote session"*

### Call-to-Action Updates
- [ ] **Change "Ready to experience healing" - remove schedule consultation**
  - *Replace with informational CTAs*
- [ ] **Update "Learn more = remote sessions" buttons**
  - *Convert booking CTAs to educational links*

---

## 🔧 CLARIFIED TECHNICAL ITEMS

### Paul Esch References (IDENTIFIED)
- [ ] **Remove Paul Esch references and replace with premier healing frequency focus**
  - *File: `public/details.md` - Line 3: Remove "invented by Paul Esch" reference* 
  - *File: `email-templates/welcome-email-2.html` - Line 114: Remove "Developed by Paul Esch"*
  - *File: `email-templates/welcome-email-3.html` - Line 85: Remove "Created by Paul Esch"*
  - *Replace with focus on Tesla technology and healing frequencies*

### Toroidal Field Content (LOCATED)
- [ ] **Simplify toroidal field explanations** - *Most people don't understand technical terms*
  - *File: `public/details.md` - Line 9: Simplify toroidal energy field description*
  - *File: Email templates - Replace technical "toroidal" with "healing energy field"*
  - *Make language more accessible and less scientific*

### Still Need Clarification
- [ ] **"Tina review"** - *No references found in codebase, need clarification*
- [ ] **"Shrink that and add"** - *Need clarification on what to shrink and add*
- [ ] **"Update to perplexity"** - *Need clarification on context*

## 🔍 INVESTIGATION REQUIRED (Before Full Implementation)
- [ ] **Clarify "Tina review" requirement**
  - *Confirm scope and implementation approach with stakeholder*
- [ ] **Define "perplexity update" context**
  - *Identify what needs to be updated to perplexity*
- [ ] **Clarify "Shrink that and add" requirement**
  - *Get specific guidance on what to shrink and what to add*

## 📋 ASSET REQUIREMENTS
- [ ] **Source nature/leaves background video**
  - *Minimum resolution: 1920x1080*
  - *Format: MP4, optimized for web*
  - *Replace current `/videos/thfs_hero2.mp4`*
- [ ] **Obtain Victoria on RoXiva chair photo**
  - *High resolution, professional quality*
  - *Consistent with site aesthetic*
  - *Replace `/images/victoria-colorful-chair.jpg`*

---

## 📊 IMPLEMENTATION PRIORITY

**Phase A (Critical)**: Header fix, hero updates, pricing removal
**Phase B (Content)**: Bio updates, testimonials, Tesla content  
**Phase C (New Features)**: Remote healing section, pet healing content
**Phase D (Polish)**: Clarify unclear items, final tone adjustments

---

## 🎯 SUCCESS CRITERIA
- [ ] Website achieves informational tone throughout (Target: 90%+ Tone Alignment Score)
- [ ] All promotional language removed
- [ ] Educational content replaces sales content  
- [ ] Technical functionality maintained
- [ ] Responsive design preserved

---

*This todo.md ready for Phase 2 confirmation review by studio-producer agent*