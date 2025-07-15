# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Healing Frequency Space is a Next.js 14 wellness website built with TypeScript and Tailwind CSS. It features a modern luxury design with earth-tone aesthetics, video backgrounds, and integrated booking/payment systems.

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
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router, static export mode)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom earth-tone design system
- **Animations**: Framer Motion
- **Payments**: Stripe integration ready
- **State**: React hooks (no global state management)

### Directory Structure
- `/src/app/` - Next.js App Router pages
- `/src/components/` - Organized by type:
  - `/layout/` - Navigation, Footer, FramedLayout
  - `/sections/` - Hero, About, Services, etc.
  - `/ui/` - Button, Card, Input, Modal, Loading
- `/src/types/` - TypeScript interfaces
- `/src/content/` - Static JSON data (services.json)
- `/email-templates/` - HTML email templates

### Key Design Patterns

1. **Component Organization**: Components are categorized by their role (layout/sections/ui)
2. **Type Safety**: All components have TypeScript interfaces in `/src/types/`
3. **Styling**: Tailwind utilities with custom color palette (terracotta, sage, warmGold)
4. **Path Aliases**: Use `@/` for imports from src directory

### Important Configuration

**Environment Variables** (in `.env.local`):
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
SENDGRID_API_KEY
CALENDLY_URL
GA_MEASUREMENT_ID
```

**Static Export**: Site is configured for static hosting. Image optimization is disabled, and all routes are pre-rendered at build time.

## Development Guidelines

### Component Creation
When creating new components:
1. Place in appropriate directory based on type
2. Create TypeScript interface in `/src/types/`
3. Use existing UI components from `/src/components/ui/`
4. Follow the established Tailwind class patterns

### Styling Conventions
- Primary color: `text-terracotta` / `bg-terracotta`
- Use the custom color palette defined in `tailwind.config.js`
- Maintain consistent spacing using Tailwind's spacing scale
- Animations should use Framer Motion

### Testing & Validation
Currently no test framework is configured. For code quality:
- Run `npm run type-check` before committing
- Ensure all TypeScript errors are resolved
- Test responsive design at key breakpoints (sm, md, lg)

### Deployment
The site builds to static files:
1. Run `npm run build` 
2. Deploy the `/out` directory to any static host
3. Configure environment variables on the hosting platform