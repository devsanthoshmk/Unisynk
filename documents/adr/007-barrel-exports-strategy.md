# ADR 007: Barrel Exports Strategy

**Status**: Accepted  
**Date**: 2025-11-13  
**Decision Makers**: Development Team  
**Tags**: imports, exports, tree-shaking, performance

---

## Context

Barrel exports (index.ts files that re-export multiple modules) can improve developer experience but may harm:
- Tree-shaking effectiveness
- Bundle size
- Build performance
- Dependency clarity

We needed a strategic approach that balances DX with performance.

## Decision

**Use barrel exports selectively and strategically based on folder type and complexity.**

### Rules

| Layer | Barrel Export | Rationale |
|-------|--------------|-----------|
| `components/buttons/` | ✅ Yes | Small, isolated, frequently used together |
| `components/forms/` | ✅ Yes | Shared UI elements |
| `components/navigation/` | ✅ Yes | Limited scope, clear boundaries |
| `components/ui/` | ❌ No | Import directly from files |
| `hooks/` | ✅ Yes | Global hooks, small files |
| `utilities/` | ✅ Yes | Common helpers |
| `types/` | ✅ Yes | Type-only exports (no runtime cost) |
| `modules/<feature>/components/` | ✅ Yes | Local barrel for internal use |
| `modules/<feature>/` root | ❌ No | Use named entry points instead |
| `app/` | ❌ No | Keep explicit for routing clarity |

## Rationale

### Why Selective Barrel Exports?

**Problems with Universal Barrel Exports:**
- ❌ Breaks tree-shaking in large modules
- ❌ Increases bundle size
- ❌ Obscures dependency boundaries
- ❌ Slower build times
- ❌ Circular dependency risks

**Benefits of Strategic Barrel Exports:**
- ✅ Better DX for small, cohesive folders
- ✅ Cleaner imports for shared utilities
- ✅ Maintains tree-shaking for large modules
- ✅ Clear module boundaries

## Implementation

### ✅ Use Barrel Exports: Small Shared Folders

```typescript
// components/buttons/index.ts
export { ThemeToggle } from './theme-toggle'
export { LoadingButton } from './loading-button'
export { IconButton } from './icon-button'

// Usage
import { ThemeToggle, LoadingButton } from '@/components/buttons'
```

```typescript
// hooks/index.ts
export { useApi } from './use-api'
export { useDebounce } from './use-debounce'
export { useLocalStorage } from './use-local-storage'

// Usage
import { useApi, useDebounce } from '@/hooks'
```

```typescript
// utilities/index.ts
export { formatDate } from './format-date'
export { validateEmail } from './validate-email'
export { logger } from './logger'

// Usage
import { formatDate, validateEmail } from '@/utilities'
```

### ✅ Use Named Entry Points: Large Modules

```typescript
// modules/microsite/index.ts
// ✅ Export only public API, not everything
export { MicrositeBuilder } from './components/microsite-builder'
export { MicrositePreview } from './components/microsite-preview'
export { useMicrositeSections } from './hooks/use-microsite-sections'
export { useMicrositeTheme } from './hooks/use-microsite-theme'
export type { MicrositeSettings, MicrositeTheme } from './types'

// ❌ Don't do this:
// export * from './components'  // Too broad
// export * from './hooks'       // Breaks tree-shaking
```

### ❌ Avoid Barrel Exports: UI Components

```typescript
// components/ui/index.ts - DON'T CREATE THIS

// ✅ Instead, import directly
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// ❌ Avoid
import { Button, Card } from '@/components/ui'  // Breaks tree-shaking
```

### ✅ Use Barrel Exports: Module Internals

```typescript
// modules/dashboard/components/index.ts
// Local barrel for internal module use
export { Sidebar } from './sidebar'
export { TopNav } from './top-nav'
export { Breadcrumb } from './breadcrumb'

// modules/dashboard/index.ts
// Public API - named exports only
export { Sidebar, TopNav } from './components'
export { useDashboardStats } from './hooks/use-dashboard-stats'
export type { DashboardConfig } from './types'
```

## Patterns and Best Practices

### Pattern 1: Small Shared Folders

```typescript
// ✅ Good for: buttons, navigation, providers
// components/navigation/index.ts
export { Navigation } from './main-navigation'
export { Footer } from './footer'
export { DashboardNav } from './dashboard-nav'

// Usage
import { Navigation, Footer } from '@/components/navigation'
```

### Pattern 2: Large Module Entry Points

```typescript
// ✅ Good for: feature modules
// modules/automation/index.ts
export { AutomationBuilder } from './components/automation-builder'
export { AutomationList } from './components/automation-list'
export { useAutomations } from './hooks/use-automations'
export type { Automation, AutomationTrigger } from './types'

// ❌ Don't export everything
// export * from './components'  // NO
// export * from './hooks'       // NO
```

