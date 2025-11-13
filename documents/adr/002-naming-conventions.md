# ADR 002: Naming Conventions

**Status**: Accepted  
**Date**: 2025-11-13  
**Decision Makers**: Development Team  
**Tags**: conventions, naming, code-style

---

## Context

Inconsistent naming conventions lead to:
- Confusion about file locations
- Merge conflicts from case-sensitivity issues
- Difficulty in code navigation
- Inconsistent developer experience

We needed a single, clear naming standard for the entire codebase.

## Decision

**All files and folders must use kebab-case naming convention.**

### Rules

1. **Files**: `kebab-case.tsx`, `kebab-case.ts`
2. **Folders**: `kebab-case/`
3. **Components**: Exported in PascalCase, file in kebab-case
4. **Hooks**: Exported as camelCase, file in kebab-case
5. **Constants**: UPPER_SNAKE_CASE in code, kebab-case file

### Examples

```
✅ Correct:
components/
├── auth-layout.tsx          → export function AuthLayout()
├── theme-provider.tsx       → export function ThemeProvider()
├── dashboard-nav.tsx        → export function DashboardNav()

hooks/
├── use-api.ts               → export function useApi()
├── use-debounce.ts          → export function useDebounce()
├── use-local-storage.ts     → export function useLocalStorage()

lib/
├── api-client.ts
├── form-validation.ts
└── stores/
    └── onboarding-store.ts

constants/
├── event-types.ts           → export const EVENT_TYPES
├── user-roles.ts            → export const USER_ROLES

❌ Incorrect:
components/
├── AuthLayout.tsx           (PascalCase)
├── themeProvider.tsx        (camelCase)
├── Dashboard_Nav.tsx        (snake_case)

hooks/
├── useApi.ts                (camelCase)
├── UseDebounce.ts           (PascalCase)
```

## Rationale

### Why kebab-case?

**Pros:**
- ✅ Case-insensitive file systems (Windows/Mac) handle it consistently
- ✅ URL-friendly (matches route naming)
- ✅ Easy to read and type
- ✅ Widely adopted in modern frameworks (Next.js, Vue, Angular)
- ✅ No ambiguity about capitalization

**Cons:**
- ❌ Different from React component naming (PascalCase)
- ❌ Requires discipline to maintain

**Alternatives Considered:**

1. **PascalCase** (AuthLayout.tsx)
   - Rejected: Case-sensitivity issues on different OS
   - Rejected: Doesn't match Next.js conventions

2. **camelCase** (authLayout.tsx)
   - Rejected: Less readable
   - Rejected: Not URL-friendly

3. **snake_case** (auth_layout.tsx)
   - Rejected: Not idiomatic in JavaScript ecosystem
   - Rejected: Harder to type

### Industry Alignment

- **Next.js**: Uses kebab-case for routes and files
- **Vue.js**: Recommends kebab-case for components
- **Angular**: Uses kebab-case for files
- **Tailwind CSS**: Uses kebab-case for config files

## Consequences

### Positive

- Consistent codebase
- No case-sensitivity issues
- Easy to find files
- Matches URL structure
- Better cross-platform compatibility

### Negative

- File name differs from export name
- Need to train developers on convention
- Existing codebases may need migration

### Neutral

- Requires linting rules to enforce
- Need clear documentation

## Implementation

### File Naming Pattern

```typescript
// file: auth-layout.tsx
export function AuthLayout() {
  return <div>Auth Layout</div>
}

// file: use-local-storage.ts
export function useLocalStorage(key: string) {
  // hook implementation
}

// file: api-client.ts
export const apiClient = {
  // client implementation
}

// file: event-types.ts
export const EVENT_TYPES = {
  CONFERENCE: 'conference',
  WORKSHOP: 'workshop',
} as const
```

### Import Pattern

```typescript
// Component imports
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/ui/button'

// Hook imports
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useApi } from '@/hooks/use-api'

// Utility imports
import { apiClient } from '@/lib/api-client'
import { cn } from '@/lib/utils'

// Constant imports
import { EVENT_TYPES } from '@/constants/event-types'
```

### Folder Naming

```
✅ Correct:
src/
├── form-builder/
├── user-management/
├── event-dashboard/
└── micro-site/

❌ Incorrect:
src/
├── FormBuilder/
├── userManagement/
├── Event_Dashboard/
└── microSite/
```

## Compliance

### Enforcement

1. **ESLint Rule**: Custom rule to check file naming
2. **Pre-commit Hook**: Validate naming before commit
3. **CI/CD**: Fail build on naming violations
4. **Code Review**: Check naming in PR reviews

### Migration Strategy

For existing files:
1. Create script to rename files
2. Update all imports automatically
3. Test thoroughly
4. Deploy in single PR to avoid conflicts

### Exceptions

- `README.md`, `CHANGELOG.md`, `LICENSE` - Keep uppercase
- `page.tsx`, `layout.tsx`, `route.ts` - Next.js conventions
- `globals.css` - Framework conventions

## Examples

### Component File

```typescript
// file: components/ui/dropdown-menu.tsx
import * as React from 'react'

export function DropdownMenu() {
  return <div>Dropdown Menu</div>
}

export function DropdownMenuItem() {
  return <div>Menu Item</div>
}
```

### Hook File

```typescript
// file: hooks/use-debounce.ts
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}
```

### Utility File

```typescript
// file: lib/form-validation.ts
import { z } from 'zod'

export const emailSchema = z.string().email()

export function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success
}
```

## Related Decisions

- [ADR 001: Folder Structure](./001-folder-structure-and-modularity.md)
- [ADR 004: Import Path Aliases](./004-import-path-aliases.md)

## References

- [Next.js File Conventions](https://nextjs.org/docs/app/building-your-application/routing#file-conventions)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#file-name)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#naming-conventions)

---

**Last Updated**: 2025-11-13  
**Review Date**: 2026-02-13 (3 months)
