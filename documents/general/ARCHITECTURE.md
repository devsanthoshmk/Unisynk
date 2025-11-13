# Project Architecture Documentation

## Overview

This project follows a **plug-and-play, clean, scalable, modular, and maintainable architecture** designed for enterprise-level applications. The codebase is structured to support feature isolation, code reusability, and team scalability.

## Naming Convention

**All folders and files follow the kebab-case naming format** (e.g., `form-builder`, `auth-layout.tsx`, `use-local-storage.ts`).

---

## Root Structure

```
project-root/
├── backend/              # Backend services and API
├── frontend/             # Next.js frontend application
└── ARCHITECTURE.md       # This documentation
```

---

## Frontend Architecture

The frontend follows a **feature-based modular architecture** with clear separation of concerns.

### High-Level Structure

```
frontend/
├── src/
│   ├── app/             # Next.js App Router pages (routes)
│   ├── modules/         # Feature modules (business logic)
│   ├── components/      # Shared & feature-specific components
│   ├── lib/             # Core utilities & services
│   ├── hooks/           # Shared React hooks
│   ├── constants/       # Application constants
│   ├── types/           # TypeScript type definitions
│   ├── styles/          # Global styles
│   ├── layout/          # Layout components
│   └── utilities/       # Helper functions
├── public/              # Static assets
└── package.json         # Dependencies
```

---

## Detailed Folder Structure

### 1. `/src/app` - Application Routes (Next.js App Router)

Contains all application routes following Next.js 13+ App Router conventions.

```
app/
├── api/                 # API routes
│   ├── events/         # Event-related API endpoints
│   ├── orgs/           # Organization API endpoints
│   └── public/         # Public API endpoints
├── auth/               # Authentication pages
│   ├── callback/       # OAuth callback handler
│   ├── forgot-password/
│   ├── login/
│   ├── reset-password/
│   ├── signup/
│   └── verify-email/
├── dashboard/          # Dashboard pages
│   ├── analytics/
│   ├── attendees/
│   ├── events/
│   ├── microsites/
│   ├── settings/
│   ├── layout.tsx
│   └── page.tsx
├── events/             # Event pages
│   └── [slug]/        # Dynamic event routes
├── onboarding/         # Onboarding flow
│   ├── event/
│   ├── org/
│   ├── layout.tsx
│   └── page.tsx
├── public-site/        # Public marketing pages
│   ├── ambassador/
│   ├── blog/
│   ├── docs/
│   ├── pricing/
│   └── page.tsx
├── profile/            # User profile
├── referral/           # Referral system
├── automation/         # Automation features (placeholder)
├── helpdesk/           # Help desk (placeholder)
├── micro-site/         # Microsite builder (placeholder)
├── role-management/    # Role management (placeholder)
├── settings/           # Settings (placeholder)
└── social-media/       # Social media integration (placeholder)
```

**Purpose**: Route definitions and page-level components. Each folder represents a route segment.

---

### 2. `/src/modules` - Feature Modules

Self-contained feature modules with their own components, hooks, utilities, and types.

```
modules/
├── auth/
│   ├── components/     # Auth-specific components
│   │   └── auth-layout.tsx
│   ├── hooks/          # Auth-specific hooks
│   ├── utilities/      # Auth helper functions
│   ├── type.ts         # Auth TypeScript types
│   └── index.ts        # ✅ Named entry points only
├── dashboard/
│   ├── components/     # Dashboard-specific components
│   │   ├── sidebar.tsx
│   │   ├── top-nav.tsx
│   │   ├── breadcrumb.tsx
│   │   └── ...
│   ├── hooks/
│   ├── utilities/
│   ├── type.ts
│   └── index.ts        # ✅ Named entry points only
├── onboarding/
│   ├── components/     # Onboarding-specific components
│   │   ├── onboarding-flow.tsx
│   │   ├── event-creation.tsx
│   │   └── ...
│   ├── hooks/
│   ├── type.ts
│   └── index.ts        # ✅ Named entry points only
├── registration/
│   ├── components/     # Registration-specific components
│   │   ├── registration-flow.tsx
│   │   ├── registration-form.tsx
│   │   └── ...
│   ├── type.ts
│   └── index.ts        # ✅ Named entry points only
├── microsite/
│   ├── components/
│   │   ├── management/
│   │   ├── public/
│   │   └── shared/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── index.ts        # ✅ Named entry points only
│   └── README.md
├── automation/
├── helpdesk/
├── marketing-management/
├── public-site/
├── role-management/
└── settings/
```

**Purpose**: Encapsulate business logic and feature-specific code. Each module is independent and reusable.

**Module Pattern**:
- `components/` - UI components specific to this feature
- `hooks/` - Custom React hooks for this feature
- `utilities/` - Helper functions and utilities
- `type.ts` - TypeScript interfaces and types
- `index.ts` - **Named entry points only** (no `export *`)

