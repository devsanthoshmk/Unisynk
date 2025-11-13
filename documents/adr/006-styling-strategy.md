# ADR 006: Styling Strategy

**Status**: Accepted  
**Date**: 2025-11-13  
**Decision Makers**: Development Team  
**Tags**: styling, tailwind, css

---

## Context

We needed a styling approach that:
- Scales with the application
- Maintains consistency
- Provides good developer experience
- Supports theming
- Has minimal runtime overhead

## Decision

**Use Tailwind CSS as the primary styling solution with utility-first approach.**

### Stack

- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **CSS Variables**: Theme tokens
- **CSS Modules**: For rare edge cases only

## Rationale

### Why Tailwind CSS?

**Pros:**
- ✅ Utility-first approach (fast development)
- ✅ No CSS naming conflicts
- ✅ Excellent tree-shaking (small bundle)
- ✅ Built-in responsive design
- ✅ Dark mode support
- ✅ Consistent design system
- ✅ Great IDE support

**Cons:**
- ❌ Verbose className strings
- ❌ Learning curve for team
- ❌ Can be hard to read

**Alternatives Considered:**

1. **CSS Modules**
   - Rejected: More boilerplate
   - Rejected: Naming overhead

2. **Styled Components**
   - Rejected: Runtime overhead
   - Rejected: Larger bundle size

3. **Emotion**
   - Rejected: Similar issues to styled-components

4. **Vanilla CSS**
   - Rejected: Doesn't scale
   - Rejected: Naming conflicts

## Consequences

### Positive

- Fast development
- Consistent styling
- Small bundle size
- Easy to maintain
- Good tooling

### Negative

- Long className strings
- Need to learn utilities
- Can be verbose

## Implementation

### Configuration

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ...
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### Global Styles

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... */
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... */
  }
}
```

## Styling Guidelines

### 1. Use Utility Classes

```typescript
// ✅ Good
<div className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-900">
  <Button className="px-6 py-2">Click me</Button>
</div>

// ❌ Avoid inline styles
<div style={{ display: 'flex', padding: '16px' }}>
  <Button style={{ padding: '8px 24px' }}>Click me</Button>
</div>
```

### 2. Use cn() Helper

```typescript
import { cn } from "@/lib/utils"

// Merge classes safely
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
```

### 3. Responsive Design

```typescript
// Mobile-first approach
<div className="
  flex flex-col          // Mobile
  md:flex-row           // Tablet
  lg:gap-8              // Desktop
">
```

### 4. Dark Mode

```typescript
// Use dark: prefix
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

### 5. Custom Classes (Rare)

```css
/* Only for complex animations or reusable patterns */
@layer components {
  .card-hover {
    @apply transition-all hover:shadow-lg hover:-translate-y-1;
  }
}
```

## Best Practices

### Component Styling

```typescript
// Extract repeated patterns to components
export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}
```

### Conditional Styling

```typescript
// Use cn() for conditional classes
<Button
  className={cn(
    "base-classes",
    isLoading && "opacity-50 cursor-not-allowed",
    variant === "primary" && "bg-blue-500",
    size === "lg" && "px-8 py-4"
  )}
>
```

### Avoid Magic Numbers

```typescript
// ❌ Avoid
<div className="mt-[23px] w-[347px]">

// ✅ Use standard spacing
<div className="mt-6 w-80">
```

## Performance

### Tree-Shaking

Tailwind automatically removes unused classes in production.

### JIT Mode

Just-In-Time mode generates styles on-demand (enabled by default in Tailwind v3).

## Related Decisions

- [ADR 005: Component Library](./005-component-library-strategy.md)

## References

- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Tailwind Best Practices](https://tailwindcss.com/docs/reusing-styles)

---

**Last Updated**: 2025-11-13  
**Review Date**: 2026-02-13 (3 months)
