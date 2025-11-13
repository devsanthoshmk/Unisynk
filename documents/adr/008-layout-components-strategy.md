# ADR 008: Layout Components Strategy

**Status**: Accepted  
**Date**: 2025-11-13  
**Decision Makers**: Development Team  
**Tags**: layout, architecture, components, structure

---

## Context

In a plug-and-play modular architecture, we needed to distinguish between:
- **Structural/Layout components** (Sidebar, Topbar, Footer, Breadcrumbs)
- **Domain-specific components** (Dashboard widgets, forms, cards)

Layout components define the UI skeleton and are shared across multiple modules, while domain components contain business logic specific to features.

## Decision

**Move all structural layout components to `/layout` folder, organized by purpose.**

### Structure

```
layout/
├── dashboard-layout.tsx      # Dashboard page wrapper
├── public-site-layout.tsx    # Public marketing pages wrapper
├── navigation/               # Navigation primitives
│   ├── sidebar.tsx
│   ├── top-nav.tsx
│   ├── breadcrumb.tsx
│   ├── main-navigation.tsx
│   ├── footer.tsx
│   ├── dashboard-nav.tsx
│   └── index.ts
├── wrappers/                 # Layout utilities
│   ├── auth-guard.tsx
│   ├── role-guard.tsx
│   ├── page-wrapper.tsx
│   └── index.ts
├── layout.tsx                # Root layout
└── index.ts
```

## Rationale

### Why Separate Layout from Domain Components?

**Problems with Mixed Organization:**
- ❌ Unclear whether component is structural or domain-specific
- ❌ Layout components scattered across modules
- ❌ Difficult to maintain consistent UI skeleton
- ❌ Hard to update global navigation

**Benefits of Centralized Layout:**
- ✅ Clear separation: structure vs content
- ✅ Centralized control over UI skeleton
- ✅ Easier to maintain consistency
- ✅ Reusable across all modules
- ✅ Simpler testing of layout logic

### What Belongs in `/layout`?

**✅ Layout Components:**
- Navigation (Sidebar, Topbar, Navbar, Footer)
- Breadcrumbs
- Page wrappers
- Auth guards
- Role guards
- Layout containers

**❌ Not Layout Components:**
- Dashboard widgets
- Data tables
- Forms
- Cards with business logic
- Feature-specific UI

## Implementation

### Layout Wrapper Pattern

```typescript
// layout/dashboard-layout.tsx
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### Usage in Pages

```typescript
// app/dashboard/page.tsx
import { DashboardLayout } from '@/layout'
import { QuickActions, RecentActivity } from '@/modules/dashboard'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
      <QuickActions />
      <RecentActivity />
    </DashboardLayout>
  )
}
```

### Auth Guard Pattern

```typescript
// layout/wrappers/auth-guard.tsx
export function AuthGuard({ children, requireAuth = true }) {
  const router = useRouter()
  
  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [requireAuth])
  
  return <>{children}</>
}

// Usage
<AuthGuard>
  <DashboardLayout>
    <DashboardPage />
  </DashboardLayout>
</AuthGuard>
```

### Role Guard Pattern

```typescript
// layout/wrappers/role-guard.tsx
export function RoleGuard({ 
  children, 
  allowedRoles,
  fallback = <AccessDenied />
}) {
  const { userRole } = useAuth()
  
  if (!allowedRoles.includes(userRole)) {
    return fallback
  }
  
  return <>{children}</>
}

// Usage
<RoleGuard allowedRoles={['admin', 'editor']}>
  <AdminPanel />