**Export Strategy**:
- ❌ No `export *` from subfolders (breaks tree-shaking)
- ✅ Named exports only in `index.ts`
- ✅ Export only public API, not internal components

---

### 3. `/src/components` - Shared Components Only

**Organized by UI element type** - Contains ONLY truly shared components used across multiple features.

```
components/
├── ui/                 # Base UI components (design system)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── select.tsx
│   ├── tabs.tsx
│   └── [component].tsx
├── buttons/            # Specialized button components
│   ├── theme-toggle.tsx
│   ├── loading-button.tsx
│   └── index.ts        # ✅ Barrel export (small folder)
├── forms/              # Shared form components
│   └── form-builder/
│       ├── form-builder.tsx
│       ├── field-editor.tsx
│       ├── field-palette.tsx
│       ├── form-preview.tsx
│       └── form-settings.tsx
├── navigation/         # Navigation components
│   ├── main-navigation.tsx
│   ├── footer.tsx
│   ├── dashboard-nav.tsx
│   └── index.ts        # ✅ Barrel export (small folder)
├── providers/          # Context providers
│   ├── theme-provider.tsx
│   └── index.ts        # ✅ Barrel export (small folder)
└── layouts/            # Layout wrappers
    └── (future layouts)
```

**Purpose**: Shared, reusable UI components. Feature-specific components belong in their respective modules.

**Import Strategy**:
- ❌ No barrel export for `ui/` (import directly from files)
- ✅ Barrel exports for small folders (`buttons/`, `navigation/`, `providers/`)

---

### 4. `/src/lib` - Core Libraries & Services

Core application utilities, API clients, and third-party integrations.

```
lib/
├── stores/             # State management stores
│   └── onboarding-store.ts
├── api.ts              # API client configuration
├── auth.ts             # Authentication utilities
├── supabase.ts         # Supabase client
├── slug.ts             # Slug generation utilities
├── utils.ts            # General utility functions
└── validation.ts       # Validation schemas
```

**Purpose**: Core services, API clients, and shared utilities that power the application.

---

### 5. `/src/hooks` - Shared React Hooks

Custom React hooks used across the application.

```
hooks/
├── index.ts            # Barrel export
├── use-api.ts          # API data fetching hook
├── use-debounce.ts     # Debounce hook
└── use-local-storage.ts # Local storage hook
```

**Purpose**: Reusable React hooks for common patterns.

---

### 6. `/src/constants` - Application Constants

Static configuration and constant values.

```
constants/
├── events.ts           # Event-related constants
├── microsite.ts        # Microsite configuration
├── onboarding.ts       # Onboarding flow constants
└── roles.ts            # Role definitions
```

**Purpose**: Centralized configuration and constants.

---

### 7. `/src/types` - Global TypeScript Types

Shared TypeScript type definitions.

```
types/
└── index.ts            # Global type definitions
```

**Purpose**: Application-wide TypeScript interfaces and types.

---

### 8. `/src/styles` - Global Styles

Global CSS and styling configuration.

```
styles/
└── globals.css         # Global styles, Tailwind imports
```

**Purpose**: Global styling and CSS configuration.

---

### 9. `/src/layout` - Layout Components & Wrappers

**Structural components that define the UI skeleton** - Navigation, guards, and page wrappers.

```
layout/
├── dashboard-layout.tsx      # Dashboard page wrapper
├── public-site-layout.tsx    # Public site wrapper
├── layout.tsx                # Root layout
├── navigation/               # Navigation primitives
│   ├── sidebar.tsx          # Main sidebar
│   ├── top-nav.tsx          # Top navigation bar
│   ├── breadcrumb.tsx       # Breadcrumb navigation
│   ├── main-navigation.tsx  # Public site navigation
│   ├── footer.tsx           # Site footer
│   ├── dashboard-nav.tsx    # Dashboard navigation
│   └── index.ts             # ✅ Barrel export
├── wrappers/                 # Layout utilities
│   ├── auth-guard.tsx       # Authentication wrapper
│   ├── role-guard.tsx       # Authorization wrapper
│   ├── page-wrapper.tsx     # Generic page container
│   └── index.ts             # ✅ Barrel export
└── index.ts                  # ✅ Barrel export
```

**Purpose**: Centralized UI skeleton and structural components shared across all modules.

**What Belongs Here**:
- ✅ Navigation (Sidebar, Topbar, Footer)
- ✅ Breadcrumbs
- ✅ Auth/Role guards
- ✅ Page wrappers
- ✅ Layout containers

**What Doesn't Belong**:
- ❌ Dashboard widgets
- ❌ Forms with business logic
- ❌ Feature-specific components

---

### 10. `/src/utilities` - Helper Functions

General-purpose utility functions (currently empty, ready for expansion).

```
utilities/
└── (helper functions)
```

**Purpose**: Shared utility functions that don't fit in other categories.

