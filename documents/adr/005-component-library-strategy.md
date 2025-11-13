# ADR 005: Component Library Strategy

**Status**: Accepted  
**Date**: 2025-11-13  
**Decision Makers**: Development Team  
**Tags**: ui, components, design-system, radix-ui

---

## Context

We needed a UI component strategy that provides:
- Consistent design across the application
- Accessible components (WCAG compliance)
- Customizable and themeable
- TypeScript support
- Good developer experience

## Decision

**Build a custom component library using Radix UI primitives + Tailwind CSS.**

### Stack

- **Radix UI**: Unstyled, accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **class-variance-authority (CVA)**: Component variants
- **tailwind-merge**: Class conflict resolution
- **Lucide React**: Icon library

### Component Organization

```
components/
├── ui/                    # Base design system components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   └── ...
├── auth/                  # Feature-specific components
├── dashboard/
└── form-builder/
```

## Rationale

### Why Radix UI + Tailwind?

**Pros:**
- ✅ Full control over styling
- ✅ Excellent accessibility out of the box
- ✅ Unstyled primitives (no CSS conflicts)
- ✅ Composable and flexible
- ✅ Small bundle size (tree-shakeable)
- ✅ TypeScript support
- ✅ Active maintenance

**Cons:**
- ❌ Need to build components ourselves
- ❌ Initial setup time
- ❌ Need to maintain consistency

**Alternatives Considered:**

1. **shadcn/ui**
   - Considered: Copy-paste component library
   - Accepted: We're using this pattern!
   - Radix + Tailwind + CVA

2. **Material UI (MUI)**
   - Rejected: Heavy bundle size
   - Rejected: Opinionated styling
   - Rejected: Hard to customize

3. **Chakra UI**
   - Rejected: Different styling approach
   - Rejected: Larger bundle size

4. **Ant Design**
   - Rejected: Too opinionated
   - Rejected: Not Tailwind-friendly

5. **Headless UI**
   - Considered: Similar to Radix
   - Rejected: Radix has more components

## Consequences

### Positive

- Full design control
- Excellent accessibility
- Consistent with Tailwind
- Easy to customize
- Small bundle size

### Negative

- Need to build components
- Maintain component library
- Document components

### Neutral

- Need design system guidelines
- Requires component testing

## Implementation

### Base Component Pattern

```typescript
// components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
```

### Usage Example

```typescript
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline" size="sm">Small</Button>
      <Button variant="ghost" size="icon">
        <Icon />
      </Button>
    </>
  )
}
```

## Component Guidelines

### 1. Accessibility First

- Use Radix primitives for complex components
- Include ARIA labels
- Support keyboard navigation
- Test with screen readers

### 2. Variant System

```typescript
// Use CVA for variants
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { ... },
      size: { ... },
    },
    defaultVariants: { ... }
  }
)
```

### 3. Composition

```typescript
// Components should be composable
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### 4. TypeScript

- Export prop interfaces
- Use React.forwardRef for ref support
- Type variant props with VariantProps

## Component Checklist

When creating a new component:

- [ ] Use Radix primitive if available
- [ ] Define variants with CVA
- [ ] Add TypeScript types
- [ ] Support ref forwarding
- [ ] Include className prop
- [ ] Add displayName
- [ ] Document props
- [ ] Test accessibility
- [ ] Add usage examples

## Theming

### CSS Variables

```css
/* styles/globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    /* ... */
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... */
  }
}
```

### Theme Provider

```typescript
// components/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
```

## Icon Strategy

### Lucide React

```typescript
import { Check, X, ChevronDown } from "lucide-react"

<Button>
  <Check className="mr-2 h-4 w-4" />
  Save
</Button>
```

### Icon Guidelines

- Use 16px (h-4 w-4) for inline icons
- Use 20px (h-5 w-5) for standalone icons
- Use 24px (h-6 w-6) for large icons
- Always include aria-label for icon-only buttons

## Related Decisions

- [ADR 002: Naming Conventions](./002-naming-conventions.md)
- [ADR 006: Styling Strategy](./006-styling-strategy.md)

## References

- [Radix UI Documentation](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [CVA Documentation](https://cva.style/)

---

**Last Updated**: 2025-11-13  
**Review Date**: 2026-02-13 (3 months)
