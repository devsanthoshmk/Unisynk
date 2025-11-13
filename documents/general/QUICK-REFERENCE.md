# Quick Reference Guide

## Import Patterns

### ✅ Correct Import Syntax

```typescript
// UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Module Components (from feature modules)
import { AuthLayout } from "@/modules/auth"
import { Sidebar, TopNav } from "@/modules/dashboard"
import { OnboardingFlow } from "@/modules/onboarding"

// Shared Form Components
import { FormBuilder } from "@/components/forms"

// Modules (named entry points)
import { MicrositeBuilder, TemplateEditor } from "@/modules/microsite"
import { AuthLayout } from "@/modules/auth"
import { RegistrationFlow } from "@/modules/registration"

// Hooks
import { useApi, useDebounce } from "@/hooks"
import { useLocalStorage } from "@/hooks/use-local-storage"

// Lib/Utils
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import { supabase } from "@/lib/supabase"

// Constants
import { ROLES } from "@/constants/roles"
import { EVENT_TYPES } from "@/constants/events"

// Types
import type { User, Event } from "@/types"
```

### ❌ Incorrect Import Syntax

```typescript
// DON'T use @/src/ prefix
import { Button } from "@/src/components/ui/button" // ❌

// DON'T use relative paths for shared code
import { Button } from "../../../components/ui/button" // ❌

// DON'T use absolute paths
import { Button } from "frontend/src/components/ui/button" // ❌

// DON'T use barrel exports for UI components
import { Button, Card } from "@/components/ui" // ❌ Breaks tree-shaking

// DON'T use export * in modules
// modules/microsite/index.ts
export * from './components' // ❌ Breaks tree-shaking
```

---

## File Naming Convention

### ✅ Correct (kebab-case)

```
components/
├── auth-layout.tsx          ✅
├── theme-provider.tsx       ✅
├── dashboard-nav.tsx        ✅
└── ui/
    ├── button.tsx           ✅
    ├── dropdown-menu.tsx    ✅
    └── file-upload.tsx      ✅

hooks/
├── use-api.ts               ✅
├── use-debounce.ts          ✅
└── use-local-storage.ts     ✅

lib/
├── api.ts                   ✅
├── utils.ts                 ✅
└── stores/
    └── onboarding-store.ts  ✅
```

### ❌ Incorrect

```
components/
├── AuthLayout.tsx           ❌ (PascalCase)
├── themeProvider.tsx        ❌ (camelCase)
├── Dashboard_Nav.tsx        ❌ (snake_case)

hooks/
├── useApi.ts                ❌ (camelCase)
├── UseDebounce.ts           ❌ (PascalCase)

lib/
├── apiClient.ts             ❌ (camelCase)
└── stores/
    └── onboardingStore.ts   ❌ (camelCase)
```

---

## Folder Structure Quick Map

```
frontend/src/
├── app/                    # Next.js routes (pages)
│   ├── dashboard/         # /dashboard route
│   ├── auth/              # /auth route
│   └── api/               # API routes
│
├── modules/               # Feature modules (business logic)
│   ├── auth/
│   ├── dashboard/
│   └── microsite/
│
├── components/            # Shared UI components
│   ├── ui/               # Base components
│   ├── auth/             # Auth components
│   └── dashboard/        # Dashboard components
│
├── lib/                   # Core utilities & services
│   ├── api.ts
│   ├── utils.ts
│   └── stores/
│
├── hooks/                 # Custom React hooks
├── constants/             # App constants
├── types/                 # TypeScript types
└── styles/                # Global styles
```

---

## Module Structure Pattern

Every module follows this structure:

```
modules/[feature-name]/
├── components/            # Feature-specific components
├── hooks/                # Feature-specific hooks
├── utils/                # Feature-specific utilities
├── types.ts              # Feature types
└── index.ts              # Public API exports
```

### Example: Creating a new module

```typescript
// modules/analytics/index.ts
export * from './components'
export * from './hooks'
export * from './types'

// Usage in other files:
import { AnalyticsDashboard, useAnalytics } from '@/modules/analytics'
```

---

## Common Patterns

### Creating a new component

```typescript
// components/ui/my-component.tsx
import { cn } from "@/lib/utils"

interface MyComponentProps {
  className?: string
  children: React.ReactNode
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  )
}
```

### Creating a new hook

```typescript
// hooks/use-my-hook.ts
import { useState, useEffect } from 'react'

export function useMyHook() {
  const [state, setState] = useState()
  
  useEffect(() => {
    // Hook logic
  }, [])
  
  return { state, setState }
}

// Export from hooks/index.ts
export * from './use-my-hook'
```

### Creating a new page

```typescript
// app/my-page/page.tsx
import { Button } from "@/components/ui/button"
import { MyFeature } from "@/modules/my-feature"

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <MyFeature />
    </div>
  )
}
```

---

## Path Alias Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

This means:
- `@/components` → `frontend/src/components`
- `@/lib` → `frontend/src/lib`
- `@/hooks` → `frontend/src/hooks`
- etc.

---

## Best Practices

1. **Always use `@/` imports** for shared code
2. **Use relative imports** only within the same module
3. **Keep file names in kebab-case**
4. **Export from `index.ts`** for clean imports
5. **Colocate related code** in modules
6. **Use TypeScript** for type safety

---

## Quick Commands

```bash
# Check for import issues
npm run build

# Run development server
npm run dev

# Lint code
npm run lint
```

---

**Last Updated**: November 13, 2025