---

## Backend Architecture

```
backend/
└── .env.local          # Environment variables
```

**Note**: Backend structure is minimal in current setup. Expand as needed with similar modular patterns.

---

## Architecture Principles

### 1. **Modularity**
- Each feature is self-contained in its own module
- Modules can be developed, tested, and deployed independently
- Clear boundaries between features

### 2. **Separation of Concerns**
- Routes (`/main`) handle routing and page composition
- Modules (`/modules`) contain business logic
- Components (`/components`) handle UI presentation
- Libraries (`/lib`) provide core services

### 3. **Scalability**
- Easy to add new features by creating new modules
- Shared components promote code reuse
- Clear folder structure supports team growth

### 4. **Maintainability**
- Consistent naming conventions (kebab-case)
- Predictable file locations
- Self-documenting structure

### 5. **Plug-and-Play**
- Modules can be added or removed without affecting others
- Clear public APIs via `index.ts` exports
- Minimal coupling between features

---

## Import Patterns & Barrel Export Strategy

### Strategic Barrel Exports

We use **selective barrel exports** to balance developer experience with performance:

| Layer | Barrel Export | Reason |
|-------|--------------|--------|
| `components/ui/` | ❌ No | Import directly (tree-shaking) |
| `components/buttons/` | ✅ Yes | Small, cohesive folder |
| `components/navigation/` | ✅ Yes | Limited scope |
| `components/providers/` | ✅ Yes | Few files |
| `hooks/` | ✅ Yes | Global hooks |
| `modules/<feature>/` | ✅ Named only | Public API exports |

### Module Imports
```typescript
// ✅ Import from module's named entry points
import { AuthLayout } from '@/modules/auth'
import { Sidebar, TopNav } from '@/modules/dashboard'
import { MicrositeBuilder } from '@/modules/microsite'

// ✅ Import UI components directly (no barrel)
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// ✅ Import from small shared folders (with barrel)
import { Navigation, Footer } from '@/components/navigation'
import { ThemeToggle } from '@/components/buttons'
import { ThemeProvider } from '@/components/providers'

// ✅ Import shared hooks (with barrel)
import { useApi, useDebounce } from '@/hooks'

// ✅ Import from lib
import { api } from '@/lib/api'
import { supabase } from '@/lib/supabase'
```

### Why This Strategy?

**Direct Imports for UI Components:**
```typescript
// ❌ Bad: Breaks tree-shaking
import { Button, Card, Dialog } from '@/components/ui'

// ✅ Good: Enables tree-shaking
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
```

**Named Entry Points for Modules:**
```typescript
// ❌ Bad: Exports everything
// modules/microsite/index.ts
export * from './components'  // Breaks tree-shaking

// ✅ Good: Named exports only
// modules/microsite/index.ts
export { MicrositeBuilder } from './components/microsite-builder'
export { TemplateEditor } from './components/template-editor'
```

See [ADR 007: Barrel Exports Strategy](../adr/007-barrel-exports-strategy.md) for details.

### Path Aliases
Configure in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Adding New Features

### Step 1: Create Module Structure
```bash
mkdir -p src/modules/[feature-name]/{components,hooks,utilities}
touch src/modules/[feature-name]/{index.ts,type.ts}
```

### Step 2: Create Route (if needed)
```bash
mkdir -p src/main/[feature-name]
touch src/main/[feature-name]/page.tsx
```

### Step 3: Add Components
```bash
mkdir -p src/components/[feature-name]
```

### Step 4: Export Public API
In `src/modules/[feature-name]/index.ts`:
```typescript
export * from './components';
export * from './hooks';
export * from './type';
```

---

## Best Practices

1. **Always use kebab-case** for files and folders
2. **Keep modules independent** - avoid cross-module imports
3. **Use barrel exports** (`index.ts`) for clean imports
4. **Colocate related code** - keep feature code together
5. **Document complex features** - add README.md in module folders
6. **Type everything** - leverage TypeScript for safety
7. **Shared code goes in `/components`, `/hooks`, or `/lib`**
8. **Feature-specific code stays in `/modules`**

---

## Technology Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library in `/components/ui`
- **State Management**: Zustand (stores in `/lib/stores`)
- **Backend**: Supabase
- **Authentication**: Supabase Auth

---

## File Naming Examples

✅ **Correct (kebab-case)**:
- `auth-layout.tsx`
- `use-local-storage.ts`
- `form-builder.tsx`
- `onboarding-store.ts`

❌ **Incorrect**:
- `AuthLayout.tsx` (PascalCase)
- `useLocalStorage.ts` (camelCase)
- `form_builder.tsx` (snake_case)

---

## Conclusion

This architecture provides a solid foundation for building scalable, maintainable applications. The modular structure allows teams to work independently on features while maintaining consistency across the codebase.

For questions or suggestions, please refer to individual module README files or contact the development team.
