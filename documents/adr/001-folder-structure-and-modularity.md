# ADR 001: Folder Structure and Modularity

**Status**: Accepted  
**Date**: 2025-11-13  
**Decision Makers**: Development Team  
**Tags**: architecture, structure, modularity

---

## Context

We needed to establish a scalable, maintainable folder structure for a Next.js 16 application that supports:
- Multiple feature teams working independently
- Easy onboarding for new developers
- Clear separation of concerns
- Plug-and-play feature modules
- Long-term maintainability

## Decision

We adopted a **feature-based modular architecture** with the following structure:

```
frontend/src/
├── app/                    # Next.js App Router (routes only)
├── modules/                # Feature modules (business logic)
├── components/             # Shared UI components
├── lib/                    # Core utilities & services
├── hooks/                  # Shared React hooks
├── constants/              # Application constants
├── types/                  # Global TypeScript types
└── styles/                 # Global styles
```

### Key Principles

1. **Routes vs Logic Separation**
   - `app/` contains only routing and page composition
   - `modules/` contains all business logic and feature-specific code

2. **Module Structure**
   - Each module is self-contained with its own components, hooks, and utilities
   - Modules export a public API via `index.ts`
   - Modules can be developed and tested independently

3. **Shared Code**
   - Truly shared components go in `components/`
   - Shared utilities go in `lib/`
   - Feature-specific code stays in modules

## Rationale

### Why Feature-Based Modules?

**Pros:**
- ✅ Clear boundaries between features
- ✅ Easy to add/remove features
- ✅ Teams can work independently
- ✅ Better code organization at scale
- ✅ Easier to understand and navigate

**Cons:**
- ❌ Initial setup overhead
- ❌ Requires discipline to maintain boundaries
- ❌ May have some code duplication

**Alternatives Considered:**
1. **Flat structure** - Rejected: Doesn't scale well
2. **Layer-based** (all components together) - Rejected: Hard to find feature-specific code
3. **Domain-driven design** - Considered but too complex for current needs

### Why Separate `app/` and `modules/`?

- Next.js App Router requires specific folder structure
- Keeps routing concerns separate from business logic
- Makes it clear what's a route vs what's reusable logic
- Easier to test business logic without routing concerns

## Consequences

### Positive

- Clear mental model for where code belongs
- Easy to onboard new developers
- Features can be developed in parallel
- Reduced merge conflicts
- Better code reusability

### Negative

- Requires documentation and training
- Need to enforce boundaries (no cross-module imports)
- Initial setup takes longer

### Neutral

- Need to decide: shared component vs module component
- Requires consistent naming conventions

## Implementation

### Module Creation Pattern

```typescript
// modules/[feature]/
├── components/        # Feature UI
├── hooks/            # Feature hooks
├── utils/            # Feature utilities
├── types.ts          # Feature types
└── index.ts          # Public API

// modules/[feature]/index.ts
export * from './components'
export * from './hooks'
export * from './types'
```

### Import Rules

```typescript
// ✅ Allowed
import { Button } from '@/components/ui/button'
import { useAuth } from '@/modules/auth'
import { api } from '@/lib/api'

// ❌ Not allowed
import { AuthForm } from '@/modules/auth/components/auth-form'  // Use public API
import { DashboardWidget } from '@/modules/dashboard'  // Cross-module import
```

## Compliance

- All new features must follow module structure
- Code reviews must check for proper organization
- Linting rules enforce import patterns

## Related Decisions

- [ADR 002: Naming Conventions](./002-naming-conventions.md)
- [ADR 003: State Management](./003-state-management.md)
- [ADR 004: Import Path Aliases](./004-import-path-aliases.md)

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Modular Architecture Patterns](https://www.patterns.dev/posts/module-pattern)

---

**Last Updated**: 2025-11-13  
**Review Date**: 2026-02-13 (3 months)