### Pattern 3: Type-Only Exports

```typescript
// ✅ Safe for types (no runtime cost)
// types/index.ts
export type { User, UserRole } from './user'
export type { Event, EventStatus } from './event'
export type { Organization } from './organization'

// Usage
import type { User, Event } from '@/types'
```

### Pattern 4: Utility Functions

```typescript
// ✅ Good for small utility collections
// lib/utils/index.ts
export { cn } from './cn'
export { formatDate } from './format-date'
export { slugify } from './slugify'

// Usage
import { cn, formatDate } from '@/lib/utils'
```

## Decision Matrix

### Should I Create a Barrel Export?

Ask these questions:

1. **Is the folder small?** (< 10 files)
   - Yes → Consider barrel export
   - No → Use named entry points

2. **Are items frequently used together?**
   - Yes → Barrel export OK
   - No → Direct imports better

3. **Is it a shared utility folder?**
   - Yes → Barrel export recommended
   - No → Evaluate case-by-case

4. **Is it a large feature module?**
   - Yes → Named entry points only
   - No → Barrel export OK

5. **Are there circular dependency risks?**
   - Yes → Avoid barrel export
   - No → Safe to use

## Examples by Folder Type

### ✅ Barrel Export: Buttons

```typescript
// components/buttons/index.ts
export { ThemeToggle } from './theme-toggle'
export { LoadingButton } from './loading-button'
export { IconButton } from './icon-button'
```

### ✅ Barrel Export: Hooks

```typescript
// hooks/index.ts
export { useApi } from './use-api'
export { useDebounce } from './use-debounce'
export { useLocalStorage } from './use-local-storage'
```

### ❌ No Barrel: UI Components

```typescript
// ❌ Don't create components/ui/index.ts

// ✅ Import directly
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
```

### ✅ Named Entry: Feature Module

```typescript
// modules/microsite/index.ts
export { MicrositeBuilder } from './components/microsite-builder'
export { TemplateEditor } from './components/template-editor'
export { useMicrositeSections } from './hooks/use-microsite-sections'
export type { MicrositeSettings } from './types'
```

## Performance Impact

### Tree-Shaking Test

```typescript
// ❌ Bad: Barrel export breaks tree-shaking
// components/ui/index.ts
export * from './button'
export * from './card'
export * from './dialog'
// ... 20+ components

// Usage (only imports Button, but bundles everything)
import { Button } from '@/components/ui'

// ✅ Good: Direct import enables tree-shaking
import { Button } from '@/components/ui/button'
```

### Bundle Size Impact

| Approach | Bundle Size | Tree-Shaking |
|----------|-------------|--------------|
| Direct imports | Optimal | ✅ Works |
| Small barrel (< 10 files) | +1-2KB | ✅ Works |
| Large barrel (> 20 files) | +10-50KB | ❌ Broken |
| Named entry points | Optimal | ✅ Works |

## Migration Strategy

### Audit Existing Barrels

```bash
# Find all index.ts files
find frontend/src -name "index.ts"

# Check file count in each folder
ls -la components/ui/ | wc -l
```

### Refactor Large Barrels

```typescript
// Before: components/ui/index.ts (BAD)
export * from './button'
export * from './card'
// ... 30+ exports

// After: Remove barrel, use direct imports
// Delete components/ui/index.ts

// Update imports
- import { Button } from '@/components/ui'
+ import { Button } from '@/components/ui/button'
```

### Create Named Entry Points

```typescript
// Before: modules/microsite/index.ts (BAD)
export * from './components'
export * from './hooks'

// After: Named exports (GOOD)
export { MicrositeBuilder } from './components/microsite-builder'
export { useMicrositeSections } from './hooks/use-microsite-sections'
```

## Compliance

### Code Review Checklist

- [ ] No barrel exports in `components/ui/`
- [ ] No `export *` in large modules
- [ ] Named exports in module entry points
- [ ] Barrel exports only in small folders (< 10 files)
- [ ] Type-only exports use `export type`

### ESLint Rules (Future)

```javascript
// .eslintrc.js
rules: {
  'no-restricted-syntax': [
    'error',
    {
      selector: 'ExportAllDeclaration',
      message: 'Avoid export * - use named exports'
    }
  ]
}
```

## Related Decisions

- [ADR 001: Folder Structure](./001-folder-structure-and-modularity.md)
- [ADR 004: Import Path Aliases](./004-import-path-aliases.md)

## References

- [Tree-Shaking and Barrel Files](https://webpack.js.org/guides/tree-shaking/)
- [The Cost of Barrel Files](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/)
- [Module Resolution Best Practices](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

---

**Last Updated**: 2025-11-13  
**Review Date**: 2026-02-13 (3 months)
