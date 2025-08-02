# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Healing Frequency Space is a Next.js 15 wellness website built with TypeScript and Tailwind CSS. It features a modern luxury design with earth-tone aesthetics, video backgrounds, and integrated booking/payment systems.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev          # Starts on http://localhost:3000

# Build for production
npm run build        # Creates static export in /out directory

# Type checking
npm run type-check   # Run TypeScript compiler checks

# Lint code
npm run lint         # Run ESLint with Next.js config
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router, static export mode)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom earth-tone design system
- **Animations**: Framer Motion
- **Payments**: Stripe integration ready (via @stripe/stripe-js)
- **Validation**: Zod for runtime type validation
- **State**: React hooks (no global state management)

### Directory Structure
- `/src/app/` - Next.js App Router pages
  - `page.tsx` - Main homepage
  - `home-b/`, `home-c/`, `home-d/` - Alternative homepage designs
  - `gallery/` - Gallery page
- `/src/components/` - Organized by type:
  - `/layout/` - Navigation, Footer, FramedLayout
  - `/sections/` - Hero, About, Services, TransformationStories, etc.
  - `/ui/` - Button, Card, Input, Modal, Loading
- `/src/types/` - TypeScript interfaces (service.ts, booking.ts, client.ts)
- `/src/content/services.json` - Service definitions with pricing/packages
- `/email-templates/` - HTML email templates for welcome emails

### Key Design Patterns

1. **Component Organization**: Components are categorized by their role (layout/sections/ui)
2. **Type Safety**: All components have TypeScript interfaces in `/src/types/`
3. **Service Data**: All service information (Tesla Table, RoXiva, etc.) is centralized in `/src/content/services.json`
4. **Path Aliases**: Use `@/` for imports from src directory
5. **Multiple Hero Variants**: Different hero sections (Hero, HeroB, HeroC, HeroD) for A/B testing

### Important Configuration

**Environment Variables** (in `.env.local`):
```
NEXT_PUBLIC_SITE_URL=https://healingfrequencyspace.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
CALENDLY_API_KEY=your_calendly_api_key_here
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
DATABASE_URL=postgresql://... (optional)
```

**Static Export**: Site is configured for static hosting via `output: 'export'` in `next.config.js`. Image optimization is disabled, and all routes are pre-rendered at build time.

**Tailwind Custom Colors**:
- `terracotta`: Earth tone palette (100-700)
- `sage`: Natural green tones (500-600)
- `warmGold`: Muted gold accent (#D4A574)
- `cream`: Light background (#F5F5DC)

## Development Guidelines

### Component Creation
When creating new components:
1. Place in appropriate directory based on type (layout/sections/ui)
2. Create or extend TypeScript interfaces in `/src/types/`
3. Import and use existing UI components from `/src/components/ui/`
4. Follow the established Tailwind class patterns with custom color palette

### Styling Conventions
- Primary colors: `terracotta-500`, `sage-500`, `warmGold`
- Use the custom color palette defined in `tailwind.config.js`
- Font families: `font-inter` for headings, `font-open-sans` for body text
- Maintain consistent spacing using Tailwind's spacing scale
- Animations should use Framer Motion

### Service Configuration
All services (Tesla Table, RoXiva, etc.) are defined in `/src/content/services.json` with:
- Service details (id, name, displayName, description)
- Benefits array
- Duration options with pricing
- Package deals with discounts
- Category (in-person/remote)

### Booking System
The booking types in `/src/types/booking.ts` use Zod schemas for validation:
- Service types: "tesla-table", "roxiva", "consultation", "remote"
- Payment methods: "stripe", "apple-pay", "google-pay"
- Booking statuses: pending, confirmed, completed, cancelled

### Deployment
The site builds to static files:
1. Run `npm run build` 
2. Deploy the `/out` directory to any static host
3. Configure environment variables on the hosting platform
4. No server-side API routes - all dynamic functionality should be client-side or via external services