</RoleGuard>
```

## Consequences

### Positive

- Clear mental model: layout vs content
- Centralized UI skeleton management
- Consistent navigation across modules
- Easy to update global layout
- Better code organization
- Simpler testing

### Negative

- Need to move existing components
- Update import paths
- Team needs to learn distinction

### Neutral

- Requires documentation
- Need clear guidelines

## Component Classification

### Layout Components (in `/layout`)

| Component | Location | Purpose |
|-----------|----------|---------|
| Sidebar | `layout/navigation/sidebar.tsx` | Main navigation sidebar |
| TopNav | `layout/navigation/top-nav.tsx` | Top navigation bar |
| Breadcrumb | `layout/navigation/breadcrumb.tsx` | Breadcrumb navigation |
| MainNavigation | `layout/navigation/main-navigation.tsx` | Public site nav |
| Footer | `layout/navigation/footer.tsx` | Site footer |
| DashboardNav | `layout/navigation/dashboard-nav.tsx` | Dashboard-specific nav |
| AuthGuard | `layout/wrappers/auth-guard.tsx` | Authentication wrapper |
| RoleGuard | `layout/wrappers/role-guard.tsx` | Authorization wrapper |
| PageWrapper | `layout/wrappers/page-wrapper.tsx` | Generic page container |

### Domain Components (in `/modules`)

| Component | Location | Purpose |
|-----------|----------|---------|
| QuickActions | `modules/dashboard/components/` | Dashboard actions |
| RecentActivity | `modules/dashboard/components/` | Activity feed |
| RoleManagement | `modules/dashboard/components/` | Role management UI |
| FormBuilder | `components/forms/` | Form building tool |

## Migration Strategy

### Step 1: Identify Layout Components

```bash
# Components that are layout primitives:
- Sidebar, Topbar, Navbar
- Breadcrumbs
- Footer
- Navigation menus
```

### Step 2: Move to `/layout`

```bash
# Move from modules/dashboard/components/
mv sidebar.tsx → layout/navigation/sidebar.tsx
mv top-nav.tsx → layout/navigation/top-nav.tsx
mv breadcrumb.tsx → layout/navigation/breadcrumb.tsx

# Move from components/navigation/
mv main-navigation.tsx → layout/navigation/main-navigation.tsx
mv footer.tsx → layout/navigation/footer.tsx
```

### Step 3: Create Layout Wrappers

```typescript
// Create dashboard-layout.tsx
// Create public-site-layout.tsx
// Create auth-guard.tsx
// Create role-guard.tsx
```

### Step 4: Update Imports

```typescript
// Before
import { Sidebar } from '@/modules/dashboard'
import { Navigation } from '@/components/navigation'

// After
import { Sidebar, Navigation } from '@/layout'
import { DashboardLayout } from '@/layout'
```

## Best Practices

### 1. Use Layout Wrappers

```typescript
// ✅ Good: Use layout wrapper
<DashboardLayout>
  <DashboardContent />
</DashboardLayout>

// ❌ Avoid: Manually composing layout
<div>
  <Sidebar />
  <TopNav />
  <DashboardContent />
</div>
```

### 2. Compose Layouts

```typescript
// Compose multiple wrappers
<AuthGuard>
  <RoleGuard allowedRoles={['admin']}>
    <DashboardLayout>
      <AdminPanel />
    </DashboardLayout>
  </RoleGuard>
</AuthGuard>
```

### 3. Keep Layout Logic Separate

```typescript
// ✅ Good: Layout handles structure
// layout/dashboard-layout.tsx
export function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}

// ❌ Avoid: Mixing layout with business logic
export function DashboardLayout({ children, fetchData }) {
  useEffect(() => fetchData(), []) // Business logic
  return <div>...</div>
}
```

### 4. Use PageWrapper for Consistency

```typescript
// Consistent page padding and max-width
<PageWrapper maxWidth="xl" padding>
  <h1>Page Title</h1>
  <Content />
</PageWrapper>
```

## Import Patterns

```typescript
// Layout components
import { DashboardLayout, PublicSiteLayout } from '@/layout'
import { Sidebar, TopNav, Breadcrumb } from '@/layout/navigation'
import { AuthGuard, RoleGuard } from '@/layout/wrappers'

// Domain components
import { QuickActions, RecentActivity } from '@/modules/dashboard'
import { FormBuilder } from '@/components/forms'
```

## Compliance

### Code Review Checklist

- [ ] Layout components in `/layout`, not `/modules`
- [ ] Domain components in `/modules`, not `/layout`
- [ ] Pages use layout wrappers
- [ ] No business logic in layout components
- [ ] Consistent use of guards and wrappers

## Related Decisions

- [ADR 001: Folder Structure](./001-folder-structure-and-modularity.md)
- [ADR 007: Barrel Exports Strategy](./007-barrel-exports-strategy.md)

## References

- [Next.js Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [React Composition Patterns](https://reactpatterns.com/)

---

**Last Updated**: 2025-11-13  
**Review Date**: 2026-02-13 (3 months)
