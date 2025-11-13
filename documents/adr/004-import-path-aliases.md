# ADR 004: Import Path Aliases

**Status**: Accepted  
**Date**: 2025-11-13  
**Decision Makers**: Development Team  
**Tags**: imports, typescript, developer-experience

---

## Context

As the codebase grows, relative imports become problematic:
- Deep nesting: `../../../../components/ui/button`
- Hard to refactor and move files
- Difficult to understand file relationships
- Inconsistent import paths

We needed a clean, consistent way to import modules across the application.

## Decision

**Use TypeScript path aliases with `@/` prefix for all imports from `src/`.**

### Configuration

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

### Import Pattern

```typescript
// ✅ Use path aliases
import { Button } from '@/components/ui/button'
import { useAuth } from '@/modules/auth'
import { api } from '@/lib/api'

// ❌ Avoid relative imports for shared code
import { Button } from '../../../../components/ui/button'
import { useAuth } from '../../../modules/auth'
```

## Rationale

### Why `@/` Prefix?

**Pros:**
- ✅ Clear distinction from node_modules imports
- ✅ Short and easy to type
- ✅ Industry standard (Next.js, Vue, Nuxt)
- ✅ Works with IDE autocomplete
- ✅ Easy to refactor

**Cons:**
- ❌ Requires configuration
- ❌ May conflict with scoped packages (rare)

**Alternatives Considered:**

1. **`~/` prefix**
   - Rejected: Can conflict with home directory
   - Less common in TypeScript ecosystem

2. **`src/` prefix**
   - Rejected: Longer to type
   - Less clean visually

3. **Multiple aliases** (`@components/`, `@lib/`, etc.)
   - Rejected: Too many aliases to remember
   - Harder to maintain

4. **Relative imports only**
   - Rejected: Becomes unmaintainable
   - Hard to refactor

## Consequences

### Positive

- Clean, readable imports
- Easy to move files
- Consistent across codebase
- Better IDE support
- Easier code reviews

### Negative

- Requires tsconfig setup
- Need to educate team
- May confuse beginners

### Neutral

- Need to decide: alias vs relative
- Requires documentation

## Implementation

### Import Rules

```typescript
// Rule 1: Use @/ for anything in src/
import { Button } from '@/components/ui/button'
import { useApi } from '@/hooks/use-api'
import { EVENT_TYPES } from '@/constants/events'

// Rule 2: Use relative imports within same module
// File: modules/auth/components/login-form.tsx
import { validateEmail } from '../utils/validation'
import type { AuthState } from '../types'

// Rule 3: External packages use normal imports
import { useState } from 'react'
import { z } from 'zod'
```


### Path Mapping

| Alias | Resolves To | Usage |
|-------|-------------|-------|
| `@/components` | `src/components` | UI components |
| `@/modules` | `src/modules` | Feature modules |
| `@/lib` | `src/lib` | Utilities & services |
| `@/hooks` | `src/hooks` | Custom hooks |
| `@/types` | `src/types` | TypeScript types |
| `@/constants` | `src/constants` | Constants |
| `@/styles` | `src/styles` | Global styles |

### Examples by File Type

```typescript
// Component imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AuthLayout } from '@/components/auth/auth-layout'

// Module imports
import { useAuth, AuthForm } from '@/modules/auth'
import { MicrositeSetup } from '@/modules/microsite'

// Hook imports
import { useApi } from '@/hooks/use-api'
import { useDebounce } from '@/hooks/use-debounce'

// Lib imports
import { cn } from '@/lib/utils'
import { api } from '@/lib/api'
import { supabase } from '@/lib/supabase'

// Type imports
import type { User, Event } from '@/types'

// Constant imports
import { ROLES } from '@/constants/roles'
import { EVENT_TYPES } from '@/constants/events'
```

## Best Practices

### 1. Prefer Aliases Over Relative

```typescript
// ❌ Avoid
import { Button } from '../../../components/ui/button'

// ✅ Prefer
import { Button } from '@/components/ui/button'
```

### 2. Use Relative Within Same Module

```typescript
// File: modules/auth/components/login-form.tsx

// ✅ Good - relative within module
import { validateEmail } from '../utils/validation'
import type { AuthState } from '../types'

// ❌ Avoid - alias within same module
import { validateEmail } from '@/modules/auth/utils/validation'
```

### 3. Group Imports Logically

```typescript
// External dependencies
import { useState, useEffect } from 'react'
import { z } from 'zod'

// Internal aliases
import { Button } from '@/components/ui/button'
import { useAuth } from '@/modules/auth'
import { api } from '@/lib/api'

// Relative imports
import { helper } from './utils'
import type { Props } from './types'
```

### 4. Type Imports

```typescript
// Use type imports for types only
import type { User } from '@/types'
import type { AuthState } from '@/modules/auth'

// Regular imports for values
import { Button } from '@/components/ui/button'
```

## IDE Configuration

### VS Code

```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "javascript.preferences.importModuleSpecifier": "non-relative"
}
```

### WebStorm

- Automatically recognizes tsconfig.json paths
- Use "Optimize Imports" to clean up

## Migration

### From Relative to Aliases

```bash
# Find all relative imports
grep -r "from '\.\." src/

# Use codemod or manual replacement
# Example: Replace ../../../../components with @/components
```

### Automated Script

```javascript
// scripts/fix-imports.js
const fs = require('fs')
const path = require('path')

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  
  // Replace relative imports with aliases
  content = content.replace(
    /from ['"](\.\.\/)+(components|lib|hooks|types|constants)/g,
    "from '@/$2"
  )
  
  fs.writeFileSync(filePath, content)
}
```

## Troubleshooting

### Issue: Imports not resolving

**Solution**: Restart TypeScript server
- VS Code: `Cmd/Ctrl + Shift + P` → "Restart TS Server"
- Check tsconfig.json is correct

### Issue: Build fails with alias imports

**Solution**: Ensure Next.js config is correct
```javascript
// next.config.js - Next.js handles this automatically
```

### Issue: Tests can't resolve aliases

**Solution**: Configure Jest/Vitest
```javascript
// vitest.config.ts
export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
```

## Compliance

- All new code must use `@/` aliases
- No relative imports for shared code
- Relative imports only within same module
- Code reviews check import patterns

## Related Decisions

- [ADR 001: Folder Structure](./001-folder-structure-and-modularity.md)
- [ADR 002: Naming Conventions](./002-naming-conventions.md)

## References

- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [Next.js Absolute Imports](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases)

---

**Last Updated**: 2025-11-13  
**Review Date**: 2026-02-13 (3 months)
