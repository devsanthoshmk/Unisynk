# Layout Reorganization Summary

**Date**: 2025-11-13  
**Status**: ✅ Complete

---

## Overview

Reorganized layout components to follow proper separation between **structural primitives** (layout) and **domain-specific components** (modules). This aligns with Unisynk's plug-and-play modular architecture.

---

## Key Principle

**Layout components define the UI skeleton and are shared across multiple modules.**

- **Layout Components** → `/layout` (Sidebar, Topbar, Footer, Guards)
- **Domain Components** → `/modules` (Dashboard widgets, forms, business logic)

---

## Changes Made

### 1. Created Layout Structure

```
layout/
├── dashboard-layout.tsx      # ✅ New: Dashboard wrapper
├── public-site-layout.tsx    # ✅ New: Public site wrapper
├── layout.tsx                # Existing root layout
├── navigation/               # ✅ New: Navigation primitives
│   ├── sidebar.tsx          # Moved from modules/dashboard
│   ├── top-nav.tsx          # Moved from modules/dashboard
│   ├── breadcrumb.tsx       # Moved from modules/dashboard
│   ├── main-navigation.tsx  # Moved from components/navigation
│   ├── footer.tsx           # Moved from components/navigation
│   ├── dashboard-nav.tsx    # Moved from components/navigation
│   └── index.ts
├── wrappers/                 # ✅ New: Layout utilities
│   ├── auth-guard.tsx       # ✅ New
│   ├── role-guard.tsx       # ✅ New
│   ├── page-wrapper.tsx     # ✅ New
│   └── index.ts
└── index.ts
```

### 2. Moved Components

| Component | From | To |
|-----------|------|-----|
| `sidebar.tsx` | `modules/dashboard/components/` | `layout/navigation/` |
| `top-nav.tsx` | `modules/dashboard/components/` | `layout/navigation/` |
| `breadcrumb.tsx` | `modules/dashboard/components/` | `layout/navigation/` |
| `main-navigation.tsx` | `components/navigation/` | `layout/navigation/` |
| `footer.tsx` | `components/navigation/` | `layout/navigation/` |
| `dashboard-nav.tsx` | `components/navigation/` | `layout/navigation/` |

### 3. Created New Components

- ✅ `dashboard-layout.tsx` - Dashboard page wrapper
- ✅ `public-site-layout.tsx` - Public site wrapper
- ✅ `auth-guard.tsx` - Authentication wrapper
- ✅ `role-guard.tsx` - Authorization wrapper
- ✅ `page-wrapper.tsx` - Generic page container

### 4. Removed Folders

- ❌ `components/navigation/` - Moved to `layout/navigation/`

---

## Usage Patterns

### Dashboard Layout

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

### Public Site Layout

```typescript
// app/page.tsx
import { PublicSiteLayout } from '@/layout'

export default function HomePage() {
  return (
    <PublicSiteLayout>
      <Hero />
      <Features />
    </PublicSiteLayout>
  )
}
```

### With Auth Guard

```typescript
// app/dashboard/layout.tsx
import { AuthGuard, DashboardLayout } from '@/layout'

export default function DashboardRootLayout({ children }) {
  return (
    <AuthGuard>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthGuard>
  )
}
```

### With Role Guard

```typescript
// app/admin/page.tsx
import { RoleGuard } from '@/layout'

export default function AdminPage() {
  return (
    <RoleGuard allowedRoles={['admin', 'super-admin']}>
      <AdminPanel />
    </RoleGuard>
  )
}
```

---

## Import Path Changes

### Before:
```typescript
import { Sidebar } from '@/modules/dashboard'
import { TopNav } from '@/modules/dashboard'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/navigation'
```

### After:
```typescript
import { Sidebar, TopNav, Breadcrumb } from '@/layout/navigation'
import { MainNavigation, Footer } from '@/layout/navigation'
import { DashboardLayout, PublicSiteLayout } from '@/layout'
import { AuthGuard, RoleGuard, PageWrapper } from '@/layout/wrappers'
```

---

## Component Classification

### ✅ Layout Components (in `/layout`)

**Structural primitives that define UI skeleton:**
- Navigation (Sidebar, Topbar, Navbar, Footer)
- Breadcrumbs
- Auth/Role guards
- Page wrappers
- Layout containers

