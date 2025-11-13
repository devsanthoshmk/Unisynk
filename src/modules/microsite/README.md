# 🌐 Microsite Module

A comprehensive, modular solution for creating and managing event microsites in Unisynk. This module provides three distinct microsite options: Embed Widgets, Template-based Sites, and Custom Site Requests.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Components](#components)
- [Customization](#customization)
- [Deployment](#deployment)

## 🎯 Overview

The Microsite Module offers three flexible approaches to creating event websites:

### 1. **Embed Mode** (`/dashboard/events/[id]/microsite/embed`)
- Integrate Unisynk features into existing websites
- Generate embeddable widgets (registration, calendar, certificates)
- Copy-paste HTML/JavaScript code snippets
- Customizable themes and dimensions

### 2. **Template Mode** (`/dashboard/events/[id]/microsite/editor`)
- Pre-built, customizable microsite templates
- Drag-and-drop section management
- Theme selection and branding customization
- Live preview with responsive design
- SEO optimization tools

### 3. **Custom Mode** (`/dashboard/events/[id]/microsite/custom-request`)
- Request fully custom-built microsites
- Professional design consultation
- Advanced features and integrations
- White-label solutions

## 🏗️ Architecture

```
modules/microsite/
├── components/
│   ├── management/          # Admin/organizer components
│   │   ├── microsite-setup.tsx
│   │   ├── embed-widget-generator.tsx
│   │   ├── template-editor.tsx
│   │   ├── custom-site-request.tsx
│   │   └── microsite-preview.tsx
│   ├── public/              # Public-facing components
│   │   ├── microsite-hero.tsx
│   │   ├── about-section.tsx
│   │   ├── registration-cta.tsx
│   │   ├── live-announcements.tsx
│   │   ├── certificate-portal.tsx
│   │   └── help-support.tsx
│   └── shared/              # Shared utility components
│       ├── theme-selector.tsx
│       ├── section-manager.tsx
│       └── branding-panel.tsx
├── types/
│   └── index.ts             # TypeScript definitions
├── utils/
│   └── index.ts             # Utility functions
├── hooks/
│   └── index.ts             # Custom React hooks
└── README.md
```

## ✨ Features

### 🎨 Template Editor
- **5 Pre-built Themes**: College, Corporate, Creative, Minimal, Nonprofit
- **7 Section Types**: Hero, About, Schedule, Speakers, Sponsors, FAQ, Contact
- **Drag & Drop**: Reorder sections with visual feedback
- **Live Preview**: Real-time preview with device simulation
- **Custom Branding**: Logo upload, color picker, font selection
- **SEO Tools**: Meta tags, keywords, Open Graph settings

### 🔧 Embed Widgets
- **5 Widget Types**: Registration, Enquiry, Calendar, Certificate, Announcements
- **Dual Code Generation**: IFrame and JavaScript embed options
- **Theme Support**: Light, Dark, Auto themes
- **Responsive**: Configurable dimensions and responsive behavior
- **Custom CSS**: Advanced styling options

### 📞 Custom Requests
- **Detailed Forms**: Comprehensive project requirement capture
- **Feature Selection**: Checkbox-based feature selection
- **Budget & Timeline**: Flexible project scoping
- **Status Tracking**: Request status management
- **Sample Portfolio**: Showcase previous work

### 🎯 Public Microsite
- **Mobile-First**: Responsive design for all devices
- **Performance**: Optimized loading and rendering
- **Accessibility**: WCAG compliant components
- **SEO Ready**: Structured data and meta tags
- **Social Sharing**: Open Graph and Twitter Cards

## 🚀 Installation

The module is already integrated into the Unisynk frontend. To use it:

```typescript
// Import components
import { 
  MicrositeSetup, 
  TemplateEditor, 
  EmbedWidgetGenerator 
} from '@/microsite/components'

// Import types
import type { 
  MicrositeSettings, 
  EmbedWidget, 
  MicrositeTheme 
} from '@/microsite/types'

// Import utilities
import { 
  generateEmbedCode, 
  validateMicrositeSettings 
} from '@/microsite/utils'

// Import hooks
import { 
  useMicrositeSettings, 
  useAutoSave 
} from '@/microsite/hooks'
```

## 📖 Usage

### Setting Up a Microsite

```typescript
// 1. Mode Selection
<MicrositeSetup
  eventId="event-123"
  currentMode="template"
  onModeSelect={(mode) => console.log('Selected:', mode)}
/>

// 2. Template Editing
<TemplateEditor
  eventId="event-123"
  eventSlug="my-event"
  initialSettings={settings}
/>

// 3. Embed Generation
<EmbedWidgetGenerator
  eventId="event-123"
  eventSlug="my-event"
/>
```

### Using Hooks

```typescript
function MyComponent({ eventId }: { eventId: string }) {
  const { settings, updateSettings, isLoading } = useMicrositeSettings(eventId)
  const { copyToClipboard, hasCopied } = useClipboard()
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      <button onClick={() => copyToClipboard('Hello World')}>
        {hasCopied('Hello World') ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
```

## 🔌 API Reference

### Types

```typescript
interface MicrositeSettings {
  mode: 'embed' | 'template' | 'custom'
  theme?: string
  sections: MicrositeSection[]
  branding: MicrositeBranding
  widgets: EmbedWidget[]
  customDomain?: string
  seoSettings: SEOSettings
}

interface EmbedWidget {
  id: string
  type: 'registration' | 'enquiry' | 'calendar' | 'certificate' | 'announcements'
  label: string
  enabled: boolean
  config: WidgetConfig
}

interface MicrositeTheme {
  id: string
  name: string
  category: 'college' | 'corporate' | 'nonprofit' | 'creative' | 'minimal'
  colors: ThemeColors
  fonts: ThemeFonts
}
```

### Utilities

```typescript
// Generate embed code
generateEmbedCode(
  eventSlug: string,
  widgetType: string,
  config: WidgetConfig,
  type?: 'iframe' | 'script'
): string

// Validate settings
validateMicrositeSettings(settings: any): {
  isValid: boolean
  errors: string[]
}

// Generate microsite URL
generateMicrositeUrl(
  eventSlug: string,
  customDomain?: string
): string
```

### Hooks

```typescript
// Microsite settings management
useMicrositeSettings(eventId: string): {
  settings: MicrositeSettings | null
  isLoading: boolean
  error: string | null
  updateSettings: (updates: Partial<MicrositeSettings>) => Promise<void>
}

// Auto-save functionality
useAutoSave<T>(
  data: T,
  saveFunction: (data: T) => Promise<void>,
  delay?: number
): {
  isSaving: boolean
  lastSaved: Date | null
}

// Clipboard operations
useClipboard(): {
  copiedText: string | null
  copyToClipboard: (text: string) => Promise<boolean>
  hasCopied: (text: string) => boolean
}
```

## 🎨 Components

### Management Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `MicrositeSetup` | Mode selection interface | `eventId`, `currentMode`, `onModeSelect` |
| `TemplateEditor` | Template customization | `eventId`, `eventSlug`, `initialSettings` |
| `EmbedWidgetGenerator` | Embed code generation | `eventId`, `eventSlug` |
| `CustomSiteRequest` | Custom site request form | `eventId`, `existingRequest` |
| `MicrositePreview` | Live preview modal | `settings`, `eventSlug`, `onClose` |

### Shared Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `ThemeSelector` | Theme selection grid | `selectedTheme`, `onThemeSelect` |
| `SectionManager` | Section enable/reorder | `sections`, `onSectionsUpdate` |
| `BrandingPanel` | Logo, colors, fonts | `branding`, `onBrandingUpdate` |

### Public Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `MicrositeHero` | Event hero section | `event` |
| `AboutSection` | Event details | `event` |
| `RegistrationCTA` | Registration button | `eventSlug`, `enabled` |
| `LiveAnnouncements` | Real-time updates | `announcements` |
| `CertificatePortal` | Certificate downloads | `eventSlug` |
| `HelpSupport` | FAQ and contact | `event` |

## 🎨 Customization

### Adding New Themes

```typescript
// 1. Add theme definition
const newTheme: MicrositeTheme = {
  id: 'startup',
  name: 'Startup Event',
  category: 'corporate',
  colors: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#45b7d1',
    background: '#ffffff',
    text: '#2c3e50'
  },
  fonts: {
    heading: 'Poppins',
    body: 'Inter'
  }
}

// 2. Add to theme selector
const availableThemes = [...existingThemes, newTheme]
```

### Adding New Widget Types

```typescript
// 1. Extend widget type
type WidgetType = 'registration' | 'enquiry' | 'calendar' | 'certificate' | 'announcements' | 'newsletter'

// 2. Add widget configuration
const newsletterWidget: EmbedWidget = {
  id: 'newsletter',
  type: 'newsletter',
  label: 'Newsletter Signup',
  enabled: false,
  config: {
    width: '100%',
    height: '300px',
    theme: 'light',
    language: 'en'
  }
}
```

### Custom Section Types

```typescript
// 1. Extend section type
type SectionType = 'hero' | 'about' | 'schedule' | 'speakers' | 'sponsors' | 'faq' | 'contact' | 'gallery'

// 2. Add section renderer
function renderGallerySection(section: MicrositeSection) {
  return (
    <div className="py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-12">
        {section.content.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {section.content.items?.map((image, index) => (
          <img key={index} src={image.url} alt={image.alt} className="rounded-lg" />
        ))}
      </div>
    </div>
  )
}
```

## 🚀 Deployment

### Environment Variables

```bash
# Production URLs
NEXT_PUBLIC_MICROSITE_BASE_URL=https://unisynk.com
NEXT_PUBLIC_EMBED_BASE_URL=https://embed.unisynk.com

# Development URLs
NEXT_PUBLIC_MICROSITE_BASE_URL=http://localhost:3000
NEXT_PUBLIC_EMBED_BASE_URL=http://localhost:3000
```

### Build Configuration

```javascript
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/embed/:eventSlug/:widget',
        destination: '/api/embed/:eventSlug/:widget'
      }
    ]
  }
}
```

### Database Schema

```sql
-- Microsite settings table
CREATE TABLE microsite_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  mode TEXT CHECK (mode IN ('embed', 'template', 'custom')),
  theme TEXT,
  sections JSONB,
  branding JSONB,
  widgets JSONB,
  custom_domain TEXT,
  seo_settings JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Custom site requests table
CREATE TABLE custom_site_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  org_name TEXT NOT NULL,
  event_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  website_url TEXT,
  brand_guidelines TEXT,
  desired_features TEXT[],
  budget_range TEXT,
  timeline TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🤝 Contributing

1. Follow the existing component structure
2. Add proper TypeScript types
3. Include comprehensive tests
4. Update documentation
5. Follow accessibility guidelines

## 📄 License

This module is part of the Unisynk platform and follows the same licensing terms.