### ❌ Domain Components (in `/modules`)

**Business logic and feature-specific UI:**
- Dashboard widgets (QuickActions, RecentActivity)
- Data tables
- Forms with validation
- Cards with business logic
- Feature-specific components

---

## Benefits

### 1. Clear Separation of Concerns
- Layout = Structure
- Modules = Content
- No confusion about component placement

### 2. Centralized Control
- Update navigation in one place
- Consistent UI skeleton across all modules
- Easy to maintain global layout

### 3. Reusability
- Layout wrappers used across all pages
- Guards composable with any content
- Consistent page structure

### 4. Better Testing
- Test layout logic separately from business logic
- Mock layout components easily
- Isolated unit tests

### 5. Plug-and-Play Architecture
- Modules focus on business logic
- Layout provides consistent structure
- Easy to add new modules

---

## Documentation Created

- ✅ **ADR 008**: Layout Components Strategy
- ✅ **LAYOUT-REORGANIZATION-SUMMARY.md**: This document
- ✅ Updated **ARCHITECTURE.md**: New layout structure
- ✅ Updated **ADR README**: Added ADR 008

---

## Next Steps

1. **Update Import Statements**: Fix all imports in `app/` directory
2. **Implement Layout Wrappers**: Use `DashboardLayout` in dashboard pages
3. **Add Auth Logic**: Implement actual authentication in `AuthGuard`
4. **Add Role Logic**: Implement role checking in `RoleGuard`
5. **Test Layouts**: Verify all pages render correctly
6. **Update Tests**: Update component tests with new paths

---

## Migration Checklist

- [x] Create `/layout` structure
- [x] Move navigation components to `/layout/navigation`
- [x] Create layout wrappers (`DashboardLayout`, `PublicSiteLayout`)
- [x] Create guard components (`AuthGuard`, `RoleGuard`)
- [x] Create `PageWrapper` utility
- [x] Update module exports (remove moved components)
- [x] Create barrel exports for layout folders
- [x] Create ADR 008
- [x] Update ARCHITECTURE.md
- [ ] Update all import statements
- [ ] Implement layout wrappers in pages
- [ ] Add authentication logic
- [ ] Add authorization logic
- [ ] Test all pages
- [ ] Update component tests

---

## Files Created

### New Files
- `layout/dashboard-layout.tsx`
- `layout/public-site-layout.tsx`
- `layout/navigation/index.ts`
- `layout/wrappers/auth-guard.tsx`
- `layout/wrappers/role-guard.tsx`
- `layout/wrappers/page-wrapper.tsx`
- `layout/wrappers/index.ts`
- `layout/index.ts`
- `documents/adr/008-layout-components-strategy.md`
- `documents/LAYOUT-REORGANIZATION-SUMMARY.md`

### Modified Files
- `modules/dashboard/index.ts` - Removed layout components
- `documents/general/ARCHITECTURE.md` - Updated layout section
- `documents/adr/README.md` - Added ADR 008

### Moved Files
- `modules/dashboard/components/sidebar.tsx` → `layout/navigation/sidebar.tsx`
- `modules/dashboard/components/top-nav.tsx` → `layout/navigation/top-nav.tsx`
- `modules/dashboard/components/breadcrumb.tsx` → `layout/navigation/breadcrumb.tsx`
- `components/navigation/main-navigation.tsx` → `layout/navigation/main-navigation.tsx`
- `components/navigation/footer.tsx` → `layout/navigation/footer.tsx`
- `components/navigation/dashboard-nav.tsx` → `layout/navigation/dashboard-nav.tsx`

### Deleted Folders
- `components/navigation/` - Moved to `layout/navigation/`

---

## References

- [ADR 001: Folder Structure](./adr/001-folder-structure-and-modularity.md)
- [ADR 007: Barrel Exports Strategy](./adr/007-barrel-exports-strategy.md)
- [ADR 008: Layout Components Strategy](./adr/008-layout-components-strategy.md)
- [ARCHITECTURE.md](./general/ARCHITECTURE.md)

---

**Status**: ✅ Structure complete, imports need updating  
**Next**: Implement layout wrappers in pages and update imports
